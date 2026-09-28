import { cloudStoragePlugin } from '@payloadcms/plugin-cloud-storage'
import type { Plugin, UploadCollectionSlug } from 'payload'
import { imagekitAdapter, type ImageKitAdapterOptions } from './adapter'

export interface ImageKitPluginOptions {
  /**
   * Whether to enable the plugin
   * @default true
   */
  enabled?: boolean
  /**
   * Global ImageKit credentials (defaults to environment variables)
   */
  config?: ImageKitAdapterOptions
  /**
   * Collections to apply the ImageKit storage adapter to.
   * Key is the collection slug (e.g. 'media').
   */
  collections?: Partial<
    Record<
      UploadCollectionSlug,
      {
        /**
         * Destination folder in ImageKit (e.g. '/media' or '/uploads')
         * @default '/media'
         */
        folder?: string
        /**
         * Optional prefix path
         */
        prefix?: string
        /**
         * When true, Payload URLs will point directly to the ImageKit CDN
         * @default true
         */
        disablePayloadAccessControl?: boolean
      } | true
    >
  >
}

export const imagekitPlugin = (options: ImageKitPluginOptions = {}): Plugin => {
  const isEnabled = options.enabled !== false

  if (!isEnabled) {
    return (incomingConfig) => incomingConfig
  }

  const collectionsOptions = options.collections || {
    media: true,
  }

  const collectionsConfig: Record<string, any> = {}

  for (const [slug, collOpt] of Object.entries(collectionsOptions)) {
    const optObj: Record<string, any> = typeof collOpt === 'object' && collOpt !== null ? collOpt : {}
    const folder = optObj.folder || `/${slug}`

    collectionsConfig[slug] = {
      adapter: imagekitAdapter({
        ...options.config,
        folder,
      }),
      disablePayloadAccessControl: optObj.disablePayloadAccessControl !== false,
      prefix: optObj.prefix,
    }
  }

  return cloudStoragePlugin({
    collections: collectionsConfig,
  })
}

export { imagekitAdapter }
export type { ImageKitAdapterOptions }
