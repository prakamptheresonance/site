import type { GlobalConfig } from 'payload'

export const Contact: GlobalConfig = {
  slug: 'contact',
  label: 'Contact & Socials',
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
          label: 'Contact Info',
          fields: [
            {
              name: 'primaryPhone',
              type: 'text',
              label: 'Primary Phone Number',
              defaultValue: '+91 98765 43210',
              admin: {
                placeholder: '+91 98765 43210',
                description: 'Main phone number for inquiries and bookings',
              },
            },
            {
              name: 'secondaryPhone',
              type: 'text',
              label: 'Secondary / Alternate Phone',
              admin: {
                placeholder: '+91 87654 32109',
                description: 'Alternate phone number for event coordinators',
              },
            },
            {
              name: 'email',
              type: 'email',
              label: 'Official Email',
              defaultValue: 'prakamptheresonance@gmail.com',
              admin: {
                placeholder: 'prakamptheresonance@gmail.com',
              },
            },
            {
              name: 'address',
              type: 'textarea',
              label: 'Band Address / City',
              defaultValue: 'Agartala, West Tripura, Tripura 799001, India',
              admin: {
                placeholder: 'Agartala, West Tripura, Tripura, India',
              },
            },
            {
              name: 'googleMapsUrl',
              type: 'text',
              label: 'Google Maps Link',
              admin: {
                placeholder: 'https://maps.google.com/?q=Agartala',
              },
            },
          ],
        },
        {
          label: 'WhatsApp Prompt',
          fields: [
            {
              name: 'whatsappNumber',
              type: 'text',
              label: 'WhatsApp Phone Number',
              defaultValue: '+91 98765 43210',
              admin: {
                placeholder: '+91 98765 43210 or 919876543210',
                description: 'Phone number linked to WhatsApp (with country code)',
              },
            },
            {
              name: 'whatsappPrompt',
              type: 'textarea',
              label: 'Initial WhatsApp Message Prompt',
              defaultValue:
                'Hello Prakamp! I would like to inquire about booking your band for an upcoming event. Please share your availability and details.',
              admin: {
                description:
                  'This message will be pre-filled automatically when visitors click the WhatsApp button',
              },
            },
          ],
        },
        {
          label: 'Social Profiles',
          fields: [
            {
              name: 'facebook',
              type: 'text',
              label: 'Facebook Profile / Page',
              admin: {
                placeholder: 'https://facebook.com/prakamptheresonance',
              },
            },
            {
              name: 'instagram',
              type: 'text',
              label: 'Instagram Profile',
              admin: {
                placeholder: 'https://instagram.com/prakamp_the_resonance',
              },
            },
            {
              name: 'youtube',
              type: 'text',
              label: 'YouTube Channel',
              admin: {
                placeholder: 'https://youtube.com/@prakampband',
              },
            },
          ],
        },
      ],
    },
  ],
}
