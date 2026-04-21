import type { Metadata } from 'next'
import { getToolBySlug } from '@/lib/tools'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { ImageConverterTool } from '@/components/tools/ImageConverterTool'

const tool = getToolBySlug('png-to-jpg')!

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
  alternates: { canonical: `https://convertpro-online.vercel.app/${tool.slug}` },
  openGraph: { title: tool.title, description: tool.description, url: `https://convertpro-online.vercel.app/${tool.slug}`, siteName: 'ConvertPro', type: 'website' },
}

export default function Page() {
  return (
    <ToolLayout tool={tool}>
      <ImageConverterTool
        fromMime="image/png"
        toMime="image/jpeg"
        fromLabel="PNG image"
        toExt="jpg"
        quality={0.92}
        accept="image/png"
      />
    </ToolLayout>
  )
}
