import Link from "next/link";
import { notFound } from "next/navigation";

import { ArticleLayout } from "@/components/ArticleLayout";
import { MdxContent } from "@/components/MdxContent";
import { getArticleBySlug, getArticleSlugs } from "@/lib/articles";
import { serializeMdx } from "@/lib/mdx";

type Props = Readonly<{ params: Promise<{ slug: string }> }>;

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const mdxSource = await serializeMdx(article.content);

  return (
    <>
      <nav className="border-b border-stone-200 bg-white px-4 py-3" dir="rtl">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/"
            className="text-stone-600 hover:text-stone-900"
          >
            ← واپس
          </Link>
        </div>
      </nav>
      <ArticleLayout
      title={article.meta.title}
      surahName={article.meta.surahName}
      ayat={article.meta.ayat}
      videoUrl={article.meta.videoUrl}
      audioUrl={article.meta.audioUrl}
      imageUrl={article.meta.imageUrl}
    >
      <MdxContent source={mdxSource} />
    </ArticleLayout>
    </>
  );
}

export function generateStaticParams() {
  return getArticleSlugs().map(({ slug }) => ({ slug }));
}
