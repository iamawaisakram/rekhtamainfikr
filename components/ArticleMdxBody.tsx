'use client';

import { MDXRemote, type MDXRemoteSerializeResult } from 'next-mdx-remote';
import { createContext, useCallback, useContext, useRef } from 'react';

import { ParagraphWithAudio } from '@/components/ParagraphWithAudio';

const ParagraphIndexContext = createContext<() => number>(() => 0);

function ArticleParagraph(props: Readonly<{ children?: React.ReactNode }>) {
  const getNextIndex = useContext(ParagraphIndexContext);
  const index = getNextIndex();
  return <ParagraphWithAudio index={index} {...props} />;
}

function ArabicParagraph(props: Readonly<{ children?: React.ReactNode }>) {
  const getNextIndex = useContext(ParagraphIndexContext);
  const index = getNextIndex();
  return (
    <ParagraphWithAudio index={index} {...props}>
      <span className="font-arabic" dir="rtl">
        {props.children}
      </span>
    </ParagraphWithAudio>
  );
}

const MDX_COMPONENTS = {
  p: ArticleParagraph,
  Arabic: ArabicParagraph,
};

type ArticleMdxBodyProps = Readonly<{
  source: MDXRemoteSerializeResult;
}>;

export function ArticleMdxBody({ source }: ArticleMdxBodyProps) {
  const paragraphIndexRef = useRef(0);
  paragraphIndexRef.current = 0;

  const getNextIndex = useCallback(() => {
    const index = paragraphIndexRef.current;
    paragraphIndexRef.current += 1;
    return index;
  }, []);

  return (
    <ParagraphIndexContext.Provider value={getNextIndex}>
      <MDXRemote {...source} components={MDX_COMPONENTS} />
    </ParagraphIndexContext.Provider>
  );
}
