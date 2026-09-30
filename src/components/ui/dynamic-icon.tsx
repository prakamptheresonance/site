import React from 'react'
import type { IconType } from 'react-icons'
import { FaMusic } from 'react-icons/fa'
import { getIconByKey } from '@/lib/icons/registry'

interface DynamicIconProps extends Omit<React.SVGProps<SVGSVGElement>, 'name'> {
  name?: string | null
  className?: string
  fallback?: IconType
}

export function DynamicIcon({
  name,
  className = 'size-6',
  fallback: FallbackIcon = FaMusic,
  style,
  ...props
}: DynamicIconProps) {
  const iconStyle: React.CSSProperties = {
    width: '24px',
    height: '24px',
    ...style,
  }

  if (!name) {
    return <FallbackIcon className={className} style={iconStyle} {...(props as any)} />
  }

  const ResolvedIcon = getIconByKey(name)

  if (!ResolvedIcon) {
    return <FallbackIcon className={className} style={iconStyle} {...(props as any)} />
  }

  return <ResolvedIcon className={className} style={iconStyle} {...(props as any)} />
}
