import "./global.css";
import "./globals.css";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Navbar } from "./components/nav";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SandpackCSS } from "./blog/[slug]/sandpack";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "./lib/utils";

export const metadata: Metadata = {
  metadataBase: new URL("https://generalist.dev"),
  title: {
    default: "Generalist Dev",
    template: "%s | Generalist Dev",
  },
  description: "Developer, writer, and creator.",
  openGraph: {
    title: "Generalist Dev",
    description: "Developer, writer, and creator.",
    url: "https://generalist.dev",
    siteName: "Generalist Dev",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "Generalist Dev",
    card: "summary_large_image",
  },
  verification: {
    google: "eZSdmzAXlLkKhNJzfgwDqWORghxnJ8qR9_CHdAh5-xw",
    yandex: "14d2e73487fa6c71",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn("text-black bg-white dark:text-white dark:bg-[#111010]", GeistSans.variable, GeistMono.variable)}>
      <head>
        <SandpackCSS />
      </head>
      <body className="antialiased max-w-2xl mb-40 flex flex-col md:flex-row mx-4 mt-8 lg:mx-auto">
        <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
          <Navbar />
          {children}
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  );
}
