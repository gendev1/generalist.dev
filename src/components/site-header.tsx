"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

function navClass(active: boolean) {
  return cn(
    "no-underline",
    active ? "text-primary" : "text-muted-foreground hover:text-primary",
  );
}

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-20 border-b bg-background">
      <div className="mx-auto flex w-full max-w-[960px] flex-wrap items-baseline gap-x-4 gap-y-1.5 px-6 py-3 font-mono text-[13px] max-sm:px-4 max-sm:text-xs">
        <Link
          href="/"
          className="text-[15px] font-semibold text-foreground no-underline"
        >
          <span className="max-sm:hidden">gendev1 / </span>generalist
          <span className="text-primary">.dev</span>
        </Link>
        <span className="text-xs text-muted-foreground max-sm:hidden">
          branch: main
        </span>
        <span className="ml-auto flex gap-4 max-sm:gap-2.5">
          <Link
            href="/"
            className={navClass(
              pathname === "/" || pathname.startsWith("/blog"),
            )}
          >
            blog
          </Link>
          <Link href="/about" className={navClass(pathname === "/about")}>
            about
          </Link>
          <Link href="/resume" className={navClass(pathname === "/resume")}>
            resume
          </Link>
          <a
            href="https://github.com/gendev1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground no-underline hover:text-primary"
          >
            github ↗
          </a>
        </span>
      </div>
    </nav>
  );
}
