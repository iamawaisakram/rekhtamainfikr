'use client';

import { useState } from 'react';

import { useArticleAudio } from '@/context/ArticleAudioContext';

type ParagraphWithAudioProps = Readonly<{
  index: number;
  children?: React.ReactNode;
}>;

function PlayIcon({ className }: Readonly<{ className?: string }>) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

export function ParagraphWithAudio({
  index,
  children,
}: ParagraphWithAudioProps) {
  const [hovered, setHovered] = useState(false);
  const ctx = useArticleAudio();
  const startTime = ctx?.timestamps[index];
  const hasTimestamp = typeof startTime === 'number';

  const handlePlay = () => {
    if (hasTimestamp && ctx) ctx.playFromTimestamp(startTime);
  };

  const showButton = hasTimestamp && (hovered || false);

  return (
    <div
      className="flex items-start gap-3 py-1"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hasTimestamp ? (
        <button
          type="button"
          onClick={handlePlay}
          className={`mt-1.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700 transition-opacity duration-150 hover:bg-amber-200 hover:text-amber-800 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 ${
            showButton ? 'opacity-100' : 'opacity-0'
          }`}
          aria-label={`پیرا سنیں، ${Math.floor(startTime / 60)}:${String(startTime % 60).padStart(2, '0')}`}
        >
          <PlayIcon className="h-4 w-4 rtl:scale-x-[-1]" />
        </button>
      ) : (
        <span className="mt-1.5 h-8 w-8 shrink-0" aria-hidden />
      )}
      <p className="min-w-0 flex-1">{children}</p>
    </div>
  );
}
