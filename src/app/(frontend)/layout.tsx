import React from 'react'
import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { Cinzel, Outfit } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/providers/theme-provider'
import { ImageKitProvider } from '@imagekit/next'
import { Navbar } from '@/components/landing/navbar'
import { Footer } from '@/components/landing/footer'
import { getContactData, getSiteSettingsData, getGenresData } from '@/lib/data'

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

export async function generateMetadata(): Promise<Metadata> {
  const [siteSettings, headersList] = await Promise.all([
    getSiteSettingsData(),
    headers(),
  ])

  const host =
    headersList.get('x-forwarded-host') || headersList.get('host') || ''
  const proto = headersList.get('x-forwarded-proto') || 'https'
  const siteUrl = host ? `${proto}://${host}` : process.env.NEXT_PUBLIC_SERVER_URL

  const title = siteSettings.title
  const description = siteSettings.description
  const brandName = siteSettings.brandName
  const keywords = siteSettings.keywords

  const ogTitle = siteSettings.ogTitle || title
  const ogDescription = siteSettings.ogDescription || description
  const ogImages = siteSettings.ogImage
    ? [
        {
          url: siteSettings.ogImage,
          alt: brandName || ogTitle || '',
        },
      ]
    : undefined

  const twitterHandle = siteSettings.twitterHandle
    ? siteSettings.twitterHandle.startsWith('@')
      ? siteSettings.twitterHandle
      : `@${siteSettings.twitterHandle}`
    : undefined

  const twitterCard = siteSettings.twitterCard || 'summary_large_image'

  return {
    title,
    description,
    keywords,
    authors: brandName ? [{ name: brandName }] : undefined,
    creator: brandName,
    publisher: brandName,
    metadataBase: siteUrl ? new URL(siteUrl) : undefined,
    alternates: siteUrl
      ? {
          canonical: '/',
        }
      : undefined,
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: siteUrl,
      siteName: brandName,
      locale: 'en_IN',
      type: 'website',
      images: ogImages,
    },
    twitter: {
      card: twitterCard,
      title: ogTitle,
      description: ogDescription,
      site: twitterHandle,
      creator: twitterHandle,
      images: siteSettings.ogImage ? [siteSettings.ogImage] : undefined,
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
  const { children, hero, expertise, gallery, members, occasions, contact } =
    props
  const [contactData, siteSettings, headersList, genres] = await Promise.all([
    getContactData(),
    getSiteSettingsData(),
    headers(),
    getGenresData(),
  ])

  const host =
    headersList.get('x-forwarded-host') || headersList.get('host') || ''
  const proto = headersList.get('x-forwarded-proto') || 'https'
  const siteUrl = host ? `${proto}://${host}` : process.env.NEXT_PUBLIC_SERVER_URL
  const brandName = siteSettings.brandName
  const description = siteSettings.description

  const sameAsSocials = [
    contactData.facebook,
    contactData.instagram,
    contactData.youtube,
  ].filter(Boolean) as string[]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'MusicGroup',
        ...(siteUrl ? { '@id': `${siteUrl}/#musicgroup`, url: siteUrl } : {}),
        ...(brandName ? { name: brandName } : {}),
        ...(description ? { description } : {}),
        ...(sameAsSocials.length > 0 ? { sameAs: sameAsSocials } : {}),
        ...(contactData.address
          ? {
              location: {
                '@type': 'Place',
                name: contactData.address,
                address: {
                  '@type': 'PostalAddress',
                  streetAddress: contactData.address,
                },
              },
            }
          : {}),
      },
      {
        '@type': 'EntertainmentBusiness',
        ...(siteUrl ? { '@id': `${siteUrl}/#business`, url: siteUrl } : {}),
        ...(brandName ? { name: `${brandName} Live Band` } : {}),
        ...(siteSettings.ogImage ? { image: siteSettings.ogImage } : {}),
        ...(contactData.primaryPhone
          ? { telephone: contactData.primaryPhone }
          : {}),
        ...(contactData.address
          ? {
              address: {
                '@type': 'PostalAddress',
                streetAddress: contactData.address,
              },
            }
          : {}),
        priceRange: '₹₹₹',
      },
    ],
  }

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
              <Footer
                contact={contactData}
                genreCount={genres.length}
                footerBio={siteSettings.footerDescription}
              />
            </div>
          </ImageKitProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
