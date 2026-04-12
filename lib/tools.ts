export type Tool = {
  slug: string
  name: string
  title: string
  description: string
  icon: string
  category: 'PDF' | 'Image' | 'Video' | 'Audio' | 'Text' | 'OCR'
  engine: 'client' | 'cloudconvert'
  inputFormats: string[]
  outputFormats: string[]
  hot?: boolean
  isNew?: boolean
  faq: { q: string; a: string }[]
}

export const TOOLS: Tool[] = [
  {
    slug: 'compress-image',
    name: 'Compress Image',
    title: 'Compress Image Free Online – No Signup | ConvertPro',
    description:
      'Compress JPG, PNG, WebP and GIF images online for free. Reduce file size up to 90% with no visible quality loss. No signup required.',
    icon: 'ImageIcon',
    category: 'Image',
    engine: 'client',
    inputFormats: ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/bmp'],
    outputFormats: ['image/jpeg', 'image/png', 'image/webp'],
    hot: true,
    faq: [
      {
        q: 'Does compressing an image reduce quality?',
        a: 'Our tool uses smart lossy compression — visible quality loss is minimal and usually undetectable to the human eye.',
      },
      {
        q: 'What formats are supported?',
        a: 'JPG, PNG, WebP, GIF, and BMP.',
      },
      {
        q: 'Are my images uploaded to a server?',
        a: 'No — compression runs entirely in your browser. Your files never leave your device.',
      },
      {
        q: 'What is the maximum file size?',
        a: 'Up to 20 MB per image.',
      },
    ],
  },
  {
    slug: 'png-to-jpg',
    name: 'PNG to JPG',
    title: 'Convert PNG to JPG Free Online – No Signup | ConvertPro',
    description:
      'Convert PNG images to JPG format online for free. Fast, secure, and no software installation required.',
    icon: 'RefreshCw',
    category: 'Image',
    engine: 'client',
    inputFormats: ['image/png'],
    outputFormats: ['image/jpeg'],
    faq: [
      {
        q: 'Will converting PNG to JPG lose quality?',
        a: 'JPG uses lossy compression, so there may be a slight quality reduction. We default to 92% quality for minimal loss.',
      },
      {
        q: 'Does PNG to JPG conversion remove transparency?',
        a: 'Yes — JPG does not support transparency. Transparent areas will be replaced with a white background.',
      },
      {
        q: 'Are my files uploaded to a server?',
        a: 'No — the conversion happens entirely in your browser using the Canvas API.',
      },
    ],
  },
  {
    slug: 'jpg-to-png',
    name: 'JPG to PNG',
    title: 'Convert JPG to PNG Free Online – No Signup | ConvertPro',
    description:
      'Convert JPG images to PNG format online for free. Lossless conversion with transparency support.',
    icon: 'RefreshCw',
    category: 'Image',
    engine: 'client',
    inputFormats: ['image/jpeg'],
    outputFormats: ['image/png'],
    faq: [
      {
        q: 'Why convert JPG to PNG?',
        a: 'PNG supports lossless compression and transparency, making it ideal for logos, icons, and graphics.',
      },
      {
        q: 'Will the image quality improve after conversion?',
        a: "Converting to PNG won't restore quality lost during JPG compression, but no further quality loss will occur.",
      },
      {
        q: 'Are my files uploaded to a server?',
        a: 'No — the conversion happens entirely in your browser.',
      },
    ],
  },
  {
    slug: 'resize-image',
    name: 'Resize Image',
    title: 'Resize Image Online Free – No Signup | ConvertPro',
    description:
      'Resize images to any dimensions online for free. Maintain aspect ratio or set custom width and height.',
    icon: 'Scaling',
    category: 'Image',
    engine: 'client',
    inputFormats: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
    outputFormats: ['image/jpeg', 'image/png', 'image/webp'],
    faq: [
      {
        q: 'What image formats can I resize?',
        a: 'JPG, PNG, WebP, and GIF images are all supported.',
      },
      {
        q: 'Can I maintain the aspect ratio?',
        a: 'Yes — enable the "Maintain aspect ratio" toggle to automatically calculate the correct dimensions.',
      },
      {
        q: 'Are my files uploaded to a server?',
        a: 'No — resizing happens entirely in your browser using the Canvas API.',
      },
    ],
  },
  {
    slug: 'webp-converter',
    name: 'WebP Converter',
    title: 'Convert Images to WebP Free Online – No Signup | ConvertPro',
    description:
      'Convert JPG, PNG and GIF images to WebP format online for free. Reduce file sizes by up to 34% with WebP.',
    icon: 'Zap',
    category: 'Image',
    engine: 'client',
    inputFormats: ['image/jpeg', 'image/png', 'image/gif'],
    outputFormats: ['image/webp'],
    isNew: true,
    faq: [
      {
        q: 'What is WebP?',
        a: "WebP is a modern image format by Google that provides superior compression. It's 26-34% smaller than PNG and 25-35% smaller than JPG.",
      },
      {
        q: 'Is WebP supported by all browsers?',
        a: 'WebP is supported by Chrome, Firefox, Safari, Edge, and all modern browsers.',
      },
      {
        q: 'Are my files uploaded to a server?',
        a: 'No — the conversion runs entirely in your browser.',
      },
    ],
  },
  {
    slug: 'image-to-pdf',
    name: 'Image to PDF',
    title: 'Convert Images to PDF Free Online – No Signup | ConvertPro',
    description:
      'Convert JPG, PNG, WebP images to PDF online for free. Combine multiple images into one PDF document.',
    icon: 'FileImage',
    category: 'PDF',
    engine: 'client',
    inputFormats: ['image/jpeg', 'image/png', 'image/webp'],
    outputFormats: ['application/pdf'],
    hot: true,
    faq: [
      {
        q: 'Can I combine multiple images into one PDF?',
        a: 'Yes — upload multiple images and they will be placed on separate pages in the PDF.',
      },
      {
        q: 'What page sizes are available?',
        a: 'A4, US Letter, and Original image size are available.',
      },
      {
        q: 'Are my files uploaded to a server?',
        a: 'No — PDF creation runs in your browser using pdf-lib. Your images never leave your device.',
      },
    ],
  },
  {
    slug: 'merge-pdf',
    name: 'Merge PDF',
    title: 'Merge PDF Files Online Free | ConvertPro',
    description:
      'Merge multiple PDF files into one document online for free. Drag to reorder pages. No signup required.',
    icon: 'Files',
    category: 'PDF',
    engine: 'client',
    inputFormats: ['application/pdf'],
    outputFormats: ['application/pdf'],
    hot: true,
    faq: [
      {
        q: 'How many PDFs can I merge at once?',
        a: 'Up to 20 PDF files per merge.',
      },
      {
        q: 'Will the PDF quality be reduced after merging?',
        a: 'No — pages are copied at full quality, no re-rendering or re-compression.',
      },
      {
        q: 'Are my files uploaded to a server?',
        a: 'No — merging runs in your browser using pdf-lib. Files stay on your device.',
      },
      {
        q: 'Can I reorder pages before merging?',
        a: 'Yes — drag the files into any order before clicking Merge.',
      },
    ],
  },
  {
    slug: 'split-pdf',
    name: 'Split PDF',
    title: 'Split PDF Online Free – Extract Pages | ConvertPro',
    description:
      'Split a PDF into separate pages or extract specific page ranges online for free. No signup required.',
    icon: 'Scissors',
    category: 'PDF',
    engine: 'client',
    inputFormats: ['application/pdf'],
    outputFormats: ['application/pdf'],
    faq: [
      {
        q: 'Can I extract specific pages from a PDF?',
        a: 'Yes — enter a page range like "1-3, 5, 7-9" to extract exactly the pages you need.',
      },
      {
        q: 'Are my files uploaded to a server?',
        a: 'No — PDF splitting runs in your browser using pdf-lib.',
      },
      {
        q: 'What is the maximum PDF size?',
        a: 'Up to 50 MB per PDF.',
      },
    ],
  },
  {
    slug: 'compress-pdf',
    name: 'Compress PDF',
    title: 'Compress PDF Online Free – Reduce PDF File Size | ConvertPro',
    description:
      'Compress PDF files online for free. Reduce PDF size without losing quality. Perfect for email and web.',
    icon: 'FileArchive',
    category: 'PDF',
    engine: 'cloudconvert',
    inputFormats: ['application/pdf'],
    outputFormats: ['application/pdf'],
    faq: [
      {
        q: 'How much can a PDF be compressed?',
        a: 'Compression depends on the PDF content. PDFs with many images can be reduced by 50-80% or more.',
      },
      {
        q: 'Will compression affect the text quality?',
        a: 'Text remains fully readable and searchable after compression.',
      },
      {
        q: 'Is my PDF secure?',
        a: 'Files are encrypted in transit and permanently deleted from our servers after 24 hours.',
      },
    ],
  },
  {
    slug: 'pdf-to-word',
    name: 'PDF to Word',
    title: 'PDF to Word Converter Free – No Email Required | ConvertPro',
    description:
      'Convert PDF to editable Word DOCX online for free. Accurate formatting preserved. No signup required.',
    icon: 'FileOutput',
    category: 'PDF',
    engine: 'cloudconvert',
    inputFormats: ['application/pdf'],
    outputFormats: ['application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    hot: true,
    faq: [
      {
        q: 'Is the converted Word file editable?',
        a: 'Yes — the output is a fully editable .docx file.',
      },
      {
        q: 'How accurate is the PDF to Word conversion?',
        a: 'Accuracy depends on the PDF. Text-based PDFs convert with near-perfect accuracy. Scanned PDFs require OCR.',
      },
      {
        q: 'Is my PDF secure?',
        a: 'Files are encrypted in transit and permanently deleted from our servers after 24 hours.',
      },
      {
        q: 'What is the file size limit?',
        a: 'Up to 50 MB per PDF.',
      },
    ],
  },
  {
    slug: 'word-to-pdf',
    name: 'Word to PDF',
    title: 'Word to PDF Converter Free Online – No Signup | ConvertPro',
    description:
      'Convert Word DOCX documents to PDF online for free. Perfect formatting every time. No signup required.',
    icon: 'FileInput',
    category: 'PDF',
    engine: 'cloudconvert',
    inputFormats: ['application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    outputFormats: ['application/pdf'],
    faq: [
      {
        q: 'Will the formatting be preserved?',
        a: 'Yes — our converter maintains fonts, tables, images, and layout with high accuracy.',
      },
      {
        q: 'What Word formats are supported?',
        a: 'DOCX format is supported. If you have an older .doc file, save it as .docx first.',
      },
      {
        q: 'Is my file secure?',
        a: 'Files are encrypted in transit and permanently deleted from our servers after 24 hours.',
      },
    ],
  },
  {
    slug: 'pdf-to-jpg',
    name: 'PDF to JPG',
    title: 'Convert PDF to JPG Images Free Online | ConvertPro',
    description:
      'Convert PDF pages to high-quality JPG images online for free. Each page becomes a separate image.',
    icon: 'Image',
    category: 'PDF',
    engine: 'cloudconvert',
    inputFormats: ['application/pdf'],
    outputFormats: ['image/jpeg'],
    faq: [
      {
        q: 'Does each PDF page become a separate image?',
        a: 'Yes — each page of the PDF is converted to a separate JPG image.',
      },
      {
        q: 'What resolution are the output images?',
        a: 'Images are converted at 150 DPI by default, which is suitable for screen viewing. High print quality requires 300 DPI.',
      },
      {
        q: 'Is my PDF secure?',
        a: 'Files are encrypted in transit and permanently deleted from our servers after 24 hours.',
      },
    ],
  },
  {
    slug: 'pdf-ocr',
    name: 'PDF OCR',
    title: 'PDF OCR – Extract Text from Scanned PDF Free | ConvertPro',
    description:
      'Extract and recognize text from scanned PDF files using OCR. Convert scanned PDFs to searchable, editable documents.',
    icon: 'Scan',
    category: 'OCR',
    engine: 'cloudconvert',
    inputFormats: ['application/pdf'],
    outputFormats: ['application/pdf'],
    isNew: true,
    faq: [
      {
        q: 'What is OCR?',
        a: 'OCR (Optical Character Recognition) scans the pixels in an image or PDF and converts them into machine-readable text.',
      },
      {
        q: 'What languages are supported?',
        a: 'English, Arabic, French, German, and Spanish are supported.',
      },
      {
        q: 'Is my PDF secure?',
        a: 'Files are encrypted in transit and permanently deleted from our servers after 24 hours.',
      },
    ],
  },
  {
    slug: 'image-to-text',
    name: 'Image to Text',
    title: 'Image to Text (OCR) Free Online – Extract Text | ConvertPro',
    description:
      'Extract text from images using OCR. Supports JPG, PNG, and more. Fast, accurate, and free.',
    icon: 'Type',
    category: 'OCR',
    engine: 'cloudconvert',
    inputFormats: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    outputFormats: ['text/plain'],
    faq: [
      {
        q: 'What image formats are supported?',
        a: 'JPG, PNG, GIF, and WebP images are supported.',
      },
      {
        q: 'How accurate is the text recognition?',
        a: 'Accuracy is very high for clear, well-lit images with standard fonts. Handwritten text may have lower accuracy.',
      },
      {
        q: 'What languages can be recognized?',
        a: 'English, Arabic, French, German, and Spanish.',
      },
    ],
  },
  {
    slug: 'mp4-to-mp3',
    name: 'MP4 to MP3',
    title: 'Convert MP4 to MP3 Free Online – Extract Audio | ConvertPro',
    description:
      'Extract audio from MP4 video files and convert to MP3 online for free. Choose your bitrate. No signup.',
    icon: 'Music',
    category: 'Video',
    engine: 'cloudconvert',
    inputFormats: ['video/mp4'],
    outputFormats: ['audio/mpeg'],
    hot: true,
    faq: [
      {
        q: 'What bitrates are available?',
        a: '128 kbps (standard), 192 kbps (high quality), and 320 kbps (maximum quality).',
      },
      {
        q: 'What is the maximum file size?',
        a: 'Up to 500 MB per video file.',
      },
      {
        q: 'Is my file secure?',
        a: 'Files are encrypted in transit and permanently deleted from our servers after 24 hours.',
      },
    ],
  },
  {
    slug: 'compress-video',
    name: 'Compress Video',
    title: 'Compress Video Online Free – Reduce Video File Size | ConvertPro',
    description:
      'Compress MP4 video files online for free. Reduce file size for sharing, email, and storage. No signup.',
    icon: 'Video',
    category: 'Video',
    engine: 'cloudconvert',
    inputFormats: ['video/mp4'],
    outputFormats: ['video/mp4'],
    faq: [
      {
        q: 'How much can a video be compressed?',
        a: 'Depending on the original quality, videos can be reduced by 30-70% in file size.',
      },
      {
        q: 'What quality options are available?',
        a: 'High, Medium, and Low quality presets are available.',
      },
      {
        q: 'Is my file secure?',
        a: 'Files are encrypted in transit and permanently deleted from our servers after 24 hours.',
      },
    ],
  },
  {
    slug: 'word-counter',
    name: 'Word Counter',
    title: 'Word Counter Free Online – Count Words & Characters | ConvertPro',
    description:
      'Count words, characters, sentences, and lines instantly. Get reading time and keyword density. Free.',
    icon: 'Hash',
    category: 'Text',
    engine: 'client',
    inputFormats: ['text/plain'],
    outputFormats: ['text/plain'],
    faq: [
      {
        q: 'What statistics does the word counter provide?',
        a: 'Word count, character count (with and without spaces), line count, sentence count, paragraph count, and estimated reading time.',
      },
      {
        q: 'Is there a character limit?',
        a: 'No limit — you can paste or type as much text as you need.',
      },
      {
        q: 'Are my text contents stored?',
        a: 'No — everything runs in your browser. Your text is never sent to any server.',
      },
    ],
  },
]

export function getToolBySlug(slug: string): Tool | undefined {
  return TOOLS.find((t) => t.slug === slug)
}

export const CATEGORIES = ['All', 'PDF', 'Image', 'Video', 'Audio', 'Text', 'OCR'] as const
export type Category = (typeof CATEGORIES)[number]
