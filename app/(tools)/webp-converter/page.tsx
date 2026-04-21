import type { Metadata } from 'next'
import { getToolBySlug } from '@/lib/tools'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { ImageConverterTool } from '@/components/tools/ImageConverterTool'

const tool = getToolBySlug('webp-converter')!

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
        fromMime="image/jpeg"
        toMime="image/webp"
        fromLabel="JPG or PNG image"
        toExt="webp"
        quality={0.85}
        accept="image/jpeg,image/png,image/gif"
      />
    </ToolLayout>
  )
}
