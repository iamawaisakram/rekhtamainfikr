import fs from 'node:fs';
import path from 'node:path';

import matter from 'gray-matter';

import quranStructure from '@/data/quran-structure.json';

const CONTENT_DIR = path.join(process.cwd(), 'content', 'articles');

export type ArticleMeta = {
  title: string;
  surah?: number;
  surahName?: string;
  ayat?: number;
  videoUrl?: string;
  audioUrl?: string;
  imageUrl?: string;
  paragraphTimestamps?: number[];
};

export type Article = {
  slug: string;
  meta: ArticleMeta;
  content: string;
};

export function getArticleSlugs(): { slug: string; meta: ArticleMeta }[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.mdx'));
  return files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, '');
    const fullPath = path.join(CONTENT_DIR, filename);
    const raw = fs.readFileSync(fullPath, 'utf-8');
    const { data } = matter(raw);
    return { slug, meta: data as ArticleMeta };
  });
}

export function getArticleBySlug(slug: string): Article | null {
  const fullPath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) return null;
  const raw = fs.readFileSync(fullPath, 'utf-8');
  const { data, content } = matter(raw);
  return { slug, meta: data as ArticleMeta, content };
}

export function getSurahs(): {
  number: number;
  nameUrdu: string;
  nameArabic: string;
  ayas: number;
}[] {
  return (
    quranStructure as {
      surahs: {
        number: number;
        nameUrdu: string;
        nameArabic: string;
        ayas: number;
      }[];
    }
  ).surahs;
}

export function getArticlesBySurah(surahNumber: number): { slug: string; meta: ArticleMeta }[] {
  return getArticleSlugs().filter((a) => a.meta.surah === surahNumber);
}
