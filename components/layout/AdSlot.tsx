'use client'

import { useEffect, useRef } from 'react'

type Props = {
  slot?: string // Kept for backwards compatibility
  format: 'banner' | 'sidebar' | 'in-content' | 'mobile'
  className?: string
}

const SIZE_MAP: Record<Props['format'], { width: number; height: number; label: string }> = {
  banner:       { width: 728, height: 90,  label: '728×90 Leaderboard' },
  'in-content': { width: 728, height: 90,  label: '728×90 In-Content' },
  sidebar:      { width: 160, height: 600, label: '160×600 Skyscraper' },
  mobile:       { width: 320, height: 50,  label: '320×50 Mobile Banner' },
}

export function AdSlot({ format, className = '' }: Props) {
  // Always show placeholders in development to prevent layout shifts and ad clicks
  const isDev = process.env.NODE_ENV === 'development'
  const adRef = useRef<HTMLDivElement>(null)
  const { width, height, label } = SIZE_MAP[format]

  useEffect(() => {
    // Escape early if in dev, if ref isn't attached, or if we already injected the script
    if (isDev || !adRef.current || adRef.current.hasChildNodes()) return
    
    // We only generated the Adsterra key for the 728x90 banner sizes!
    if (format !== 'banner' && format !== 'in-content') return

    // Create the Adsterra configuration script
    const conf = document.createElement('script')
    conf.type = 'text/javascript'
    conf.innerHTML = `atOptions = {
      'key' : 'bc6a127fea4ce146f60591141fec24a2',
      'format' : 'iframe',
      'height' : 90,
      'width' : 728,
      'params' : {}
    };`

    // Create the execution script
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = 'https://www.highperformanceformat.com/bc6a127fea4ce146f60591141fec24a2/invoke.js'

    // Append them simultaneously to trigger the ad load perfectly without document.write crashing react
    adRef.current.appendChild(conf)
    adRef.current.appendChild(script)
  }, [isDev, format])

  // If in dev mode, OR if it's the 160x600 sidebar (which we don't have a key for yet), show placeholder
  if (isDev || (format !== 'banner' && format !== 'in-content')) {
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

  // Production Adsterra Slot
  return (
    <div 
      className={`mx-auto flex justify-center items-center overflow-hidden ${className}`} 
      style={{ minHeight: height, maxWidth: width }} 
      ref={adRef} 
    />
  )
}

