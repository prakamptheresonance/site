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

    const getRelativePath = (filename: string, filePrefix?: string) => {
      const folderPath = (filePrefix !== undefined ? filePrefix : cleanFolder).replace(
        /^\/+|\/+$/g,
        '',
      )
      return folderPath ? `/${folderPath}/${filename}` : `/${filename}`
    }

    const fields: Field[] = []

    return {
      name: 'imagekit',
      fields,

      generateURL: ({ filename, prefix: docPrefix }) => {
        return getRelativePath(filename, docPrefix)
      },

      handleUpload: async ({ data, file, storageFilePath, req }) => {
        const fileName = path.posix.basename(storageFilePath || file.filename)
        const folderDir = path.posix.dirname(storageFilePath || '')
        const targetFolder =
          folderDir && folderDir !== '.' ? `/${folderDir}` : `/${cleanFolder}`
        const relativePath = getRelativePath(
          fileName,
          folderDir && folderDir !== '.' ? folderDir : cleanFolder,
        )

        if (!privateKey) {
          req.payload.logger.warn(
            '[ImageKit Storage] IMAGEKIT_SECRET is not configured. File stored locally in database only.',
          )
          data.url = relativePath
          return data
        }

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

          data.url = relativePath
          return data
        } catch (error) {
          req.payload.logger.error({
            err: error,
            msg: `[ImageKit Storage] Exception uploading ${fileName}`,
          })
          throw error
        }
      },

      handleDelete: async ({ filename, req }) => {
        if (!privateKey) return

        const authHeader = `Basic ${Buffer.from(`${privateKey.trim()}:`).toString('base64')}`

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
            msg: `[ImageKit Storage] Error deleting file ${filename}`,
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
