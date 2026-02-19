"use client";

import { useRef } from "react";

type ArticleLayoutProps = Readonly<{
  title: string;
  surahName?: string;
  ayat?: number;
  videoUrl?: string;
  audioUrl?: string;
  imageUrl?: string;
  children: React.ReactNode;
}>;

export function ArticleLayout({
  title,
  surahName,
  ayat,
  videoUrl,
  audioUrl,
  imageUrl,
  children,
}: ArticleLayoutProps) {
  const audioRef = useRef<HTMLAudioElement>(null);

  return (
    <article className="mx-auto max-w-3xl px-4 py-6" dir="rtl">
      <header className="mb-8">
        <h1 className="font-urdu text-3xl font-semibold text-stone-800">
          {title}
        </h1>
        {(surahName || ayat != null) && (
          <p className="mt-2 text-stone-500">
            {surahName}
            {ayat != null && ` — آیت ${ayat}`}
          </p>
        )}
      </header>

      <div className="space-y-8">
        {videoUrl && (
          <section className="overflow-hidden rounded-xl border border-stone-200 bg-stone-100">
            <div className="aspect-video w-full">
              <iframe
                src={videoUrl}
                title="Video"
                allow="autoplay"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          </section>
        )}

        {audioUrl && (
          <section className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
            <p className="mb-2 text-sm font-medium text-stone-600">
              پورا مضمون سنیں
            </p>
            <audio
              ref={audioRef}
              src={audioUrl}
              controls
              className="h-10 w-full"
              preload="metadata"
              aria-label="پورا مضمون سنیں"
            >
              آپ کا براؤزر آڈیو سپورٹ نہیں کرتا۔
            </audio>
          </section>
        )}

        {imageUrl && (
          <section className="overflow-hidden rounded-xl border border-stone-200">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageUrl}
              alt=""
              className="w-full object-cover"
            />
          </section>
        )}

        <section className="font-urdu text-lg leading-relaxed text-stone-800 prose prose-stone max-w-none prose-p:mb-4 rtl:prose-headings:text-right">
          {children}
        </section>
      </div>
    </article>
  );
}
