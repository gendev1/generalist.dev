"use client";

import Link from "next/link";
import { useState } from "react";
import { CommitHash } from "@/components/commit-hash";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemHeader,
  ItemTitle,
} from "@/components/ui/item";
import type { Post } from "@/lib/posts";
import { cn } from "@/lib/utils";

export type CommitMeta = Pick<
  Post,
  "slug" | "title" | "summary" | "hash" | "tag" | "tagType"
> & { dateFormatted: string };

const PAGE_SIZE = 5;

const dotColor: Record<Post["tagType"], string> = {
  feat: "bg-primary",
  rant: "bg-destructive",
  perf: "bg-tag-perf",
  chore: "bg-muted-foreground",
};

const tagColor: Record<Post["tagType"], string> = {
  feat: "text-muted-foreground",
  rant: "text-destructive",
  perf: "text-tag-perf",
  chore: "text-muted-foreground",
};

export function CommitList({ posts }: { posts: CommitMeta[] }) {
  const [visible, setVisible] = useState(PAGE_SIZE);
  const remaining = posts.length - visible;

  if (posts.length === 0) {
    return (
      <div className="border-l-2 border-border pl-[22px]">
        <div className="rounded-md border border-dashed px-4 py-6 font-mono text-[13px] text-muted-foreground">
          0 commits. The first one is being typed.
        </div>
      </div>
    );
  }

  return (
    <>
      <ul className="m-0 flex list-none flex-col gap-1 border-l-2 border-border p-0 pl-[22px]">
        {posts.slice(0, visible).map((post) => (
          <li key={post.slug} className="relative">
            <span
              aria-hidden
              className={cn(
                "absolute top-[22px] -left-[29px] size-[11px] rounded-full border-2 border-background",
                dotColor[post.tagType],
              )}
            />
            <Item
              variant="outline"
              className="relative items-start gap-1 bg-card px-4 py-3.5 transition-colors hover:bg-muted/50"
            >
              <ItemHeader className="flex-wrap justify-start gap-x-3.5 gap-y-0 font-mono text-xs text-muted-foreground">
                <CommitHash hash={post.hash} className="relative z-10" />
                <span>{post.dateFormatted}</span>
                <span className={tagColor[post.tagType]}>{post.tag}</span>
              </ItemHeader>
              <ItemContent className="gap-0">
                <ItemTitle className="text-[19px] font-semibold leading-snug">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-foreground no-underline after:absolute after:inset-0"
                  >
                    {post.title}
                  </Link>
                </ItemTitle>
                <ItemDescription className="text-[13.5px]">
                  {post.summary}
                </ItemDescription>
              </ItemContent>
            </Item>
          </li>
        ))}
      </ul>
      {remaining > 0 && (
        <div className="mt-3 flex justify-center">
          <Button
            variant="outline"
            className="font-mono text-[13px] text-muted-foreground"
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
          >
            load older commits ({remaining} more)
          </Button>
        </div>
      )}
    </>
  );
}
