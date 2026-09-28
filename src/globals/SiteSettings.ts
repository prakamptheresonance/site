import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings & SEO',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Settings',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'General & SEO',
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Site Title',
              required: true,
              defaultValue:
                'PRAKAMP : THE RESONANCE | Live Music Band in Agartala, Tripura',
              admin: {
                description:
                  'Main title tag used in search engines and browser tabs',
                placeholder: 'e.g. PRAKAMP : THE RESONANCE | Live Music Band',
              },
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Meta Description',
              required: true,
              defaultValue:
                'Prakamp : The Resonance is Agartala’s premier live music band. Delivering memorable performances across Classical, Bhajan, Sufi, Retro Hindi, Bollywood, Bengali Folk, and Live Orchestra. One Band. Every Genre. Every Occasion.',
              admin: {
                description:
                  'Brief summary of your band and site shown in search engine results',
                placeholder:
                  'e.g. Delivering memorable live performances across genres...',
              },
            },
            {
              name: 'keywords',
              type: 'textarea',
              label: 'Meta Keywords',
              defaultValue:
                'Prakamp The Resonance, Live Music Band Agartala, Music Band in Tripura, Bengali Folk and Baul Band, Bollywood Live Band Agartala, Puja Cultural Programme Band, Wedding Music Band Tripura, Devotional Bhajan Live Music, Saxophone and Orchestra Band Agartala',
              admin: {
                description:
                  'Comma-separated keywords for search engine indexing',
                placeholder:
                  'e.g. Live Music Band, Agartala, Bollywood, Classical',
              },
            },
          ],
        },
        {
          label: 'Social Sharing & OG',
          fields: [
            {
              name: 'brandName',
              type: 'text',
              label: 'Brand / Publisher Name',
              defaultValue: 'Prakamp : The Resonance',
              admin: {
                placeholder: 'e.g. Prakamp : The Resonance',
              },
            },
            {
              name: 'ogImage',
              type: 'text',
              label: 'Social Share / OpenGraph Image',
              admin: {
                description:
                  'Image preview displayed when your link is shared on Facebook, WhatsApp, Twitter, etc.',
                components: {
                  Field: '@/components/admin/ImageUploadField#ImageUploadField',
                },
                custom: {
                  folder: '/media',
                },
              },
            },
            {
              name: 'ogTitle',
              type: 'text',
              label: 'OpenGraph Title (Optional Override)',
              admin: {
                placeholder: 'Leave blank to use main Site Title',
                description:
                  'Optional customized title specifically for social share cards',
              },
            },
            {
              name: 'ogDescription',
              type: 'textarea',
              label: 'OpenGraph Description (Optional Override)',
              admin: {
                placeholder: 'Leave blank to use main Meta Description',
                description:
                  'Optional customized description specifically for social share cards',
              },
            },
            {
              name: 'twitterHandle',
              type: 'text',
              label: 'Twitter / X Handle',
              defaultValue: '@prakampband',
              admin: {
                placeholder: 'e.g. @prakampband',
                description: 'Twitter @username used for twitter:site and twitter:creator metadata',
              },
            },
            {
              name: 'twitterCard',
              type: 'select',
              label: 'Twitter Card Type',
              defaultValue: 'summary_large_image',
              options: [
                {
                  label: 'Summary with Large Image (Recommended)',
                  value: 'summary_large_image',
                },
                {
                  label: 'Small Summary Card',
                  value: 'summary',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
