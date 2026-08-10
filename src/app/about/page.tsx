import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FileCard } from "@/components/file-card";

export const metadata: Metadata = {
  title: "about",
  description:
    "About Eswar Saladi: companion robots, crypto hackathons, cooking, camping, and the search for a hard problem.",
};

const oddStats = [
  { value: "6", label: "crypto hackathon prizes" },
  { value: "1", label: "mandatory Benchy" },
  { value: "1", label: "Bichon Frise stakeholder" },
];

function BranchTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-mono text-[13px] font-semibold tracking-[-0.01em]">
      <span className="mr-2 text-primary">~/</span>
      {children}
    </h2>
  );
}

export default function AboutPage() {
  return (
    <div className="mt-10 grid items-start gap-8 md:grid-cols-[220px_1fr]">
      <aside className="md:sticky md:top-24">
        <Image
          src="/avatar.png"
          alt="Illustrated portrait of Eswar"
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

        <div className="mt-5 rounded-md border bg-card p-3.5 font-mono text-xs leading-[1.7] text-muted-foreground">
          <div className="mb-1.5 text-foreground">open_tabs/</div>
          <div>├─ learning machines</div>
          <div>├─ 3d printing</div>
          <div>├─ orbital debris</div>
          <div>└─ the next hard problem</div>
        </div>
      </aside>

      <div className="min-w-0 space-y-4">
        <FileCard header="about/eswar.md" headerRight="not a résumé">
          <div className="px-6 py-5 text-[15.5px] leading-[1.75]">
            <h1 className="mb-1 border-b border-secondary pb-2.5 text-[28px] font-bold tracking-[-0.02em]">
              Hey, I&apos;m Eswar.
            </h1>
            <p className="mt-3">
              I like walking into things I don&apos;t understand, staying
              level-headed while I figure them out, and finding that mental zone
              where a hard problem takes over everything.
            </p>
            <p className="mt-3">
              It has been a while since I felt that last part. I&apos;m looking
              for it again. I don&apos;t claim to know more than I do, and a
              surprising number of things below end with &ldquo;not yet&rdquo;
              or &ldquo;that didn&apos;t work.&rdquo;
            </p>

            <div className="mt-4.5 grid gap-2.5 sm:grid-cols-3">
              {oddStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-md border bg-background px-3 py-2 font-mono text-xs"
                >
                  <div className="text-[18px] font-semibold text-primary">
                    {stat.value}
                  </div>
                  <div className="mt-0.5 text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FileCard>

        <FileCard
          header="currently-building/emul.md"
          headerRight="software: yes · robot: not yet"
        >
          <div className="px-6 py-5 text-[15px] leading-[1.75]">
            <BranchTitle>something that learns</BranchTitle>
            <blockquote className="my-4 border-l-2 border-primary bg-accent/60 px-4 py-3 font-mono text-[13px] leading-[1.65] text-accent-foreground">
              I&apos;m trying to build something that learns—not just a thing
              that knows stuff.
            </blockquote>
            <p>
              <strong>EMUL</strong> is my attempt at a companion robot with room
              to develop motives of its own. The name comes from Emul in
              <em> Shangri-La Frontier</em>: usually supportive, occasionally
              poking the main character, and never merely part of the scenery.
              Watching <em>Ron&apos;s Gone Wrong</em> supplied the other half of
              the idea—a companion interesting because it can change, not
              because it arrived knowing everything.
            </p>
            <p className="mt-3">
              The robot is meant to map its home, learn which of its behaviors
              get a reaction, and play with Bunny, a friend&apos;s Bichon Frise
              I ended up loving enough that I may have brainwashed his owner
              into moving closer to me.
            </p>
            <p className="mt-3 text-muted-foreground">
              Reality check: the software is built and tested; the robot has
              never run on hardware. My first 3D print was the obligatory
              Benchy. The top deck exists in CAD. The physical build is the next
              part.
            </p>
          </div>
        </FileCard>

        <div className="grid items-start gap-4 lg:grid-cols-2">
          <FileCard header="hackathons/people-over-prizes.md">
            <div className="px-5 py-4.5 text-sm leading-[1.7]">
              <BranchTitle>six prizes, more friends</BranchTitle>
              <p className="mt-3">
                I went through a crypto-hackathon phase and won prizes at six of
                them. The builds included anonymous subscription auth with
                Polygon ID, a 3D-avatar NFT system, a VeChain nutrition and
                workout planner for underprivileged kids, and cross-chain
                messaging experiments.
              </p>
              <p className="mt-3">
                The prizes blur together now. The people don&apos;t. I went bar
                hopping with complete strangers I had just met at a hackathon.
                At another, I befriended everyone still coding at midnight
                {"—including the security guard."} Most of the friends from that
                period came from rooms like those.
              </p>
            </div>
          </FileCard>

          <FileCard header="away-from-keyboard/field-notes.md">
            <div className="px-5 py-4.5 text-sm leading-[1.7]">
              <BranchTitle>campfires and first attempts</BranchTitle>
              <p className="mt-3">
                I like slow camping. In Mena, Arkansas, my friends and I cooked
                over a campfire and did very little—which was exactly the point.
                I also somehow found a campsite with genuinely neat restrooms,
                an underrated outdoor luxury.
              </p>
              <p className="mt-3">
                The first time I cook a dish, it tends to come out really well:
                ratatouille from the movie, rajma coconut curry, vegetable pho.
                The second attempt is usually worse because confidence kicks in
                and I start skipping the steps I respected the first time.
              </p>
            </div>
          </FileCard>
        </div>

        <FileCard header="work/README.md" headerRight="the linear version">
          <div className="px-5 py-4 text-sm leading-[1.7]">
            For work, I&apos;m a backend engineer at Fidelity. That is part of
            my life, not the organizing principle of it. The chronology,
            production systems, and performance numbers are on the{" "}
            <Link
              href="/resume"
              className="font-medium text-primary underline decoration-primary/30 underline-offset-4 hover:text-accent-foreground"
            >
              résumé
            </Link>
            , where they belong.
          </div>
        </FileCard>
      </div>
    </div>
  );
}
