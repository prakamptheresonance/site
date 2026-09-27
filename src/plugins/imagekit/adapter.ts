import type { Adapter, GeneratedAdapter } from '@payloadcms/plugin-cloud-storage/types'
import type { Field } from 'payload'
import path from 'path'

export interface ImageKitAdapterOptions {
  /**
   * The ImageKit URL endpoint (e.g. https://ik.imagekit.io/your_id)
   */
  urlEndpoint?: string
  /**
   * The ImageKit private API key (starts with private_)
   */
  privateKey?: string
  /**
   * Optional default folder in ImageKit (e.g. /media)
   * @default '/media'
   */
  folder?: string
}

export function imagekitAdapter(options: ImageKitAdapterOptions = {}): Adapter {
  const urlEndpoint = (
    options.urlEndpoint ||
    process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT ||
    process.env.IMAGEKIT_URL_ENDPOINT ||
    ''
  ).replace(/\/+$/, '')

  const privateKey =
    options.privateKey ||
    process.env.IMAGEKIT_SECRET ||
    process.env.IMAGEKIT_PRIVATE_KEY ||
    ''

  const defaultFolder = options.folder || '/media'

  return ({ collection, prefix = '' }): GeneratedAdapter => {
    const cleanFolder = (prefix || defaultFolder).replace(/^\/+|\/+$/g, '')

    const getFullUrl = (filename: string, filePrefix?: string) => {
      const folderPath = (filePrefix !== undefined ? filePrefix : cleanFolder).replace(
        /^\/+|\/+$/g,
        '',
      )
      return folderPath ? `${urlEndpoint}/${folderPath}/${filename}` : `${urlEndpoint}/${filename}`
    }

    const fields: Field[] = [
      {
        name: 'imagekit',
        type: 'group',
        label: 'ImageKit Details',
        admin: {
          readOnly: true,
          position: 'sidebar',
        },
        fields: [
          {
            name: 'fileId',
            type: 'text',
            label: 'File ID',
          },
          {
            name: 'url',
            type: 'text',
            label: 'ImageKit URL',
          },
          {
            name: 'thumbnailUrl',
            type: 'text',
            label: 'Thumbnail URL',
          },
          {
            name: 'filePath',
            type: 'text',
            label: 'File Path',
          },
        ],
      },
    ]

    return {
      name: 'imagekit',
      fields,

      generateURL: ({ filename, prefix: docPrefix }) => {
        return getFullUrl(filename, docPrefix)
      },

      handleUpload: async ({ data, file, storageFilePath, req }) => {
        if (!privateKey) {
          req.payload.logger.warn(
            '[ImageKit Storage] IMAGEKIT_SECRET is not configured. File stored locally in database only.',
          )
          return data
        }

        const fileName = path.posix.basename(storageFilePath || file.filename)
        const folderDir = path.posix.dirname(storageFilePath || '')
        const targetFolder =
          folderDir && folderDir !== '.' ? `/${folderDir}` : `/${cleanFolder}`

        try {
          const formData = new FormData()
          formData.append(
            'file',
            new Blob([new Uint8Array(file.buffer)], { type: file.mimeType }),
            fileName,
          )
          formData.append('fileName', fileName)
          formData.append('folder', targetFolder)
          formData.append('useUniqueFileName', 'false')
          formData.append('overwriteFile', 'true')

          const authHeader = `Basic ${Buffer.from(`${privateKey.trim()}:`).toString('base64')}`

          const res = await fetch('https://upload.imagekit.io/api/v1/files/upload', {
            method: 'POST',
            headers: {
              Authorization: authHeader,
            },
            body: formData,
          })

          if (!res.ok) {
            const errText = await res.text()
            req.payload.logger.error(
              `[ImageKit Storage] Upload failed for ${fileName} (${res.status}): ${errText}`,
            )
            throw new Error(`ImageKit upload failed (${res.status}): ${errText}`)
          }

          const result = (await res.json()) as {
            fileId: string
            url: string
            thumbnailUrl?: string
            filePath?: string
          }

          data.url = result.url || getFullUrl(fileName)
          data.imagekit = {
            fileId: result.fileId,
            url: result.url,
            thumbnailUrl: result.thumbnailUrl || result.url,
            filePath: result.filePath || `${targetFolder}/${fileName}`,
          }

          return data
        } catch (error) {
          req.payload.logger.error({
            err: error,
            msg: `[ImageKit Storage] Exception uploading ${fileName}`,
          })
          throw error
        }
      },

      handleDelete: async ({ doc, filename, storageFilePath, req }) => {
        if (!privateKey) return

        const fileId = (doc as Record<string, any>)?.imagekit?.fileId

        const authHeader = `Basic ${Buffer.from(`${privateKey.trim()}:`).toString('base64')}`

        if (fileId) {
          try {
            const res = await fetch(`https://api.imagekit.io/v1/files/${fileId}`, {
              method: 'DELETE',
              headers: { Authorization: authHeader },
            })
            if (!res.ok && res.status !== 404) {
              const errText = await res.text()
              req.payload.logger.error(
                `[ImageKit Storage] Failed to delete fileId ${fileId}: ${errText}`,
              )
            }
          } catch (err) {
            req.payload.logger.error({
              err,
              msg: `[ImageKit Storage] Error deleting fileId ${fileId}`,
            })
          }
          return
        }

        // Fallback: search file by filename
        try {
          const searchRes = await fetch(
            `https://api.imagekit.io/v1/files?name=${encodeURIComponent(filename)}`,
            {
              headers: { Authorization: authHeader },
            },
          )
          if (searchRes.ok) {
            const files = (await searchRes.json()) as Array<{ fileId: string }>
            if (Array.isArray(files) && files.length > 0 && files[0]?.fileId) {
              await fetch(`https://api.imagekit.io/v1/files/${files[0].fileId}`, {
                method: 'DELETE',
                headers: { Authorization: authHeader },
              })
            }
          }
        } catch (err) {
          req.payload.logger.error({
            err,
            msg: `[ImageKit Storage] Error in fallback delete for ${filename}`,
          })
        }
      },

      staticHandler: async (req, { params: { filename, prefix: docPrefix } }) => {
        const remoteUrl = getFullUrl(filename, docPrefix)
        return Response.redirect(remoteUrl, 302)
      },
    }
  }
}
