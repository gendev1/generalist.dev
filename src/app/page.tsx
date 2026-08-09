import { BioDiff } from "@/components/bio-diff";
import { CommitList, type CommitMeta } from "@/components/commit-list";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatDate, getAllPosts } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts();
  const metas: CommitMeta[] = posts.map(
    ({ slug, title, summary, hash, tag, tagType, date }) => ({
      slug,
      title,
      summary,
      hash,
      tag,
      tagType,
      dateFormatted: formatDate(date),
    }),
  );

  return (
    <>
      <div className="mt-10 flex flex-wrap items-center gap-2.5">
        <Badge className="h-auto rounded-full bg-primary px-3 py-1 font-mono text-xs font-semibold">
          ● Open
        </Badge>
        <span className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[13px] text-muted-foreground">
          <Avatar className="size-5">
            <AvatarImage src="/avatar.png" alt="eswar" />
            <AvatarFallback>e</AvatarFallback>
          </Avatar>
          eswar wants to merge a shit-ton of commits into{" "}
          <code className="whitespace-nowrap rounded bg-secondary px-1.5 py-px">
            your-head
          </code>
        </span>
      </div>

      <h1 className="mt-3.5 mb-6 text-[clamp(34px,5.5vw,56px)] font-bold leading-[1.05] tracking-[-0.03em]">
        Writing on AI-native dev, Golang &amp; fintech{" "}
        <span className="font-mono text-[0.6em] font-normal text-muted-foreground">
          #blog
        </span>
      </h1>

      <BioDiff />

      <div className="mt-11 flex items-baseline gap-3">
        <h2 className="font-mono text-[15px] font-semibold">
          Commits{" "}
          <span className="font-normal text-muted-foreground">
            ({posts.length})
          </span>
        </h2>
        <Separator className="flex-1 self-auto" />
      </div>

      <div className="mt-2.5">
        <CommitList posts={metas} />
      </div>
    </>
  );
}
