"use client";

import { getDriveDownloadUrl, hasValidMediaUrl } from "@/lib/drive";

type DownloadBarProps = Readonly<{
  videoUrl?: string;
  audioUrl?: string;
}>;

function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function PdfIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <path d="M9 15h6" />
      <path d="M9 18h6" />
      <path d="M9 12h.01" />
    </svg>
  );
}

export function DownloadBar({ videoUrl, audioUrl }: DownloadBarProps) {
  const videoDownloadUrl = hasValidMediaUrl(videoUrl) ? getDriveDownloadUrl(videoUrl) : null;
  const audioDownloadUrl = hasValidMediaUrl(audioUrl) ? getDriveDownloadUrl(audioUrl) : null;

  const handlePrintPdf = () => {
    globalThis.print();
  };

  const linkClass =
    "inline-flex items-center gap-2 rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm font-medium text-stone-700 shadow-sm transition hover:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2";

  return (
    <div className="flex flex-wrap items-center gap-2 border-t border-stone-200 pt-4">
      <span className="me-2 text-sm text-stone-500">ڈاؤن لوڈ:</span>
      {videoDownloadUrl && (
        <a
          href={videoDownloadUrl}
          download
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          <DownloadIcon className="h-4 w-4" />
          ویڈیو
        </a>
      )}
      {audioDownloadUrl && (
        <a
          href={audioDownloadUrl}
          download
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          <DownloadIcon className="h-4 w-4" />
          آڈیو
        </a>
      )}
      <button type="button" onClick={handlePrintPdf} className={linkClass}>
        <PdfIcon className="h-4 w-4" />
        PDF
      </button>
    </div>
  );
}
