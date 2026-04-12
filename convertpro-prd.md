# ConvertPro — Product Requirements Document
**Version:** 1.0  
**Stack:** Next.js 14 (App Router, SSG) · Tailwind CSS · Vercel  
**Goal:** A multi-tool file conversion website monetized via Google AdSense. Every tool has its own SEO-optimized page. All lightweight tools run client-side (zero server cost). Heavy tools (PDF↔Office, OCR, video) call the CloudConvert API.

---

## 1. Tech Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | Next.js 14 (App Router) | `output: 'export'` for static pages |
| Styling | Tailwind CSS | Utility-first, no component lib |
| Client-side PDF | `pdf-lib` ^1.17.1 | Merge, split, reorder — no API |
| Client-side images | `browser-image-compression` ^2.0.2 | Compress in browser |
| Heavy conversions | CloudConvert REST API | PDF↔Office, OCR, video, audio |
| Hosting | Vercel (free tier) | Auto-deploy from GitHub main |
| Analytics | Google Analytics 4 | Via `@next/third-parties` |
| Ads | Google AdSense | Via `next/script` |
| Domain | convertpro.io | Configure in Vercel dashboard |

---

## 2. Project Structure

```
convertpro/
├── app/
│   ├── layout.tsx               # Root layout — nav, footer, GA, AdSense
│   ├── page.tsx                 # Homepage — tool grid + hero
│   ├── sitemap.ts               # Auto-generated sitemap (all tool slugs)
│   ├── robots.ts                # robots.txt
│   │
│   ├── (tools)/                 # Route group — all tool pages share ToolLayout
│   │   ├── compress-image/page.tsx
│   │   ├── pdf-to-word/page.tsx
│   │   ├── word-to-pdf/page.tsx
│   │   ├── merge-pdf/page.tsx
│   │   ├── split-pdf/page.tsx
│   │   ├── compress-pdf/page.tsx
│   │   ├── image-to-pdf/page.tsx
│   │   ├── pdf-to-jpg/page.tsx
│   │   ├── png-to-jpg/page.tsx
│   │   ├── jpg-to-png/page.tsx
│   │   ├── resize-image/page.tsx
│   │   ├── webp-converter/page.tsx
│   │   ├── mp4-to-mp3/page.tsx
│   │   ├── compress-video/page.tsx
│   │   ├── word-counter/page.tsx
│   │   ├── image-to-text/page.tsx  (OCR)
│   │   └── pdf-ocr/page.tsx
│   │
│   └── api/
│       └── convert/route.ts     # CloudConvert proxy (keeps API key server-side)
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── AdSlot.tsx           # Reusable AdSense unit wrapper
│   │
│   ├── tools/
│   │   ├── ToolLayout.tsx       # Hero + ad slots + FAQ — wraps every tool
│   │   ├── DropZone.tsx         # Drag-and-drop file input (reusable)
│   │   ├── FileList.tsx         # Sortable list of uploaded files
│   │   ├── ProgressBar.tsx
│   │   └── DownloadButton.tsx
│   │
│   └── home/
│       ├── Hero.tsx
│       └── ToolGrid.tsx
│
├── lib/
│   ├── cloudconvert.ts          # CloudConvert API client
│   ├── tools.ts                 # Master list of all tools (slug, name, meta, category)
│   └── utils.ts                 # formatBytes, mimeToExt, etc.
│
├── public/
│   └── icons/                   # SVG tool icons
│
├── styles/
│   └── globals.css
│
├── next.config.js
├── tailwind.config.js
└── .env.local
```

---

## 3. Environment Variables

```bash
# .env.local
CLOUDCONVERT_API_KEY=your_key_here
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_ADSENSE_ID=ca-pub-XXXXXXXXXXXXXXXX
```

`CLOUDCONVERT_API_KEY` is only used server-side in `app/api/convert/route.ts`. Never expose it client-side.

---

## 4. Master Tool List (`lib/tools.ts`)

Export a `TOOLS` array. Each entry has:

```ts
export type Tool = {
  slug: string           // URL: /compress-image
  name: string           // Display: "Compress Image"
  title: string          // SEO <title>: "Compress Image Free Online – No Signup"
  description: string    // Meta description (150–160 chars)
  icon: string           // Emoji
  category: 'PDF' | 'Image' | 'Video' | 'Audio' | 'Text' | 'OCR'
  engine: 'client' | 'cloudconvert'  // How conversion runs
  inputFormats: string[] // Accepted MIME types
  outputFormats: string[]
  hot?: boolean
  isNew?: boolean
  faq: { q: string; a: string }[]
}
```

### Full tool list:

| Slug | Name | Engine | Category |
|---|---|---|---|
| `compress-image` | Compress Image | client | Image |
| `png-to-jpg` | PNG to JPG | client | Image |
| `jpg-to-png` | JPG to PNG | client | Image |
| `resize-image` | Resize Image | client | Image |
| `webp-converter` | WebP Converter | client | Image |
| `image-to-pdf` | Image to PDF | client | PDF |
| `merge-pdf` | Merge PDF | client | PDF |
| `split-pdf` | Split PDF | client | PDF |
| `compress-pdf` | Compress PDF | cloudconvert | PDF |
| `pdf-to-word` | PDF to Word | cloudconvert | PDF |
| `word-to-pdf` | Word to PDF | cloudconvert | PDF |
| `pdf-to-jpg` | PDF to JPG | cloudconvert | PDF |
| `pdf-ocr` | PDF OCR | cloudconvert | OCR |
| `image-to-text` | Image to Text | cloudconvert | OCR |
| `mp4-to-mp3` | MP4 to MP3 | cloudconvert | Video |
| `compress-video` | Compress Video | cloudconvert | Video |
| `word-counter` | Word Counter | client | Text |

---

## 5. Layouts & Shared Components

### 5.1 Root Layout (`app/layout.tsx`)

- `<html lang="en">`
- Import `globals.css` and Tailwind
- Render `<Navbar />` (sticky, z-50)
- Render `<AdSlot position="top-banner" />` below nav (728×90 leaderboard)
- Render `{children}`
- Render `<Footer />`
- Inject Google Analytics 4 via `<GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />`
- Inject AdSense script via `<Script src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js" />`

### 5.2 Navbar (`components/layout/Navbar.tsx`)

- Logo: "Convert**Pro**" — "Convert" in indigo-600, "Pro" in gray-900
- Nav links: PDF Tools · Image Tools · Video · Audio · All Tools (→ `/#tools`)
- Mobile: hamburger menu, full-screen dropdown
- Active link highlighted
- Sticky top-0, white bg, bottom border

### 5.3 Footer (`components/layout/Footer.tsx`)

- Links: About · Privacy Policy · Terms · Sitemap · Contact
- Copyright line with current year
- Trust badges: "🔒 SSL Secured" · "🗑 Files deleted after 24h" · "🆓 Free forever"

### 5.4 AdSlot (`components/layout/AdSlot.tsx`)

```tsx
type Props = {
  slot: string           // AdSense ad slot ID
  format: 'banner' | 'sidebar' | 'in-content' | 'mobile'
  className?: string
}
```

- In development: render a labeled placeholder div with dashed border
- In production: render `<ins class="adsbygoogle" ...>`
- Sizes:
  - `banner`: 728×90 (leaderboard)
  - `sidebar`: 160×600 (skyscraper)  
  - `in-content`: 728×90 or responsive
  - `mobile`: 320×50

### 5.5 ToolLayout (`components/tools/ToolLayout.tsx`)

Every single tool page uses this. It provides:

```tsx
type Props = {
  tool: Tool             // from lib/tools.ts
  children: ReactNode    // the actual tool UI
}
```

Structure:
1. `<head>` meta via `generateMetadata()` — title, description, canonical, OG tags
2. JSON-LD `WebApplication` schema
3. JSON-LD `FAQPage` schema (from `tool.faq`)
4. Purple gradient hero: icon + h1 + description + trust badges
5. Two-column layout: `[tool UI + in-content ad + FAQ]` | `[sidebar ad]`
6. On mobile: single column, sidebar ad hidden

### 5.6 DropZone (`components/tools/DropZone.tsx`)

```tsx
type Props = {
  accept: string         // MIME types, e.g. "image/*" or ".pdf"
  multiple?: boolean
  maxSizeMB?: number     // default 50
  onFiles: (files: File[]) => void
  label?: string
  sublabel?: string
}
```

- Drag-over state: indigo border + light purple background
- Click to open file picker
- Validates file type and size, shows inline error if invalid
- Shows file count badge when `multiple` and files are selected

---

## 6. Homepage (`app/page.tsx`)

### Hero section
- Headline: "Convert Any File, Free & Instant"
- Subheadline: "PDF, Word, images, audio, video — 300+ formats. No signup. Works on every device."
- Trust badge pills: 🔒 Deleted after 24h · ⚡ 300+ formats · 🌍 All platforms · ✨ OCR · 🆓 Free
- Large centered DropZone with format pills (PDF, DOCX, JPG, PNG, MP4, MP3, +290 more)
- "Choose File to Convert" primary button + "From URL" secondary button

### Category tabs
Filter bar: All · PDF · Image · Video · Audio · Text · OCR  
Clicking a tab filters the tool grid below.

### Tool grid (`id="tools"`)
- Responsive grid: `repeat(auto-fill, minmax(220px, 1fr))`
- Each card: icon + name + short description + HOT/NEW badge
- Cards link to `/{slug}`
- Hover: indigo border + subtle lift

### Stats bar
50M+ Files Converted · 300+ Formats · 99.9% Uptime · 4.9★ Rating

### Features section
8 features: Security · Speed · Drag & Drop · All Platforms · OCR · Advanced Options · Batch · Free

### "How it works" — 4 steps
Upload → Choose format → Set options → Download

### Platforms bar
Windows · macOS · Linux · Android · iOS · Any browser

---

## 7. Tool Pages

Each tool page in `app/(tools)/[slug]/page.tsx` should:

1. Import its `Tool` config from `lib/tools.ts`
2. Wrap everything in `<ToolLayout tool={tool}>`
3. Implement the tool-specific UI inside

### 7.1 Client-side tools (no API)

#### `compress-image`
- DropZone: `accept="image/*"` single file
- Quality slider: 20–95%, default 80
- Show: original filename, original size
- On "Compress": use `browser-image-compression` with `{ maxSizeMB, useWebWorker: true, onProgress }`
- Show side-by-side before/after preview with sizes
- Show savings badge: "-47% smaller"
- Download button: `compressed_[filename]`

#### `png-to-jpg`, `jpg-to-png`, `webp-converter`
- DropZone: accept source format
- Use Canvas API: `canvas.toDataURL('image/jpeg', 0.92)` for conversions
- Quality slider for lossy formats
- Download converted file

#### `resize-image`
- DropZone: `accept="image/*"`
- Inputs: width (px), height (px), maintain aspect ratio toggle
- Live preview of output dimensions
- Canvas API resize, download

#### `image-to-pdf`
- DropZone: `accept="image/*"` multiple
- Sortable file list (drag to reorder)
- Page size select: A4 · Letter · Original
- Use `pdf-lib`: create PDF, embed each image as a page
- Download `images.pdf`

#### `merge-pdf`
- DropZone: `accept=".pdf"` multiple
- Sortable file list with drag handles and ↑↓ buttons
- File count and total size display
- Use `pdf-lib`: load each PDF, copy all pages into new doc
- Download `merged.pdf`

#### `split-pdf`
- DropZone: `accept=".pdf"` single
- After upload: show page count
- Input: "Extract pages" — e.g. "1-3, 5, 7-9"
- Parse range, use `pdf-lib` to extract and create new doc
- Download `split.pdf`

#### `word-counter`
- Large textarea
- Live stats: Words · Characters · No spaces · Lines · Sentences · Reading time
- Clear button · Copy button
- Optional: keyword density table

### 7.2 CloudConvert tools (via API proxy)

All CloudConvert tools follow the same UI flow:

1. DropZone for input file
2. "Convert" button → POST to `/api/convert`
3. Show animated progress bar (poll `/api/convert?jobId=xxx` every 2s)
4. On complete: show "Download" button with output filename + size
5. Show "Convert another file" button to reset

Tools: `compress-pdf`, `pdf-to-word`, `word-to-pdf`, `pdf-to-jpg`, `pdf-ocr`, `image-to-text`, `mp4-to-mp3`, `compress-video`

For `pdf-to-word` and `word-to-pdf`: accept `.pdf` / `.docx` respectively  
For `mp4-to-mp3`: show bitrate select (128kbps, 192kbps, 320kbps)  
For `compress-video`: show quality select (High, Medium, Low)  
For `pdf-ocr` and `image-to-text`: show language select (English, Arabic, French, German, Spanish)

---

## 8. API Route — CloudConvert Proxy

### `app/api/convert/route.ts`

#### POST `/api/convert`
Request body:
```json
{
  "tool": "pdf-to-word",
  "fileBase64": "...",
  "fileName": "document.pdf",
  "options": {}
}
```

Steps:
1. Validate tool is in allowed list
2. Create CloudConvert job via `https://api.cloudconvert.com/v2/jobs`
3. Job has 3 tasks: `import/base64` → `convert` → `export/url`
4. Return `{ jobId: "..." }`

#### GET `/api/convert?jobId=xxx`
1. Fetch job status from CloudConvert
2. If status is `finished`: return `{ status: 'done', downloadUrl: '...', fileName: '...', fileSize: ... }`
3. If status is `error`: return `{ status: 'error', message: '...' }`
4. Otherwise: return `{ status: 'processing', percent: 0–100 }`

### `lib/cloudconvert.ts`

Map each tool slug to a CloudConvert task config:

```ts
const CONVERSION_MAP: Record<string, object> = {
  'pdf-to-word':   { operation: 'convert', input_format: 'pdf',  output_format: 'docx' },
  'word-to-pdf':   { operation: 'convert', input_format: 'docx', output_format: 'pdf'  },
  'compress-pdf':  { operation: 'optimize', input_format: 'pdf' },
  'pdf-to-jpg':    { operation: 'convert', input_format: 'pdf',  output_format: 'jpg'  },
  'pdf-ocr':       { operation: 'convert', input_format: 'pdf',  output_format: 'pdf', ocr: true },
  'image-to-text': { operation: 'convert', input_format: 'jpg',  output_format: 'txt', ocr: true },
  'mp4-to-mp3':    { operation: 'convert', input_format: 'mp4',  output_format: 'mp3' },
  'compress-video':{ operation: 'convert', input_format: 'mp4',  output_format: 'mp4', video_codec: 'x264', crf: 28 },
}
```

---

## 9. SEO Requirements

### Per-page metadata (via `generateMetadata()` in each page)

Every tool page exports:
```ts
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: tool.title,          // "Compress Image Free Online – No Signup | ConvertPro"
    description: tool.description,
    alternates: { canonical: `https://convertpro.io/${tool.slug}` },
    openGraph: {
      title: tool.title,
      description: tool.description,
      url: `https://convertpro.io/${tool.slug}`,
      siteName: 'ConvertPro',
      type: 'website',
    },
  }
}
```

### Title formula
`[Action] [Format] Free Online – No Signup | ConvertPro`

Examples:
- "Compress Image Free Online – No Signup | ConvertPro"
- "PDF to Word Converter Free – No Email Required | ConvertPro"
- "Merge PDF Files Online Free | ConvertPro"

### JSON-LD schemas (injected by ToolLayout)

**WebApplication:**
```json
{
  "@type": "WebApplication",
  "name": "[Tool Name]",
  "url": "https://convertpro.io/[slug]",
  "applicationCategory": "UtilitiesApplication",
  "operatingSystem": "All",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
}
```

**FAQPage:** Generated from `tool.faq` array. Minimum 3 FAQ items per tool.

### Sitemap (`app/sitemap.ts`)
- Homepage priority 1.0, changefreq weekly
- All tool pages priority 0.8, changefreq monthly
- Auto-generated from `TOOLS` array — no manual updates needed

### robots.ts
```
User-agent: *
Allow: /
Sitemap: https://convertpro.io/sitemap.xml
```

---

## 10. Performance Requirements

- Lighthouse Performance score ≥ 90 on all tool pages
- LCP (Largest Contentful Paint) < 2.5s
- CLS (Cumulative Layout Shift) < 0.1
- No layout shift from AdSense slots — reserve space with fixed-height containers before ads load
- All client-side tools must use `useWebWorker: true` or Web Workers where available to avoid blocking the main thread
- Images: use `next/image` with `width` and `height` props everywhere
- Fonts: use `next/font/google` with `display: 'swap'`

---

## 11. Ad Placement Spec

Implement `<AdSlot />` in these exact positions:

| Position | Component | Format | Notes |
|---|---|---|---|
| Below navbar | `RootLayout` | `banner` 728×90 | On every page |
| Tool page sidebar | `ToolLayout` | `sidebar` 160×600 | Desktop only (hidden md:block) |
| Below tool result | `ToolLayout` | `in-content` 728×90 | After conversion completes |
| Homepage mid | `page.tsx` | `in-content` 728×90 | Between categories and tool grid |
| Footer above | `Footer` | `banner` 728×90 | Every page |

In `AdSlot.tsx`:
- When `process.env.NODE_ENV === 'development'` → show labeled placeholder box
- When `process.env.NEXT_PUBLIC_ADSENSE_ID` is set → render real AdSense unit
- Always pre-reserve height to prevent CLS

---

## 12. Security & File Handling

- For client-side tools: files never leave the device. Display a "🔒 Runs in your browser — no upload" badge.
- For CloudConvert tools: display "🔒 Files encrypted in transit and deleted after 24 hours"
- Max upload size per tool:
  - Images: 20 MB
  - PDFs: 50 MB
  - Video: 500 MB
  - Audio: 100 MB
- Validate file type client-side before any upload (check MIME type and extension)
- Rate limit the `/api/convert` route: max 10 requests per IP per hour (use Vercel KV or simple in-memory map)

---

## 13. Error States

Every tool must handle:
- Wrong file type uploaded → inline error: "Please upload a [format] file"
- File too large → inline error: "File exceeds [X] MB limit"
- Conversion failed → error banner with "Try again" button
- Network error → "Connection error — please check your internet and try again"
- CloudConvert quota exceeded → "Service busy — please try again in a few minutes"

---

## 14. Mobile Responsiveness

- Navbar: collapse to hamburger at `md` breakpoint
- Tool grid: single column on mobile
- Sidebar ads: `hidden md:flex` — do not show on mobile
- DropZone: full width on mobile, min-height 200px
- Before/after image preview: stack vertically on mobile
- File list: full width cards on mobile

---

## 15. FAQ Content (per tool — minimum 3 items each)

### compress-image
1. Q: Does compressing an image reduce quality? A: Our tool uses smart lossy compression — visible quality loss is minimal and usually undetectable to the human eye.
2. Q: What formats are supported? A: JPG, PNG, WebP, GIF, and BMP.
3. Q: Are my images uploaded to a server? A: No — compression runs entirely in your browser. Your files never leave your device.
4. Q: What is the maximum file size? A: Up to 20 MB per image.

### merge-pdf
1. Q: How many PDFs can I merge at once? A: Up to 20 PDF files per merge.
2. Q: Will the PDF quality be reduced after merging? A: No — pages are copied at full quality, no re-rendering or re-compression.
3. Q: Are my files uploaded to a server? A: No — merging runs in your browser using pdf-lib. Files stay on your device.
4. Q: Can I reorder pages before merging? A: Yes — drag the files into any order before clicking Merge.

### pdf-to-word
1. Q: Is the converted Word file editable? A: Yes — the output is a fully editable .docx file.
2. Q: How accurate is the PDF to Word conversion? A: Accuracy depends on the PDF. Text-based PDFs convert with near-perfect accuracy. Scanned PDFs require OCR.
3. Q: Is my PDF secure? A: Files are encrypted in transit and permanently deleted from our servers after 24 hours.
4. Q: What is the file size limit? A: Up to 50 MB per PDF.

*(Add similar 3–4 FAQ items for every other tool)*

---

## 16. Launch Checklist

- [ ] All 17 tool pages built and working
- [ ] All tools tested on Chrome, Firefox, Safari, mobile
- [ ] Lighthouse score ≥ 90 on homepage and 3 tool pages
- [ ] `sitemap.xml` accessible at `/sitemap.xml`
- [ ] Google Search Console verified, sitemap submitted
- [ ] GA4 tracking confirmed in Realtime view
- [ ] AdSense account approved, ad units placed
- [ ] Custom domain connected and SSL active on Vercel
- [ ] 404 page implemented (`app/not-found.tsx`)
- [ ] Privacy Policy page at `/privacy`
- [ ] Terms of Service page at `/terms`
- [ ] `.env.local` never committed (in `.gitignore`)
- [ ] CloudConvert API key tested — 10 free conversions/day confirmed

---

## 17. Coding Conventions

- TypeScript throughout — no `any` types
- All components in `components/` are named exports
- All pages in `app/` are default exports
- Use `'use client'` only where interactivity requires it — keep as much as possible as Server Components
- Tool UI components (DropZone, progress, download) must be `'use client'`
- `lib/tools.ts` and `lib/cloudconvert.ts` are server-safe (no browser APIs)
- Tailwind only — no inline styles except where Tailwind cannot express the value
- No `console.log` in production code
- All async functions wrapped in try/catch with user-facing error messages
