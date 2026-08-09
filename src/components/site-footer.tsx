export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex w-full max-w-[960px] flex-wrap items-baseline gap-x-[18px] gap-y-1 px-6 py-4 font-mono text-[12.5px] text-muted-foreground">
        <span>© 2026 Eswar Saladi</span>
        <a
          href="mailto:hello@generalist.dev"
          className="text-primary hover:text-accent-foreground"
        >
          hello@generalist.dev
        </a>
        <a
          href="https://github.com/gendev1"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:text-accent-foreground"
        >
          github/gendev1
        </a>
        <a
          href="https://linkedin.com/in/eswarsaladi"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:text-accent-foreground"
        >
          linkedin
        </a>
        <span className="ml-auto">Reviewed by me. Typed by agents.</span>
      </div>
    </footer>
  );
}
