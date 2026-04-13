import React from 'react'

interface LogoProps {
  className?: string
  size?: number
}

export function BrandLogo({ className = '', size = 32 }: LogoProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background with Gradient */}
      <defs>
        <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>
      
      <rect width="100" height="100" rx="24" fill="url(#logo-gradient)" />
      
      {/* "CP" Monogram Geometry */}
      <path 
        d="M30 40C30 31.7157 36.7157 25 45 25H55C63.2843 25 70 31.7157 70 40V45C70 53.2843 63.2843 60 55 60H45M45 40H70" 
        stroke="white" 
        strokeWidth="10" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      
      <path 
        d="M30 40V75" 
        stroke="white" 
        strokeWidth="10" 
        strokeLinecap="round"
      />
    </svg>
  )
}
