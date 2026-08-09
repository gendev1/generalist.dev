import type { Metadata } from "next";
import Image from "next/image";
import { FileCard } from "@/components/file-card";

export const metadata: Metadata = {
  title: "about",
  description: "Backend engineer @ Fidelity. Golang, TypeScript, Kafka.",
};

const stats = [
  { value: "480M+", label: "kafka msgs searchable", accent: false },
  { value: "150×", label: "query latency cut", accent: true },
  { value: "$100K/yr", label: "infra deleted", accent: false },
];

export default function AboutPage() {
  return (
    <div className="mt-10 grid items-start gap-8 md:grid-cols-[220px_1fr]">
      <div>
        <Image
          src="/avatar.png"
          alt="Illustrated portrait of Eswar surrounded by backend doodles"
          width={1254}
          height={1254}
          className="w-full max-w-[220px] rounded-md border"
          priority
        />
        <div className="mt-3.5 flex flex-col gap-1.5 font-mono text-[13px]">
          <span className="text-[15px] font-semibold">Eswar Saladi</span>
          <span className="text-muted-foreground">gendev1 · Keller, TX</span>
          <a
            href="mailto:hello@generalist.dev"
            className="text-primary no-underline hover:text-accent-foreground"
          >
            hello@generalist.dev
          </a>
          <a
            href="https://github.com/gendev1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary no-underline hover:text-accent-foreground"
          >
            github.com/gendev1
          </a>
          <a
            href="https://linkedin.com/in/eswarsaladi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary no-underline hover:text-accent-foreground"
          >
            linkedin/eswarsaladi
          </a>
        </div>
      </div>

      <FileCard header="README.md">
        <div className="max-w-[66ch] px-6 py-5 text-[15.5px] leading-[1.75]">
          <h1 className="mb-1 border-b border-secondary pb-2.5 text-[28px] font-bold tracking-[-0.02em]">
            Hey, I&apos;m Eswar.
          </h1>
          <p className="mt-3">
            Backend engineer at Fidelity in Westlake, TX. I ship production
            fintech in Golang and TypeScript, and I do it AI-natively — coding
            agents, a custom skill library, spec-driven development. Design,
            review, and correctness stay mine; the typing mostly doesn&apos;t.
          </p>
          <p className="mt-3">
            Nights and weekends: <strong>Score</strong>, a lights-off software
            factory that drives coding agents through plan/implement/verify
            loops unattended; <strong>Mercury</strong>, an MCP server + Figma
            extension so agents can read and write designs; and{" "}
            <strong>Limen</strong>, a Reg-T margin SDK in Go.
          </p>
          <p className="mt-3">
            Before this: MS in Computer Software Engineering at Northeastern, a
            founder stint building Lightning Network wallets in Flutter, and a
            co-op at Fidelity where I built a Bitcoin Lightning wallet PoC in
            Swift.
          </p>
          <p className="mt-3">
            The name? I keep ending up in different stacks — Go, TypeScript,
            Swift, Flutter, infra, agents. Generalist felt honest.
          </p>
          <div className="mt-4.5 flex flex-wrap gap-2.5 font-mono text-xs">
            {stats.map((stat) => (
              <span
                key={stat.value}
                className="rounded-md border bg-background px-3 py-1.5"
              >
                <strong
                  className={
                    stat.accent ? "text-[15px] text-primary" : "text-[15px]"
                  }
                >
                  {stat.value}
                </strong>{" "}
                {stat.label}
              </span>
            ))}
          </div>
        </div>
      </FileCard>
    </div>
  );
}
