import { REPO_URL } from "@/lib/site";
import { cn } from "@/lib/utils";

export function CommitHash({
  hash,
  className,
}: {
  hash: string;
  className?: string;
}) {
  if (hash === "draft") {
    return (
      <span className={cn("font-semibold text-muted-foreground", className)}>
        draft
      </span>
    );
  }
  return (
    <a
      href={`${REPO_URL}/commit/${hash}`}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "font-semibold text-primary no-underline hover:underline",
        className,
      )}
    >
      {hash}
    </a>
  );
}
