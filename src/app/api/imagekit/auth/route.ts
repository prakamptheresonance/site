import { NextResponse } from 'next/server'
import crypto from 'crypto'

export async function GET() {
  const privateKey =
    process.env.IMAGEKIT_SECRET || process.env.IMAGEKIT_PRIVATE_KEY
  const publicKey =
    process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || process.env.IMAGEKIT_PUBLIC_KEY

  if (!privateKey) {
    return NextResponse.json(
      { error: 'IMAGEKIT_SECRET is not configured on the server' },
      { status: 500 },
    )
  }

  const token = crypto.randomUUID()
  const expire = Math.floor(Date.now() / 1000) + 1800 // 30 minutes
  const signature = crypto
    .createHmac('sha1', privateKey.trim())
    .update(token + String(expire))
    .digest('hex')

  return NextResponse.json({
    token,
    expire,
    signature,
    publicKey: publicKey || '',
  })
}
