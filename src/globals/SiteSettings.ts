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
        {
          label: 'Section Descriptions',
          fields: [
            {
              name: 'heroDescription',
              type: 'textarea',
              label: 'Hero Section Description',
              defaultValue:
                'A versatile live music ensemble from Agartala, delivering memorable performances across genres, styles, and generations. Our talented musicians and vocalists adapt every performance to the mood, audience, and occasion.',
              admin: {
                description:
                  'Main introductory description displayed in the hero section below the band slogan.',
                placeholder: 'Enter hero section description...',
              },
            },
            {
              name: 'genreDescription',
              type: 'textarea',
              label: 'Genre / Expertise Section Description',
              defaultValue:
                'From devotional sanctity to thunderous stage rock, Prakamp adapts effortlessly to every musical dimension and listener generation.',
              admin: {
                description:
                  'Subtitle description displayed in Our Musical Expertise section.',
                placeholder: 'Enter musical expertise / genre description...',
              },
            },
            {
              name: 'galleryDescription',
              type: 'textarea',
              label: 'Gallery Section Description',
              defaultValue:
                'Glimpses of electrifying concerts, devotional Puja mornings, and celebrations across Tripura and beyond.',
              admin: {
                description:
                  'Subtitle description displayed in Moments in Resonance (Gallery) section.',
                placeholder: 'Enter gallery section description...',
              },
            },
            {
              name: 'membersDescription',
              type: 'textarea',
              label: 'Members Section Description',
              defaultValue:
                'The artists and instrumentalists who bring the sonic soul of Prakamp to life on stage.',
              admin: {
                description:
                  'Subtitle description displayed in Meet The Resonance (Members) section.',
                placeholder: 'Enter members section description...',
              },
            },
            {
              name: 'occasionsDescription',
              type: 'textarea',
              label: 'Occasions Section Description',
              defaultValue:
                'From devotional sanctity to corporate sophistication and high-octane stadium energy, our setlists are customized for your guests.',
              admin: {
                description:
                  'Subtitle description displayed in Music For Every Occasion section.',
                placeholder: 'Enter occasions section description...',
              },
            },
            {
              name: 'contactDescription',
              type: 'textarea',
              label: 'Contact Section Description',
              defaultValue:
                'Ready to bring the live resonance of Prakamp to your event? Reach out to us directly.',
              admin: {
                description:
                  'Subtitle description displayed in Let’s Connect (Contact) section.',
                placeholder: 'Enter contact section description...',
              },
            },
            {
              name: 'footerDescription',
              type: 'textarea',
              label: 'Footer Description / Bio',
              defaultValue:
                'Agartala’s premier live music band delivering unforgettable stage experiences across genres, styles, and generations. From sacred Puja melodies to electrifying festival rock.',
              admin: {
                description:
                  'Bio description displayed in the footer below the brand name.',
                placeholder: 'Enter footer bio description...',
              },
            },
          ],
        },
      ],
    },
  ],
}
