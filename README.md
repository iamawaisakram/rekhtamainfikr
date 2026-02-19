# Rekhta Main Fikr

قرآن کی آیات پر اردو میں خیالات — mobile-responsive site with RTL, video, audio, and article layout.

## Phase 1 (current)

- Next.js 15 + Tailwind + TypeScript
- RTL layout and Noto Nastaliq Urdu font
- Quran structure in `data/quran-structure.json`
- Articles as MDX in `content/articles/*.mdx`
- Single-article page: video (Drive embed) → full audio → image → Urdu text

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Click the sample article.

## Adding an article

1. Create `content/articles/your-slug.mdx`.
2. Add frontmatter (see `content/articles/ayat-ul-kursi-fikr.mdx`):
   - `title`, `surah`, `surahName`, optional `ayat`
   - `videoUrl`: Google Drive embed URL — `https://drive.google.com/file/d/<FILE_ID>/preview`
   - `audioUrl`: `https://drive.google.com/uc?export=download&id=<FILE_ID>`
   - `imageUrl`: any image URL (Drive or other)
   - `paragraphTimestamps`: optional array of start times in seconds (for Phase 2)
3. Write body in Urdu (Markdown/MDX).

## Roadmap

- **Phase 2:** Per-paragraph play from timestamp, download video/audio/PDF
- **Phase 3:** Browse by Surah, Ayat links
- **Phase 4:** PWA, offline

See [PLAN.md](./PLAN.md) for full plan.
