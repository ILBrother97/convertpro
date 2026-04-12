'use client'

import { useEffect, useRef } from 'react'

type Props = {
  slot: string
  format: 'banner' | 'sidebar' | 'in-content' | 'mobile'
  className?: string
}

const SIZE_MAP: Record<Props['format'], { width: number; height: number; label: string }> = {
  banner:     { width: 728, height: 90,  label: '728×90 Leaderboard' },
  sidebar:    { width: 160, height: 600, label: '160×600 Skyscraper' },
  'in-content': { width: 728, height: 90, label: '728×90 In-Content' },
  mobile:     { width: 320, height: 50,  label: '320×50 Mobile Banner' },
}

export function AdSlot({ slot, format, className = '' }: Props) {
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID
  const isDev = process.env.NODE_ENV === 'development' || !adsenseId || adsenseId.includes('XXX')
  const adRef = useRef<HTMLModElement>(null)
  const { width, height, label } = SIZE_MAP[format]

  useEffect(() => {
    if (!isDev && adsenseId && adRef.current) {
      try {
        // @ts-expect-error adsbygoogle is injected globally
        ;(window.adsbygoogle = window.adsbygoogle || []).push({})
      } catch {
        // silently ignore
      }
    }
  }, [isDev, adsenseId])

  if (isDev || !adsenseId) {
    return (
      <div
        className={`flex items-center justify-center border-2 border-dashed border-gray-300 bg-gray-50 rounded-lg text-gray-400 text-xs font-medium select-none ${className}`}
        style={{ width: '100%', maxWidth: width, height, minHeight: height }}
        aria-hidden="true"
      >
        <span>AD PLACEHOLDER · {label}</span>
      </div>
    )
  }

  return (
    <div className={className} style={{ minHeight: height }}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', width, height }}
        data-ad-client={adsenseId}
        data-ad-slot={slot}
        data-ad-format={format === 'in-content' ? 'auto' : undefined}
        data-full-width-responsive={format === 'in-content' ? 'true' : undefined}
      />
    </div>
  )
}
