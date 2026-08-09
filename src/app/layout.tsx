import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { cn } from "@/lib/utils";

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-plex-sans",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-plex-mono",
});

export const metadata: Metadata = {
  title: {
    default: "generalist.dev",
    template: "%s · generalist.dev",
  },
  description:
    "Writing on AI-native dev, Golang & fintech. Reviewed by me. Typed by agents.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full antialiased font-sans",
        plexSans.variable,
        plexMono.variable,
      )}
    >
      <body className="min-h-full flex flex-col">
        <SiteHeader />
        <main className="mx-auto w-full max-w-[960px] flex-1 px-6 pb-16">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
