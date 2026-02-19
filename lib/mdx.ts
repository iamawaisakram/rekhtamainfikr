import { serialize } from "next-mdx-remote/serialize";

export async function serializeMdx(content: string) {
  return serialize(content, {
    parseFrontmatter: false, // we already parse with gray-matter
  });
}
