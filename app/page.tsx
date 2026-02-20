import Link from 'next/link';

import { getArticleSlugs, getSurahs } from '@/lib/articles';

export default function HomePage() {
  const surahs = getSurahs();
  const slugs = getArticleSlugs();

  return (
    <div className="mx-auto max-w-2xl px-4 py-8" dir="rtl">
      <header className="mb-10 text-center">
        <h1 className="font-urdu text-3xl font-semibold text-stone-800">
          ریختہ میں فکر
        </h1>
        <p className="mt-2 text-stone-600">قرآن کی آیات پر اردو میں خیالات</p>
      </header>

      <nav className="space-y-4">
        <h2 className="font-urdu text-xl text-stone-700">مضامین</h2>
        {slugs.length > 0 ? (
          <ul className="space-y-2">
            {slugs.map(({ slug, meta }) => (
              <li key={slug}>
                <Link
                  href={`/article/${slug}`}
                  className="block rounded-lg border border-stone-200 bg-white px-4 py-3 font-urdu text-stone-800 transition hover:border-amber-200 hover:bg-amber-50/50"
                >
                  {meta.title}
                  {meta.surahName && (
                    <span className="mr-2 text-sm text-stone-500">
                      — {meta.surahName}
                      {meta.ayat == null ? '' : `، آیت ${meta.ayat}`}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-stone-500">ابھی کوئی مضمون نہیں۔</p>
        )}
      </nav>

      {surahs.length > 0 && (
        <section className="mt-12">
          <h2 className="font-urdu text-xl text-stone-700">سورتیں</h2>
          <ul className="mt-2 flex flex-wrap gap-2">
            {surahs.map((s) => (
              <li key={s.number}>
                <Link
                  href={`/surah/${s.number}`}
                  className="rounded-md bg-stone-100 px-3 py-1.5 text-sm text-stone-700 hover:bg-stone-200"
                >
                  {s.nameUrdu} ({s.number})
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
