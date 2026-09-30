import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'
import { ACCENT_PRESETS } from '../lib/presets/accents'

export const Occasions: CollectionConfig = {
  slug: 'occasions',
  labels: {
    singular: 'Occasion',
    plural: 'Occasions',
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'icon', 'accent', 'order', 'isActive', 'updatedAt'],
  },
  fields: [
    {
      name: 'cardPreview',
      type: 'ui',
      admin: {
        position: 'sidebar',
        components: {
          Field: '@/components/admin/OccasionCardPreview#OccasionCardPreview',
        },
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Occasion Title',
      admin: {
        placeholder: 'e.g. Puja & Cultural Programmes',
      },
    },
    slugField(),
    {
      name: 'icon',
      type: 'text',
      required: true,
      label: 'Icon',
      admin: {
        components: {
          Field: '@/components/admin/IconSelectField#IconSelectField',
          Cell: '@/components/admin/IconCell#IconCell',
        },
        custom: {
          category: 'Events & Occasions',
        },
        description: 'Search and select an occasion or performance icon.',
      },
    },
    {
      name: 'accent',
      type: 'select',
      required: true,
      label: 'Card Accent Preset',
      options: ACCENT_PRESETS.map((preset) => ({
        label: preset.label,
        value: preset.value,
      })),
      defaultValue: ACCENT_PRESETS[0].value,
      admin: {
        description: 'Select an ambient glow preset for the occasion card.',
      },
    },
    {
      name: 'bullets',
      type: 'array',
      label: 'Event Types / Highlights',
      labels: {
        singular: 'Highlight Point',
        plural: 'Highlight Points',
      },
      fields: [
        {
          name: 'point',
          type: 'text',
          required: true,
          label: 'Bullet Text',
        },
      ],
    },
    {
      name: 'order',
      type: 'number',
      label: 'Display Order',
      defaultValue: 0,
      admin: {
        description: 'Order of display on the website (e.g. 1, 2, 3...). Lower numbers appear first.',
      },
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
