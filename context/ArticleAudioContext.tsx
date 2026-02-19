"use client";

import {
  createContext,
  type ReactNode,
  type RefObject,
  useCallback,
  useContext,
  useRef,
} from "react";

type ArticleAudioContextValue = {
  audioRef: RefObject<HTMLAudioElement | null>;
  timestamps: number[];
  playFromTimestamp: (seconds: number) => void;
};

const ArticleAudioContext = createContext<ArticleAudioContextValue | null>(null);

export function useArticleAudio() {
  const ctx = useContext(ArticleAudioContext);
  return ctx;
}

type ArticleAudioProviderProps = Readonly<{
  audioRef: RefObject<HTMLAudioElement | null>;
  timestamps: number[];
  children: ReactNode;
}>;

export function ArticleAudioProvider({
  audioRef,
  timestamps,
  children,
}: ArticleAudioProviderProps) {
  const playFromTimestamp = useCallback(
    (seconds: number) => {
      const el = audioRef?.current;
      if (!el) return;
      el.currentTime = seconds;
      el.play().catch(() => {});
    },
    [audioRef]
  );

  const value = useRef<ArticleAudioContextValue>({
    audioRef,
    timestamps,
    playFromTimestamp,
  }).current;
  value.audioRef = audioRef;
  value.timestamps = timestamps;
  value.playFromTimestamp = playFromTimestamp;

  return (
    <ArticleAudioContext.Provider value={value}>
      {children}
    </ArticleAudioContext.Provider>
  );
}
