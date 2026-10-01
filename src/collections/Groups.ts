import type { CollectionConfig } from 'payload'

export const Groups: CollectionConfig = {
  slug: 'groups',
  labels: {
    singular: 'Group',
    plural: 'Groups',
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'order', 'updatedAt'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Title',
    },
    {
      name: 'order',
      type: 'number',
      label: 'Display Order',
      defaultValue: 0,
      admin: {
        description: 'Order of this group tab on the website (e.g. 1, 2, 3...). Lower numbers appear first.',
      },
    },
    {
      name: 'members',
      type: 'relationship',
      relationTo: 'members',
      hasMany: true,
      label: 'Group Members (Drag & Drop to Reorder)',
      admin: {
        description: 'Select members and drag the handle (≡) to arrange their display order within this group.',
      },
    },
  ],
}
