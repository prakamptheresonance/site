import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

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
    defaultColumns: ['name', 'role', 'group', 'isActive', 'updatedAt'],
  },
  defaultPopulate: {
    role: true,
    group: true,
  },
  fields: [
    slugField({ useAsSlug: 'name' }),
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
              type: 'relationship',
              relationTo: 'member-roles',
              required: true,
              label: 'Role / Specialization',
              admin: {
                description: 'Select the role/specialization for this member.',
              },
            },
            {
              name: 'group',
              type: 'relationship',
              relationTo: 'groups',
              hasMany: false,
              label: 'Group',
              admin: {
                description: 'Select the group this member belongs to.',
              },
            },
            {
              name: 'image_path',
              type: 'text',
              required: true,
              label: 'Member Photo',
              admin: {
                components: {
                  Field: '@/components/admin/ImageUploadField#ImageUploadField',
                  Cell: '@/components/admin/ImageCell#ImageCell',
                },
                custom: {
                  folder: '/media/member',
                },
              },
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
    {
      name: 'isActive',
      type: 'checkbox',
      label: 'Active on Site',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description: 'Toggle visibility on the landing page.',
      },
    },
  ],
}
