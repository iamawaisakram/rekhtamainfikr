# Rekhta Main Fikr — Project Plan

## Vision
A mobile-responsive (and PWA) website for your Urdu thoughts on Quranic Ayaat. Content is organized by Quran structure (Surah → optional Ayat). Each article has a fixed layout: video → full audio → image → Urdu text, with per-paragraph audio from timestamps, RTL reading, and download options (video, audio, PDF).

---

## Tech Stack Recommendation

| Layer | Choice | Why |
|-------|--------|-----|
| **Framework** | **Next.js (React)** | SEO (SSG), easy RTL, API routes if needed, great PWA & deploy (Vercel). |
| **Styling** | **Tailwind CSS** | RTL utilities (`dir="rtl"`, `rtl:`), responsive, fast. |
| **Content** | **MDX + JSON** | Articles as MDX (Urdu + embedded media); Quran structure (Surahs/Ayaat) in JSON. No backend, full control. |
| **PWA** | **next-pwa** or **@ducanh2912/next-pwa** | Manifest + service worker for install & offline. |
| **PDF** | **Print CSS + Save as PDF** or **react-to-print** | Simplest: user clicks “Download PDF” → print dialog → “Save as PDF”. Optional later: server-side PDF (e.g. Puppeteer). |

---

## Google Drive for Media

- **Videos:** Yes. Use Drive’s embed URL:  
  `https://drive.google.com/file/d/<FILE_ID>/preview`  
  Put in an `<iframe>`. Sharing must be “Anyone with the link.”
- **Audio:** Yes for *playback*. Use direct link for the `<audio>` element:  
  `https://drive.google.com/uc?export=download&id=<FILE_ID>`  
  Or use “Share” → “Get link” and ensure the file is playable in browser. Hotlinking can be flaky; if so, consider uploading the same file to your host or a CDN.
- **Images:** Yes. Use “Get link” (anyone with link) and use that URL in `<img src="...">`.

Recommendation: Use Drive for now; if you hit limits (e.g. audio not playing reliably), we can add a fallback (e.g. store audio on Vercel blob or same host).

---

## Content Structure (Quran-like, not a full Quran app)

- **Data:** One JSON file (e.g. `data/quran-structure.json`) listing Surahs and Ayaat (names/numbers). No full Quran text needed.
- **Articles:** One MDX file per thought. Frontmatter ties it to structure and media, e.g.:

```yaml
surah: 2
surahName: "البقرۃ"
ayat: 255  # optional
title: "آیت الکرسی پر ایک فکر"
videoUrl: "https://drive.google.com/..."
audioUrl: "https://drive.google.com/..."
imageUrl: "https://drive.google.com/..."
paragraphTimestamps: [0, 45, 120, 200]  # seconds for each paragraph
```

- **Linking to Ayat:** Each article can link to “Surah X, Ayat Y” (e.g. a badge or link that shows the reference; no need to show full Quran text).

---

## Article Layout (Top → Bottom)

1. **Video** — Embedded (Drive iframe or YouTube if you prefer).
2. **Full article audio** — Single `<audio>` with your recording; play/pause, optional simple waveform or time display.
3. **Image** — One image of your choice (Drive or hosted).
4. **Urdu text** — RTL, “book-like” typography. Each paragraph has a **play-from-timestamp** button on the left (in RTL, “start” side).

---

## Per-Paragraph Audio (Timestamps)

- **Idea:** One audio file for the whole article; `paragraphTimestamps` array in frontmatter (start time per paragraph).
- **Behavior:** “Play” on paragraph N → set `audio.currentTime = paragraphTimestamps[N]` and call `audio.play()`.
- **Optional:** Store `endTime` per paragraph to stop at next paragraph (clear on “play next” or when time reaches end).

No extra backend needed; all in the browser with one `<audio>` element.

---

## RTL (Read Like a Book)

- Root or article container: `dir="rtl"` and `lang="ur"`.
- Tailwind: use `rtl:` variants where needed (margins, padding, icons).
- Typography: Urdu-friendly font (e.g. Noto Nastaliq Urdu, or your choice) and comfortable line-height/letter-spacing.

---

## Download Options

| Asset | Approach |
|-------|----------|
| **Video** | Link to same Drive file (e.g. “Download video” → `videoUrl` with download flag or Drive’s download link). |
| **Audio** | Same: link to `audioUrl` with `download` attribute or Drive download link. |
| **PDF** | “Download PDF” → open print dialog (custom print CSS for article only, RTL); user chooses “Save as PDF”. Optional later: server-generated PDF. |

---

## Suggested Project Structure

```
rekhtamainfikr/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout, RTL + PWA meta
│   ├── page.tsx            # Home (list of articles by structure)
│   ├── [surah]/
│   │   └── page.tsx        # List articles for a Surah
│   └── [surah]/[slug]/
│       └── page.tsx        # Single article (video, audio, image, text + paragraph play)
├── components/
│   ├── ArticleLayout.tsx   # Video → Audio → Image → Text
│   ├── ParagraphWithAudio.tsx
│   ├── DownloadBar.tsx     # Video / Audio / PDF
│   └── ...
├── content/
│   └── articles/           # MDX files
├── data/
│   └── quran-structure.json
├── public/
│   └── manifest, icons for PWA
└── next.config.js          # PWA, MDX
```

---

## Implementation Phases

### Phase 1 — Foundation
- Next.js + Tailwind + RTL + Urdu font.
- Quran structure JSON + one sample article (MDX) with frontmatter.
- Single-article page: video (Drive embed), one audio, one image, Urdu text (no paragraph play yet).

### Phase 2 — Article experience
- Per-paragraph play buttons + timestamp playback.
- Download links for video and audio (Drive).
- “Download PDF” via print dialog + print-only CSS.

### Phase 3 — Structure & discovery
- Home: list by Surah (and optional Ayat).
- Navigation: Surah → list of thoughts → article.
- Optional: Ayat-level links/badges on articles.

### Phase 4 — PWA & polish
- PWA (manifest, service worker, install prompt).
- Mobile responsiveness pass and performance (images, lazy load).

---

## Next Step

When you’re ready, we can start with **Phase 1**: scaffold Next.js, Tailwind, one article page with Drive video/audio/image and Urdu text in RTL, and the data structure above. If you want any change to the stack (e.g. different framework or CMS), say so and we’ll adjust the plan.
