import { Suspense } from "react";

import Link from "next/link";
import Image from "next/image";

import { PreloadResources } from "app/preload";

import youtube from "public/youtube.svg";
import github from "public/github-logo.svg";

function Badge(props) {
  return (
    <a
      {...props}
      target="_blank"
      className="border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 rounded p-1 text-sm inline-flex items-center leading-4 text-neutral-900 dark:text-neutral-100 no-underline"
    />
  );
}

function ArrowIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z" fill="currentColor" />
    </svg>
  );
}

function SocialLink({ icon, link, type, name }) {
  return (
    <div className="group flex w-full">
      <a href={link} target="_blank" className="border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 rounded flex items-center justify-between px-3 py-4 w-full">
        <div className="flex items-center space-x-3">
          <div className="relative h-16">
            <Image alt={name} src={icon} height={64} width={64} sizes="33vw" className="border border-neutral-200 dark:border-neutral-700 rounded-full h-16 w-16" priority />
          </div>
          <div className="flex flex-col">
            <p className="font-medium text-neutral-900 dark:text-neutral-100">{type}</p>
            <p className="text-neutral-600 dark:text-neutral-400">{name}</p>
          </div>
        </div>
        <div className="text-neutral-700 dark:text-neutral-300 transform transition-transform duration-300 group-hover:-rotate-12">
          <ArrowIcon />
        </div>
      </a>
    </div>
  );
}

function BlogLink({ slug, name }) {
  return (
    <div className="group">
      <a href={`/blog/${slug}`} className="border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 rounded flex items-center justify-between px-3 py-4 w-full">
        <div className="flex flex-col">
          <p className="font-medium text-neutral-900 dark:text-neutral-100">{name}</p>
        </div>
        <div className="text-neutral-700 dark:text-neutral-300 transform transition-transform duration-300 group-hover:-rotate-12">
          <ArrowIcon />
        </div>
      </a>
    </div>
  );
}

export default function Page() {
  return (
    <div className="antialiased">
      <section>
        <PreloadResources />
        <h1 className="font-medium text-2xl mb-8 tracking-tighter">hey, I'm generalist 👋</h1>
        <p className="prose prose-neutral dark:prose-invert">
          {`i'm eswar saladi, i write smart contracts, frontend, generative ai, apps and hella lot of other things. i'm also founder of `}
          <Link href="https://solvitarka.com">solvitarka</Link>
          {`, where we work on building blockchain and ai solutions for the future. i'm also a grad student from northeastern university, boston.`}
        </p>

        <div className="prose prose-neutral dark:prose-invert">
          <p>
            i go to hackathons, build cool stuff, and write about it. i'm also a big fan of open-source and have contributed to a few projects. i'm always looking for new opportunities to learn and
            grow. i'm currently looking for a new job. if you're hiring, let's chat!
          </p>
        </div>
        <div className="my-8 flex flex-col sm:flex-row space-x-0 sm:space-x-4 space-y-4 sm:space-y-0 w-full">
          <SocialLink icon={youtube} type="youtube" name="@gendev41" link="https://www.youtube.com/@gendev41" />
          <SocialLink icon={github} type="github" name="@gendev1" link="https://github.com/gendev1" />
        </div>
        <div className="prose prose-neutral dark:prose-invert">
          <p>
            i am a big fan of the web3 and blockchain space. i have been working on a few projects in the space and have been learning a lot. do check out my blogs on the same. haven't written any
            yet? well, i'm working on it. stay tuned!
          </p>
        </div>
        <div className="my-8 flex flex-col space-y-4 w-full">
          <BlogLink name="Hello World" slug="hello-world" />
        </div>
        {/* <div className="prose prose-neutral dark:prose-invert">
          <p>i work with node js tech stack but can work with anything else.</p>
        </div>
        <div className="my-8 flex flex-row space-x-2 w-full h-14 overflow-x-auto">
          <div className="border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 rounded flex items-center justify-between px-3 py-4">
            <a href="https://linear.app">
              <svg width="78" height="20" role="img" aria-label="Linear logo">
                <use href="/sprite.svg#linear" />
              </svg>
            </a>
          </div>
          <div className="border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 rounded flex items-center justify-between px-3 py-4">
            <a href="https://supabase.com">
              <svg width="100" height="19" role="img" aria-label="Supabase logo">
                <use href="/sprite.svg#supabase" />
              </svg>
            </a>
          </div>
          <div className="border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 rounded flex items-center justify-between px-3 py-4">
            <a href="https://www.makeswift.com/blog/makeswift-is-joining-bigcommerce">
              <svg width="96" height="19" role="img" aria-label="Makeswift logo">
                <use href="/sprite.svg#makeswift" />
              </svg>
            </a>
          </div>
          <div className="border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 rounded flex items-center justify-between px-3 py-4">
            <a href="https://resend.com">
              <svg width="70" height="17" role="img" aria-label="Resend logo">
                <use href="/sprite.svg#resend" />
              </svg>
            </a>
          </div>
          <div className="border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 rounded flex items-center justify-between px-3 py-4">
            <a href="https://bun.sh">
              <svg width="35" height="27" role="img" aria-label="Bun logo">
                <use href="/sprite.svg#bun" />
              </svg>
            </a>
          </div>
        </div>
        <div className="prose prose-neutral dark:prose-invert">
          <p>
            I've worked with and advised companies on developer marketing, <Link href="/blog/devrel-at-vercel">developer relations</Link>, building open-source communities, product-led growth, and
            more.
          </p>
        </div>
       */}
        <ul className="flex flex-col md:flex-row mt-8 space-x-0 md:space-x-4 space-y-2 md:space-y-0 font-sm text-neutral-600 dark:text-neutral-300">
          <li>
            <a className="flex items-center hover:text-neutral-800 dark:hover:text-neutral-100 transition-all" rel="noopener noreferrer" target="_blank" href="https://x.com/gendev01">
              <ArrowIcon />
              <p className="h-7 ml-2">follow me on twitter : gendev01</p>
            </a>
          </li>
          <li>
            <a className="flex items-center hover:text-neutral-800 dark:hover:text-neutral-100 transition-all" rel="noopener noreferrer" target="_blank" href="mailto://hello@generalist.dev">
              <ArrowIcon />
              <p className="h-7 ml-2">email : hello@generalist.dev</p>
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
}
