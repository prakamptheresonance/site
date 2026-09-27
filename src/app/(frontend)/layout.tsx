import React from 'react'
import type { Metadata } from 'next'
import { Cinzel, Outfit } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/providers/theme-provider'
import { ImageKitProvider } from '@imagekit/next'
import { Navbar } from '@/components/landing/navbar'
import { Footer } from '@/components/landing/footer'
import { getContactData } from '@/lib/data'

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800', '900'],
  variable: '--font-cinzel',
  display: 'swap',
})

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-outfit',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'PRAKAMP : THE RESONANCE | Live Music Band in Agartala, Tripura',
  description:
    'Prakamp : The Resonance is Agartala’s premier live music band. Delivering memorable performances across Classical, Bhajan, Sufi, Retro Hindi, Bollywood, Bengali Folk, and Live Orchestra. One Band. Every Genre. Every Occasion.',
  keywords: [
    'Prakamp The Resonance',
    'Live Music Band Agartala',
    'Music Band in Tripura',
    'Bengali Folk and Baul Band',
    'Bollywood Live Band Agartala',
    'Puja Cultural Programme Band',
    'Wedding Music Band Tripura',
    'Devotional Bhajan Live Music',
    'Saxophone and Orchestra Band Agartala',
  ],
  authors: [{ name: 'Prakamp : The Resonance' }],
  creator: 'Prakamp : The Resonance',
  publisher: 'Prakamp : The Resonance',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SERVER_URL || 'https://prakamptheresonance.com',
  ),
  openGraph: {
    title: 'PRAKAMP : THE RESONANCE | Live Music Band in Agartala',
    description:
      'One Band. Every Genre. Every Occasion. Delivering memorable live performances across Classical, Bollywood, Bengali Folk, Sufi, and Energetic Stage Shows.',
    url: 'https://prakamptheresonance.com',
    siteName: 'Prakamp : The Resonance',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PRAKAMP : THE RESONANCE | Live Music Band in Agartala',
    description:
      'One Band. Every Genre. Every Occasion. Delivering memorable live performances across Classical, Bollywood, Bengali Folk, Sufi, and Energetic Stage Shows.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

// JSON-LD Structured Data Schema for MusicGroup & Local Entertainment Business
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'MusicGroup',
      '@id': 'https://prakamptheresonance.com/#musicgroup',
      name: 'Prakamp : The Resonance',
      alternateName: 'Prakamp Band',
      description:
        'A versatile live music band from Agartala, delivering memorable performances across Classical, Bhajan, Sufi, Retro Hindi, Bollywood, Bengali Folk, and Grand Live Orchestra.',
      genre: [
        'Classical & Semi-Classical',
        'Bhajan & Devotional Music',
        'Sufi & Ghazal',
        'Retro Hindi (80s & 90s)',
        'Bollywood & Contemporary',
        'Bengali Folk & Baul',
        'Orchestra & Instrumental',
      ],
      location: {
        '@type': 'Place',
        name: 'Agartala, West Tripura, Tripura, India',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Agartala',
          addressRegion: 'Tripura',
          postalCode: '799001',
          addressCountry: 'IN',
        },
      },
    },
    {
      '@type': 'EntertainmentBusiness',
      '@id': 'https://prakamptheresonance.com/#business',
      name: 'Prakamp : The Resonance Live Band',
      image:
        'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1600&auto=format&fit=crop',
      telephone: '+91 98765 43210',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Agartala',
        addressRegion: 'Tripura',
        addressCountry: 'IN',
      },
      priceRange: '₹₹₹',
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday',
          ],
          opens: '09:00',
          closes: '23:00',
        },
      ],
    },
  ],
}

export default async function FrontendLayout(props: {
  children: React.ReactNode
  hero: React.ReactNode
  expertise: React.ReactNode
  gallery: React.ReactNode
  members: React.ReactNode
  occasions: React.ReactNode
  contact: React.ReactNode
}) {
  const { children, hero, expertise, gallery, members, occasions, contact } = props
  const contactData = await getContactData()

  return (
    <html
      lang="en"
      className={`dark ${cinzel.variable} ${outfit.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-black text-neutral-100 min-h-screen antialiased selection:bg-amber-500/30 selection:text-amber-200 font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <ImageKitProvider urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}>
            <div className="relative min-h-screen bg-black text-neutral-100 overflow-x-hidden">
              <Navbar
                whatsappNumber={contactData.whatsappNumber}
                whatsappPrompt={contactData.whatsappPrompt}
              />
              <main id="main-content">
                {hero}
                {expertise}
                {gallery}
                {members}
                {occasions}
                {contact}
                {children}
              </main>
              <Footer contact={contactData} />
            </div>
          </ImageKitProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
