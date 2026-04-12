'use client'

import { useEffect, useRef } from 'react'

type Props = {
  slot?: string 
  format: 'banner' | 'sidebar' | 'in-content' | 'mobile'
  className?: string
}

// Global configuration for Adsterra keys per layout format
const AD_CONFIG: Record<Props['format'], { key: string; width: number; height: number; label: string }> = {
  banner:       { key: 'f672a5dec45f7e8ec5b27bf199e8d46d', width: 728, height: 90,  label: '728×90 Leaderboard' },
  'in-content': { key: 'f672a5dec45f7e8ec5b27bf199e8d46d', width: 728, height: 90,  label: '728×90 In-Content' },
  sidebar:      { key: '4dfd8afa4d83927560c4b339d89d440d', width: 160, height: 600, label: '160×600 Skyscraper' },
  mobile:       { key: 'f936866e3b886b1cf1ca41e79a6f3dc5', width: 160, height: 300, label: '160×300 Mobile/Small' },
}

export function AdSlot({ format, className = '' }: Props) {
  const isDev = process.env.NODE_ENV === 'development'
  const adRef = useRef<HTMLDivElement>(null)
  const config = AD_CONFIG[format]

  useEffect(() => {
    // Prevent double injection or injection in dev mode
    if (isDev || !adRef.current || adRef.current.hasChildNodes()) return
    
    // Create the Adsterra configuration script
    const conf = document.createElement('script')
    conf.type = 'text/javascript'
    conf.innerHTML = `atOptions = {
      'key' : '${config.key}',
      'format' : 'iframe',
      'height' : ${config.height},
      'width' : ${config.width},
      'params' : {}
    };`

    // Create the execution script
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = `https://www.highperformanceformat.com/${config.key}/invoke.js`

    // Append both to the div
    adRef.current.appendChild(conf)
    adRef.current.appendChild(script)
  }, [isDev, config])

  if (isDev) {
    return (
      <div
        className={`flex items-center justify-center border-2 border-dashed border-gray-300 bg-gray-50 rounded-lg text-gray-400 text-xs font-medium select-none ${className}`}
        style={{ width: '100%', maxWidth: config.width, height: config.height, minHeight: config.height }}
        aria-hidden="true"
      >
        <span>AD PLACEHOLDER · {config.label}</span>
      </div>
    )
  }

  return (
    <div 
      className={`mx-auto flex justify-center items-center overflow-hidden ${className}`} 
      style={{ minHeight: config.height, maxWidth: config.width }} 
      ref={adRef} 
    />
  )
}


