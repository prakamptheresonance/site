import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { headers } from 'next/headers'

export async function GET() {
  try {
    const payload = await getPayload({ config: configPromise })
    const headersList = await headers()
    const { user } = await payload.auth({ headers: headersList })

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const privateKey = (
      process.env.IMAGEKIT_SECRET ||
      process.env.IMAGEKIT_PRIVATE_KEY ||
      ''
    ).trim()
    const publicKey = (
      process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY ||
      process.env.IMAGEKIT_PUBLIC_KEY ||
      ''
    ).trim()

    if (!privateKey) {
      return NextResponse.json(
        { error: 'IMAGEKIT_SECRET is not configured on the server' },
        { status: 500 },
      )
    }

    if (!publicKey) {
      return NextResponse.json(
        {
          error:
            'NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY is not configured on the server. Please add it to your .env file.',
        },
        { status: 500 },
      )
    }

    const token = crypto.randomUUID()
    const expire = Math.floor(Date.now() / 1000) + 1800 // 30 minutes
    const signature = crypto
      .createHmac('sha1', privateKey)
      .update(token + String(expire))
      .digest('hex')

    return NextResponse.json({
      token,
      expire,
      signature,
      publicKey,
    })
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || 'Failed to generate ImageKit upload parameters' },
      { status: 500 },
    )
  }
}

