import Link from 'next/link';
import { notFound } from 'next/navigation';

import { getArticlesBySurah, getSurahs } from '@/lib/articles';

type Props = Readonly<{ params: Promise<{ number: string }> }>;

export default async function SurahPage({ params }: Props) {
  const { number: numberParam } = await params;
  const number = Number.parseInt(numberParam, 10);
  if (!Number.isInteger(number) || number < 1) notFound();

  const surahs = getSurahs();
  const surah = surahs.find((s) => s.number === number);
  if (!surah) notFound();

  const articles = getArticlesBySurah(number);

  return (
    <div className="mx-auto max-w-2xl px-4 py-8" dir="rtl">
      <nav className="mb-6">
        <Link href="/" className="text-stone-600 hover:text-stone-900">
          ← واپس
        </Link>
      </nav>
      <header className="mb-8">
        <h1 className="font-urdu text-3xl font-semibold text-stone-800">
          {surah.nameUrdu}
        </h1>
        <p className="mt-1 text-stone-500">
          سورہ {number} — {surah.nameArabic}
        </p>
      </header>
      {articles.length > 0 ? (
        <ul className="space-y-2">
          {articles.map(({ slug, meta }) => (
            <li key={slug}>
              <Link
                href={`/article/${slug}`}
                className="block rounded-lg border border-stone-200 bg-white px-4 py-3 font-urdu text-stone-800 transition hover:border-amber-200 hover:bg-amber-50/50"
              >
                {meta.title}
                {meta.ayat != null && (
                  <span className="mr-2 text-sm text-stone-500">
                    — آیت {meta.ayat}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-stone-500">اس سورہ پر ابھی کوئی مضمون نہیں۔</p>
      )}
    </div>
  );
}

export function generateStaticParams() {
  return getSurahs().map((s) => ({ number: String(s.number) }));
}
