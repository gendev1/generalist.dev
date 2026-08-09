import { cn } from "@/lib/utils";

export function FileCard({
  header,
  headerRight,
  children,
  className,
}: {
  header: React.ReactNode;
  headerRight?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("overflow-hidden rounded-md border bg-card", className)}>
      <div className="flex flex-wrap items-center justify-between gap-2 border-b bg-secondary px-4 py-2 font-mono text-xs text-muted-foreground">
        <span>{header}</span>
        {headerRight && <span>{headerRight}</span>}
      </div>
      {children}
    </div>
  );
}
