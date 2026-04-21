import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { AdSlot } from '@/components/layout/AdSlot'
import '@/styles/globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    default: 'ConvertPro – Free Online File Converter | 300+ Formats',
    template: '%s | ConvertPro',
  },
  description:
    'Convert PDF, images, video, and audio files online for free. 300+ formats. No signup. Runs in your browser.',
  metadataBase: new URL('https://convertpro-online.vercel.app'),
  openGraph: {
    siteName: 'ConvertPro',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID

  const isRealAdsense = adsenseId && !adsenseId.includes('XXX')

  const isRealGA = gaId && !gaId.includes('XXX')

  return (
    <html lang="en" className={inter.variable}>
      <head>
        <meta name="google-site-verification" content="YMFANnP5KMDz6gZqTgriiHSOR-6g2uaA5NAHaKHxpTM" />
        {isRealAdsense && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
            crossOrigin="anonymous"
            strategy="lazyOnload"
          />
        )}
      </head>
      <body className="min-h-screen flex flex-col">
        <Navbar />

        {/* Top banner ad */}
        <div className="flex justify-center py-2 bg-gray-100 border-b border-gray-200">
          <AdSlot slot="1111111111" format="banner" />
        </div>

        <div className="flex-1">
          {children}
        </div>

        <Footer />

        {/* Google Analytics */}
        {isRealGA && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="lazyOnload"
            />
            <Script id="ga-init" strategy="lazyOnload">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  )
}
