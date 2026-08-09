import type { ElementContent } from "hast";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CodeBlock } from "@/components/code-block";
import { cn } from "@/lib/utils";

const isImage = (c: ElementContent): boolean =>
  c.type === "element" &&
  (c.tagName === "img" || (c.tagName === "a" && c.children.some(isImage)));

export function Markdown({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "prose prose-neutral max-w-none",
        "prose-headings:font-semibold prose-headings:tracking-tight",
        "prose-a:text-primary hover:prose-a:text-accent-foreground",
        "prose-code:rounded prose-code:bg-secondary prose-code:px-1.5 prose-code:py-0.5 prose-code:font-mono prose-code:text-[0.85em] prose-code:font-normal prose-code:before:content-none prose-code:after:content-none",
        "prose-blockquote:border-l-primary prose-blockquote:font-normal prose-blockquote:not-italic",
        "prose-th:font-mono prose-th:text-xs prose-th:uppercase prose-th:tracking-wider",
        className,
      )}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          pre: ({ children }) => <>{children}</>,
          // image-only paragraphs become framed figures; several images in a
          // row (no blank line between) become a 2/3-column gallery
          p: ({ node, children }) => {
            const kids = (node?.children ?? []).filter(
              (c) => !(c.type === "text" && c.value.trim() === ""),
            );
            if (kids.length > 0 && kids.every(isImage)) {
              return (
                <div
                  className={cn(
                    "md-gallery my-6 grid gap-3",
                    kids.length > 1 && "sm:grid-cols-2",
                    kids.length === 3 && "lg:grid-cols-3",
                  )}
                >
                  {children}
                </div>
              );
            }
            return <p>{children}</p>;
          },
          img: ({ src, alt, title }) => (
            // inside a gallery the card stretches to the row height and the
            // image letterboxes (object-contain) so cards stay uniform
            <span className="not-prose block overflow-hidden rounded-md border bg-card [.md-gallery_&]:flex [.md-gallery_&]:h-full [.md-gallery_&]:flex-col">
              {/* biome-ignore lint/performance/noImgElement: markdown images have no known dimensions for next/image */}
              <img
                src={src}
                alt={alt ?? ""}
                className="block w-full [.md-gallery_&]:min-h-0 [.md-gallery_&]:flex-1 [.md-gallery_&]:object-contain"
              />
              {title ? (
                <span className="block border-t bg-secondary px-3 py-1.5 font-mono text-xs text-muted-foreground">
                  {title}
                </span>
              ) : null}
            </span>
          ),
          code: ({ className: codeClassName, children, ...props }) => {
            const match = /language-([\w-]+)/.exec(codeClassName ?? "");
            if (match) {
              return (
                <CodeBlock
                  code={String(children).replace(/\n$/, "")}
                  lang={match[1]}
                />
              );
            }
            return (
              <code className={codeClassName} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
