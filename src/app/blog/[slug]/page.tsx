import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HighlightedCode } from "@/components/code-block";
import { CommitHash } from "@/components/commit-hash";
import { Markdown } from "@/components/markdown";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatDate, getAllPosts, getPost } from "@/lib/posts";
import { cn } from "@/lib/utils";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(
  props: PageProps<"/blog/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getPost(slug);
  return post ? { title: post.title, description: post.summary } : {};
}

const tagVariant = {
  feat: "secondary",
  rant: "destructive",
  perf: "secondary",
  chore: "outline",
} as const;

export default async function PostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) notFound();

  const lines = post.raw.split("\n").length;
  const kb = (Buffer.byteLength(post.raw, "utf8") / 1024).toFixed(1);

  return (
    <article className="mt-10">
      <Link
        href="/"
        className="font-mono text-xs text-muted-foreground no-underline hover:text-primary"
      >
        ← commits
      </Link>

      <div className="mt-6 flex flex-wrap items-center gap-3.5 font-mono text-xs text-muted-foreground">
        <CommitHash hash={post.hash} />
        <span>{formatDate(post.date)}</span>
        <Badge
          variant={tagVariant[post.tagType]}
          className={cn(
            "font-mono",
            post.tagType === "perf" && "bg-tag-perf/10 text-tag-perf",
          )}
        >
          {post.tag}
        </Badge>
      </div>

      <h1 className="mt-2 text-[clamp(28px,4vw,40px)] font-bold leading-[1.1] tracking-[-0.02em]">
        {post.title}
      </h1>
      <p className="mt-2 mb-8 text-[15px] text-muted-foreground">
        {post.summary}
      </p>

      <Tabs defaultValue="preview" className="gap-0">
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-t-md border border-b-0 bg-secondary py-1.5 pr-1.5 pl-3.5">
          <span className="font-mono text-xs text-muted-foreground">
            {post.slug}.md · {lines} lines · {kb} KB
          </span>
          <TabsList className="h-7 rounded-md">
            <TabsTrigger value="preview" className="px-2.5 text-xs">
              Preview
            </TabsTrigger>
            <TabsTrigger value="code" className="px-2.5 text-xs">
              Code
            </TabsTrigger>
          </TabsList>
        </div>
        <div className="overflow-hidden rounded-b-md border bg-card">
          <TabsContent value="preview" className="px-5 py-6 sm:px-8">
            <Markdown>{post.content}</Markdown>
          </TabsContent>
          <TabsContent value="code">
            <HighlightedCode
              code={post.raw}
              lang="markdown"
              className="py-2.5"
            />
          </TabsContent>
        </div>
      </Tabs>
    </article>
  );
}
