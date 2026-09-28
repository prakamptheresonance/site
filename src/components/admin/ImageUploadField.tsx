'use client'

import React, { useState, useRef } from 'react'
import {
  useField,
  FieldLabel,
  FieldDescription,
  FieldError,
  Button,
  Dropzone,
} from '@payloadcms/ui'
import type { TextFieldClientComponent } from 'payload'

export const ImageUploadField: TextFieldClientComponent = (props) => {
  const { field, path: pathFromProps, readOnly } = props
  const { label, required, admin } = field
  const description = admin?.description

  // Destination folder in ImageKit (e.g. /media/member or /media)
  const folder =
    (admin?.custom as Record<string, any>)?.folder ||
    (pathFromProps?.includes('member') || field.name === 'image_path'
      ? '/media/member'
      : '/media')

  const { value, setValue, showError, disabled } = useField<string>({
    path: pathFromProps,
  })

  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const endpoint =
    process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT?.replace(/\/+$/, '') || ''

  const previewUrl = value
    ? value.startsWith('http') || value.startsWith('data:')
      ? value
      : endpoint
        ? `${endpoint}${value.startsWith('/') ? '' : '/'}${value}`
        : value
    : null

  const fileName = value ? value.split('/').pop() || value : ''

  const handleFileUpload = async (file: File) => {
    if (!file || !file.type.startsWith('image/')) {
      setUploadError('Please select a valid image file.')
      return
    }

    setIsUploading(true)
    setUploadProgress(0)
    setUploadError(null)

    try {
      // 1. Fetch presigned authentication credentials for ImageKit direct client upload
      const authRes = await fetch('/api/imagekit/auth')
      const authData = await authRes.json()

      if (!authRes.ok || authData.error) {
        throw new Error(
          authData?.error || 'Failed to authenticate upload with server',
        )
      }

      const { token, expire, signature, publicKey } = authData
      const cleanFolder = folder.startsWith('/') ? folder : `/${folder}`

      // 2. Upload directly from the browser to ImageKit (presigned, no serverless buffering)
      const relativePath = await new Promise<string>((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open('POST', 'https://upload.imagekit.io/api/v1/files/upload')

        xhr.upload.onprogress = (e) => {
          if (e.lengthComputable) {
            const percent = Math.round((e.loaded / e.total) * 100)
            setUploadProgress(percent)
          }
        }

        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            try {
              const res = JSON.parse(xhr.responseText)
              const filePath = res.filePath || `${cleanFolder}/${file.name}`
              resolve(filePath)
            } catch {
              reject(new Error('Invalid response received from ImageKit'))
            }
          } else {
            try {
              const errRes = JSON.parse(xhr.responseText)
              reject(
                new Error(
                  errRes?.message ||
                    errRes?.help ||
                    `Upload to ImageKit failed (${xhr.status})`,
                ),
              )
            } catch {
              reject(new Error(`Upload to ImageKit failed with status ${xhr.status}`))
            }
          }
        }

        xhr.onerror = () => {
          reject(new Error('Network error while uploading directly to ImageKit'))
        }

        const formData = new FormData()
        formData.append('file', file)
        formData.append('fileName', file.name)
        formData.append('publicKey', publicKey)
        formData.append('signature', signature)
        formData.append('expire', String(expire))
        formData.append('token', token)
        formData.append('folder', cleanFolder)
        formData.append('useUniqueFileName', 'false')
        formData.append('overwriteFile', 'true')

        xhr.send(formData)
      })

      // 3. Save only relative path in Payload form state
      setValue(relativePath)
    } catch (err: any) {
      setUploadError(err?.message || 'Error uploading image')
    } finally {
      setIsUploading(false)
      setUploadProgress(0)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const onDropzoneChange = (files: FileList | File[]) => {
    if (disabled || readOnly || isUploading) return
    const file = files[0]
    if (file) {
      handleFileUpload(file)
    }
  }

  return (
    <div
      className={`field-type upload ${showError ? 'error' : ''} ${readOnly ? 'read-only' : ''}`}
      id={`field-${pathFromProps?.replace(/\./g, '__')}`}
      style={{ marginBottom: 'calc(var(--base) * 1.25)' }}
    >
      <FieldLabel label={label} required={required} path={pathFromProps} />

      <div className="upload__wrap">
        <FieldError path={pathFromProps} showError={showError} />
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) handleFileUpload(file)
        }}
        disabled={disabled || readOnly || isUploading}
      />

      <div className="upload__dropzoneAndUpload">
        {value ? (
          <div className="upload-field-card upload upload--has-one upload-field-card--size-medium">
            <div className="upload-relationship-details">
              <div className="upload-relationship-details__imageAndDetails">
                {previewUrl && (
                  <div
                    className="thumbnail thumbnail--size-small upload-relationship-details__thumbnail"
                    style={{
                      width: '40px',
                      height: '40px',
                      overflow: 'hidden',
                      borderRadius: 'var(--style-radius-s)',
                      flexShrink: 0,
                      backgroundColor: 'var(--theme-elevation-100)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={previewUrl}
                      alt={fileName}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </div>
                )}
                <div className="upload-relationship-details__details">
                  <p className="upload-relationship-details__filename">
                    {previewUrl ? (
                      <a
                        href={previewUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {fileName}
                      </a>
                    ) : (
                      fileName
                    )}
                  </p>
                  <p className="upload-relationship-details__meta">
                    {value}
                  </p>
                </div>
              </div>

              {!readOnly && (
                <div className="upload-relationship-details__actions">
                  <Button
                    buttonStyle="icon-label"
                    className="upload-relationship-details__edit"
                    icon="edit"
                    iconStyle="none"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading || disabled}
                    size="small"
                    tooltip="Change Image"
                  />
                  <Button
                    buttonStyle="icon-label"
                    className="upload-relationship-details__remove"
                    icon="x"
                    iconStyle="none"
                    onClick={() => setValue('')}
                    disabled={isUploading || disabled}
                    size="small"
                    tooltip="Remove"
                  />
                </div>
              )}
            </div>
          </div>
        ) : (
          <Dropzone
            disabled={disabled || readOnly || isUploading}
            onChange={onDropzoneChange}
          >
            <div className="upload__dropzoneContent">
              <div className="upload__dropzoneContent__buttons">
                <Button
                  buttonStyle="pill"
                  size="small"
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={disabled || readOnly || isUploading}
                >
                  {isUploading
                    ? `Uploading... ${uploadProgress > 0 ? `${uploadProgress}%` : ''}`
                    : 'Select a file'}
                </Button>
              </div>
              {!isUploading && (
                <p className="upload__dragAndDropText">
                  or drag and drop
                </p>
              )}
            </div>
          </Dropzone>
        )}
      </div>

      {uploadError && (
        <div style={{ color: 'var(--theme-error-500)', fontSize: '0.85rem', marginTop: '6px' }}>
          {uploadError}
        </div>
      )}

      {description && (
        <FieldDescription description={description} path={pathFromProps} />
      )}
    </div>
  )
}
