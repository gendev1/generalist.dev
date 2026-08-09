import { Download } from "lucide-react";
import type { Metadata } from "next";
import { FileCard } from "@/components/file-card";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "resume",
  description:
    "Backend engineer at Fidelity (Golang, TypeScript) shipping production fintech AI-natively.",
};

const experience = [
  {
    dates: "Nov 2024 — now",
    title: "Software Engineer — Fidelity Investments",
    where: "Westlake, TX · Golang, TypeScript, Kafka, MongoDB",
    bullets: [
      "Led audit search migration off Elasticsearch to a purpose-built MongoDB query layer over 480M+ Kafka messages — 3.0s → 0.02s (150x), $100K/year saved.",
      "Designed the Kafka event layer for the Margin microservice; hardened Margin APIs with idempotent retries and transactional writes, closing TOCTOU races.",
      "Pitched an AI-first advisor-workflow platform PoC; in active development within two weeks. Delivered via an AI-native workflow — agents, skill library, specs.",
    ],
  },
  {
    dates: "Jul — Nov 2024",
    title: "Founder — Solvitarka",
    where: "Remote · Flutter, Breez SDK",
    bullets: [
      "Built two Flutter products solo: a Lightning Network wallet (secured a Breez partnership) and an ops dashboard for a geotechnical firm. Wound down when validation stalled.",
    ],
  },
  {
    dates: "2022 — 2024",
    title: "Developer — Northeastern Digital Scholarship Group",
    where: "Boston, MA · part-time alongside MS",
    bullets: [
      "Modernized the CERES Exhibit Toolkit — ES6 upgrade of a 7,000-line codebase, 50% fewer backend calls; rebuilt its legacy plugin as React Gutenberg blocks across 40+ sites.",
    ],
  },
  {
    dates: "Jan — Jun 2023",
    title: "Software Engineer Co-op — Fidelity Investments",
    where: "Boston, MA · Swift, Lightspark",
    bullets: [
      "Built a Swift Bitcoin Lightning wallet PoC — QR payments and social features via Lightspark.",
    ],
  },
];

const projects = [
  {
    stack: "TypeScript · Bun · MCP",
    name: "Score",
    blurb:
      'Harness-agnostic "lights-off" software factory driving coding agents through plan/implement/verify loops unattended.',
  },
  {
    stack: "TypeScript · Bun · MCP",
    name: "Mercury",
    blurb:
      "MCP server + Figma extension letting agents read and generate designs via codemod-style transforms — both directions.",
  },
  {
    stack: "Golang",
    name: "Limen",
    blurb:
      "SDK implementing Reg-T margin math — initial/maintenance requirements and buying-power calculations.",
  },
];

const skills = [
  [
    "ai / agents",
    "AI-native & spec-driven development, agent orchestration, custom skill libraries, MCP",
  ],
  ["languages", "Golang, TypeScript, JavaScript, Python, Swift, SQL"],
  ["backend", "Node.js, Kafka, REST, microservices, MongoDB, Elasticsearch"],
  [
    "cloud / devops",
    "AWS, Docker, Kubernetes, Helm, OPA, Terraform, GitHub Actions",
  ],
];

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-7 border-b border-secondary pb-2 font-mono text-sm font-semibold">
      <span className="text-muted-foreground">##</span> {children}
    </h2>
  );
}

export default function ResumePage() {
  return (
    <div className="mx-auto mt-10 max-w-[860px]">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-[clamp(28px,4vw,38px)] font-bold tracking-[-0.02em]">
          resume
          <span className="font-mono text-[0.6em] font-normal text-muted-foreground">
            .md
          </span>
        </h1>
        <Button
          nativeButton={false}
          render={
            <a href="/resume.pdf" download="eswar-saladi-resume.pdf">
              <Download data-icon="inline-start" />
              Download PDF
            </a>
          }
        />
      </div>

      <FileCard header="eswar-saladi-resume.md" headerRight="updated Aug 2026">
        <div className="px-7 py-6">
          <div className="font-mono text-[13px] text-muted-foreground">
            Eswar Saladi · Keller, TX · hello@generalist.dev · github/gendev1
          </div>
          <p className="mt-3 max-w-[68ch] text-[15px] leading-[1.7]">
            Backend engineer at Fidelity (Golang, TypeScript) shipping
            production fintech AI-natively — coding agents, custom skill
            libraries, spec-driven development — while building agentic tooling
            on the side.
          </p>

          <SectionHeading>Experience</SectionHeading>
          <div className="mt-4 grid gap-x-5 gap-y-3.5 sm:grid-cols-[130px_1fr]">
            {experience.map((job, i) => (
              <div key={job.title} className="contents">
                <div className="font-mono text-xs text-muted-foreground">
                  {job.dates}
                </div>
                <div
                  className={
                    i < experience.length - 1
                      ? "border-b border-secondary pb-3.5"
                      : undefined
                  }
                >
                  <div className="text-base font-semibold">{job.title}</div>
                  <div className="mt-0.5 mb-2 text-[13px] text-muted-foreground">
                    {job.where}
                  </div>
                  <ul className="max-w-[66ch] list-disc pl-[18px] text-sm leading-[1.7]">
                    {job.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <SectionHeading>Projects</SectionHeading>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {projects.map((project) => (
              <div
                key={project.name}
                className="rounded-md border bg-background p-3.5"
              >
                <div className="font-mono text-[11px] text-muted-foreground">
                  {project.stack}
                </div>
                <div className="my-1 text-base font-semibold">
                  {project.name}
                </div>
                <div className="text-[13px] leading-[1.6] text-muted-foreground">
                  {project.blurb}
                </div>
              </div>
            ))}
          </div>

          <SectionHeading>Skills</SectionHeading>
          <div className="mt-4 grid gap-x-5 gap-y-2 text-sm sm:grid-cols-[130px_1fr]">
            {skills.map(([label, value]) => (
              <div key={label} className="contents">
                <div className="font-mono text-xs text-muted-foreground">
                  {label}
                </div>
                <div>{value}</div>
              </div>
            ))}
          </div>

          <SectionHeading>Education &amp; awards</SectionHeading>
          <div className="mt-4 grid gap-x-5 gap-y-2 text-sm sm:grid-cols-[130px_1fr]">
            <div className="font-mono text-xs text-muted-foreground">
              2022 — 2023
            </div>
            <div>
              <strong>Northeastern University</strong> — MS, Computer Software
              Engineering
            </div>
            <div className="font-mono text-xs text-muted-foreground">2023</div>
            <div>
              1st place, &quot;Best Use Case of Polygon ID&quot; — ETHGlobal NYC
              · &quot;Best Use of Wormhole&quot; — LionHack
            </div>
          </div>
        </div>
      </FileCard>
    </div>
  );
}
