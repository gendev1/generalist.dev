import { bundledLanguages, codeToHtml, type ShikiTransformer } from "shiki";
import { CopyButton } from "@/components/copy-button";
import { cn } from "@/lib/utils";

// Drop the "\n" text nodes between line spans so `code { display: grid }`
// renders one row per line (full-width diff backgrounds, no phantom rows).
const gridLines: ShikiTransformer = {
  name: "grid-lines",
  pre(node) {
    // the frame supplies the background; inline style would fight the theme
    node.properties.style = undefined;
  },
  code(node) {
    node.children = node.children.filter(
      (child) => !(child.type === "text" && child.value.trim() === ""),
    );
  },
};

const diffLines: ShikiTransformer = {
  name: "diff-lines",
  line(node) {
    const text = node.children
      .map((child) =>
        child.type === "element"
          ? child.children
              .map((t) => (t.type === "text" ? t.value : ""))
              .join("")
          : "",
      )
      .join("");
    if (text.startsWith("+")) this.addClassToHast(node, "diff-add");
    else if (text.startsWith("-")) this.addClassToHast(node, "diff-del");
  },
};

export async function HighlightedCode({
  code,
  lang,
  className,
}: {
  code: string;
  lang: string;
  className?: string;
}) {
  const language = lang in bundledLanguages ? lang : "text";
  const html = await codeToHtml(code.replace(/\n$/, ""), {
    lang: language,
    theme: "github-light",
    transformers: language === "diff" ? [gridLines, diffLines] : [gridLines],
  });
  return (
    <div
      className={cn("code-view overflow-x-auto text-[13px]", className)}
      // biome-ignore lint/security/noDangerouslySetInnerHtml: shiki output from local markdown
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export function CodeFrame({
  title,
  actions,
  children,
  className,
}: {
  title: React.ReactNode;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <figure
      className={cn(
        "not-prose my-5 overflow-hidden rounded-md border bg-card",
        className,
      )}
    >
      <figcaption className="flex min-h-8 items-center justify-between gap-2 border-b bg-secondary py-0.5 pr-1.5 pl-3.5 font-mono text-xs text-muted-foreground">
        {title}
        {actions}
      </figcaption>
      {children}
    </figure>
  );
}

export function CodeBlock({ code, lang }: { code: string; lang: string }) {
  return (
    <CodeFrame title={<span>{lang}</span>} actions={<CopyButton text={code} />}>
      <HighlightedCode code={code} lang={lang} className="py-2.5" />
    </CodeFrame>
  );
}
