"use client";

import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote";

type MdxContentProps = Readonly<{
  source: MDXRemoteSerializeResult;
}>;

export function MdxContent({ source }: MdxContentProps) {
  return <MDXRemote {...source} />;
}
