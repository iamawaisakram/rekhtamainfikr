"use client";

import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote";
import { useMemo, useRef } from "react";

import { ParagraphWithAudio } from "@/components/ParagraphWithAudio";

type ArticleMdxBodyProps = Readonly<{
  source: MDXRemoteSerializeResult;
}>;

export function ArticleMdxBody({ source }: ArticleMdxBodyProps) {
  const paragraphIndexRef = useRef(0);
  paragraphIndexRef.current = 0;

  const components = useMemo(
    () => ({
      p: (props: { children?: React.ReactNode }) => {
        const index = paragraphIndexRef.current++;
        return <ParagraphWithAudio index={index} {...props} />;
      },
    }),
    []
  );

  return <MDXRemote {...source} components={components} />;
}
