const removed = ["silence"];
const added = [
  "backend engineer @ Fidelity. Golang, TypeScript, Kafka.",
  "ships production fintech with coding agents.",
  "design, review, correctness: mine. typing: mostly not.",
  "posts weekly-ish. no fluff, no newsletter popup.",
];

export function BioDiff() {
  return (
    <div className="overflow-hidden rounded-md border font-mono text-[13.5px] leading-[1.8]">
      <div className="border-b bg-secondary px-3.5 py-2 text-xs text-muted-foreground">
        bio.md · +{added.length} −{removed.length}
      </div>
      <div className="bg-card py-2.5">
        {removed.map((line) => (
          <div
            key={line}
            className="bg-diff-del px-3.5 text-diff-del-foreground"
          >
            - {line}
          </div>
        ))}
        {added.map((line) => (
          <div
            key={line}
            className="bg-diff-add px-3.5 text-diff-add-foreground"
          >
            + {line}
          </div>
        ))}
      </div>
    </div>
  );
}
