import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

export const MemberRoles: CollectionConfig = {
  slug: 'member-roles',
  labels: {
    singular: 'Member Role',
    plural: 'Member Roles',
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'isActive', 'updatedAt'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Role / Type Title',
      admin: {
        placeholder: 'e.g. Vocalist, Octapadist, Management',
        description: 'Name of the band member role or category.',
      },
    },
    slugField(),
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      admin: {
        placeholder: 'Brief summary of the role responsibilities or instrument specialization...',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      label: 'Active',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description: 'Enable or disable this role.',
      },
    },
  ],
}
