import React from 'react'

interface LogoProps {
  className?: string
  size?: number
}

export function BrandLogo({ className = '', size = 200 }: LogoProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 500 500" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9d00ff" />
          <stop offset="100%" stopColor="#6a0dad" />
        </linearGradient>
        
        <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2a1b54" />
          <stop offset="100%" stopColor="#1a1040" />
        </linearGradient>

        <linearGradient id="shadowGradient" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#120830" />
          <stop offset="100%" stopColor="#2a1b54" />
        </linearGradient>
      </defs>

      <g transform="translate(250, 210)">
        <path d="M 10,-90 C -90,-120 -160,-20 -120,60 C -90,120 -20,130 30,120 C -30,100 -70,60 -70,0 C -70,-50 -10,-50 30,-30 Z" 
              fill="url(#purpleGradient)" />

        <path d="M -30,-80 C 60,-130 150,-40 90,40 C 50,90 -10,70 -40,110 L -20,50 C 30,60 80,20 50,-30 C 20,-80 -40,-50 -60,-10 Z" 
              fill="url(#blueGradient)" />

        <path d="M -40,110 L 10,10 C -10,10 -30,30 -60,60 Z" 
              fill="url(#shadowGradient)" />
      </g>
    </svg>
  )
}
