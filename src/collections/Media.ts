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
    defaultColumns: ['caption', 'path', 'updatedAt'],
  },
  fields: [
    {
      name: 'path',
      type: 'text',
      required: true,
      label: 'Image',
      admin: {
        components: {
          Field: '@/components/admin/ImageUploadField#ImageUploadField',
          Cell: '@/components/admin/ImageCell#ImageCell',
        },
        custom: {
          folder: '/media',
        },
      },
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Caption',
      required: false,
      admin: {
        placeholder: 'Optional caption for the image...',
        description: 'Optional caption describing the image or performance',
      },
    },
  ],
}
