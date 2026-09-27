import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Media',
    plural: 'Media',
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'caption',
    defaultColumns: ['filename', 'caption', 'alt', 'mimeType', 'filesize', 'updatedAt'],
  },
  upload: {
    disableLocalStorage: true,
    mimeTypes: ['image/*'],
    adminThumbnail: ({ doc }) => {
      const ikDoc = doc?.imagekit as { thumbnailUrl?: string; url?: string } | undefined
      return ikDoc?.thumbnailUrl || ikDoc?.url || (doc?.url as string) || ''
    },
  },
  fields: [
    {
      name: 'caption',
      type: 'text',
      label: 'Caption',
      required: false,
      admin: {
        placeholder: 'Optional caption for the image...',
      },
    },
    {
      name: 'alt',
      type: 'text',
      label: 'Alt Text',
      required: false,
      admin: {
        description: 'Recommended for accessibility and SEO',
      },
    },
  ],
}


