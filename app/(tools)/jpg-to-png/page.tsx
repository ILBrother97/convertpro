import type { Metadata } from 'next'
import { getToolBySlug } from '@/lib/tools'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { ImageConverterTool } from '@/components/tools/ImageConverterTool'

const tool = getToolBySlug('jpg-to-png')!

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
        toMime="image/png"
        fromLabel="JPG image"
        toExt="png"
        quality={1}
        accept="image/jpeg,image/jpg"
      />
    </ToolLayout>
  )
}
