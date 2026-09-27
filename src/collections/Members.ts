import type { CollectionConfig } from 'payload'

export const Members: CollectionConfig = {
  slug: 'members',
  labels: {
    singular: 'Member',
    plural: 'Members',
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'image', 'updatedAt'],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'General',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
              label: 'Member Name',
            },
            {
              name: 'role',
              type: 'text',
              required: true,
              label: 'Role',
              admin: {
                description: 'e.g. Drummer, Octapaddist, Guitarist, Vocalist, Bassist',
                placeholder: 'e.g. Drummer',
              },
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
              label: 'Member Photo',
            },
          ],
        },
        {
          name: 'socials',
          label: 'Socials',
          fields: [
            {
              name: 'facebook',
              type: 'text',
              label: 'Facebook Profile',
              admin: {
                placeholder: 'https://facebook.com/username',
                description: 'Optional Facebook profile URL or handle',
              },
            },
            {
              name: 'instagram',
              type: 'text',
              label: 'Instagram Profile',
              admin: {
                placeholder: 'https://instagram.com/username',
                description: 'Optional Instagram profile URL or handle',
              },
            },
          ],
        },
      ],
    },
  ],
}
