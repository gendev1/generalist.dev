import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { cache } from "react";
import commits from "../../content/commits.json";

// slug → short sha, appended by the record-hashes CI job on merge to main.
const commitMap: Record<string, string> = commits;

export type Post = {
  slug: string;
  title: string;
  summary: string;
  date: string;
  hash: string;
  tag: string;
  tagType: "feat" | "rant" | "perf" | "chore";
  content: string;
  raw: string;
};

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export const getAllPosts = cache((): Post[] =>
  fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
      const { data, content } = matter(raw);
      const slug = file.replace(/\.md$/, "");
      const meta = data as Omit<Post, "slug" | "content" | "raw" | "hash"> & {
        hash?: string;
      };
      return {
        ...meta,
        slug,
        // CI-recorded hash wins; frontmatter is the pre-merge fallback
        hash: commitMap[slug] ?? meta.hash ?? "draft",
        content,
        raw,
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date)),
);

export function getPost(slug: string): Post | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}

export function formatDate(date: string): string {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}
