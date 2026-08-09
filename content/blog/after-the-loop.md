---
title: "It's not loops, graphs, or DAGs. It's what comes after"
summary: "The code factory can be green and wrong. The real work starts with independent oracles, mutation gates, and keeping a human able to explain the system."
date: "2026-08-09"
tag: "rant(harness-engineering)"
tagType: "rant"
---

[![Steinberger: you shouldn't be prompting coding agents anymore, you should be designing loops that prompt your agents](/images/after-the-loop/loops.webp "@steipete · Jun 7, 2026")](https://x.com/steipete)
[![Steinberger: are we still talking loops or did we shift to graphs yet?](/images/after-the-loop/loops-graphs.webp "@steipete · Jul 18, 2026")](https://x.com/steipete)

That's the discourse in two screenshots, six weeks apart. First we prompted agents. Then we designed loops that prompt agents. Then loops were apparently over and it was graphs. Somewhere in that quarter, "loop engineering" got its own explainers, its own taxonomy, and its own funeral.

And it's not one guy's timeline. Boris Cherny, who leads Claude Code, says the same thing: "I don't prompt Claude anymore. I have loops running that prompt Claude." Addy Osmani wrote the field guide. The taxonomy posts landed right on schedule — a prompt controls one model response, a loop controls one agent, a graph controls an organization of agents. And the funeral was fast: Steinberger's "did we shift to graphs yet?" went up at 00:34 UTC on July 18; about four and a half hours later an X Article titled "Loop Engineering Is Dead. Enter Graph Engineering." was live, and same-day graph-engineering guides were already reading like settled practice. Receipts, clickable:

[![Addy Osmani's "Loop Engineering" opening with the Steinberger and Cherny quotes](/images/after-the-loop/discourse-osmani.png "addyosmani.com · Loop Engineering · Jun 7, 2026")](https://addyosmani.com/blog/loop-engineering/)
[![MarkTechPost: "Prompt Engineering vs Loop Engineering vs Graph Engineering"](/images/after-the-loop/discourse-taxonomy.png "marktechpost.com · Jul 29, 2026")](https://www.marktechpost.com/2026/07/29/prompt-engineering-vs-loop-engineering-vs-graph-engineering/)
[![SmartScope's post-mortem: from a one-line question to an obituary in four and a half hours](/images/after-the-loop/discourse-obituary.png "smartscope.blog · the obituary, timestamped")](https://smartscope.blog/en/blog/graph-engineering-loop-engineering-logic-review/)
[![explainx.ai: "Graph Engineering: After Loops, This Is How You Wire Multi-Agent Orgs"](/images/after-the-loop/discourse-graphs.png "explainx.ai · Jul 18, 2026 — same day")](https://www.explainx.ai/blog/graph-engineering-ai-agents-multi-agent-organizations-2026)

The ladder keeps extending: prompt, context, harness, loop, graph. Whatever rung you're standing on, someone is already selling the next one — and every rung lives on the same side of the diagram:

![The discourse ladder: prompt, context, loop, graph engineering — all on the write path, ending at "code exists… and then what?"](/images/after-the-loop/diagram-ladder.png?v=1 "fig 1 · the discourse ladder, all of it on the write path")

I've been on this treadmill too, and this isn't a takedown. Specs did their job — a fine primitive. Loops and graphs are fine primitives too. But look at what every rung of the ladder has in common: it's all machinery for *producing* code. Then I ran a real verification pass over the output of my own factory, and came out believing the execution topology is the least interesting part of the problem. Almost nobody is working on what happens after the code exists.

## The factory worked

I ran a lights-off factory on a real project: 18 epics, 99 merged PRs, 365 commits, ~30k lines of Go — 17k of them tests. The domain was a financial calculation engine, the unforgiving kind where a number wrong in one direction quietly accumulates risk. The specifics don't matter here; every claim below generalizes.

The output looked like the work of a diligent team. Clean packages, conventional commits, documented invariants. Suite green, `go vet` clean, race detector clean, every PR agent-reviewed before merge. By every signal the loop could see, this was done. The code even *reads* well.

That last part matters. This was not slop that escaped because the factory was obviously careless. It was coherent, idiomatic, reviewed software. The failure was more interesting: all of the quality signals were downstream of the same process. The agents produced the implementation, produced most of the tests, reviewed the relationship between the two, and then reported agreement. The factory was very good at proving that its outputs agreed with one another.

## Then I tested it for real

After the factory finished, I built a separate verification pass: an oracle transcribed by hand from the primary spec, a ~2,300-case corpus derived from that oracle, and a mutation campaign to test the tests.

It found five classes of bugs, all pointing in the same dangerous direction — the engine confidently outputting numbers that were too small. Shipped as-is, that's the kind of wrong you discover at scale, in production, with money attached. My favorite fits in one character:

```diff
-	mult := math.Max(optA.Leg.Mult, optB.Leg.Mult)
+	mult := math.Min(optA.Leg.Mult, optB.Leg.Mult)
```

Wrong side of a max/min decision. The catch: on the common inputs both sides give the same answer — and those were the only inputs the agent wrote tests for. The suite was green over the bug. Review saw plausible code. Every gate passed.

This is not a domain-specific anecdote. Every codebase has a pair of paths that agree on the common case and diverge on the one that matters — rounding directions, timezone edges, inclusive/exclusive boundaries. An agent optimizing for green will find the test that passes, not the case that breaks.

## Green is only a local fact

A passing test proves a narrow proposition: for the examples somebody chose, actual output matched expected output. It does not prove that the examples came from the spec, that the expected values were independently derived, or that the important branch was exercised. “The suite is green” sounds like a statement about the product. Usually it is only a statement about agreement inside the test harness.

If implementation output is copied into expectations, the implementation and the suite can be perfectly consistent and jointly wrong. Add an AI review that asks whether the code and tests look plausible, and you do not have three independent signals. You have one assumption echoed three times.

![Correlated evidence: implementation, implementation-derived tests, AI review, and a green suite all repeat one assumption. Independent evidence starts from the primary spec, builds an oracle without reading implementation output, and diffs the two paths.](/images/after-the-loop/diagram-false-green.png "fig 2 · four green signals can still be one source of truth")

The missing ingredient is not another reviewer in the same chain. It is a second path to the answer. A useful oracle can be wrong — my hand transcription certainly could have been — but disagreement between independently derived paths creates somewhere concrete to investigate. Agreement inside one path creates confidence without information.

## The part that actually scared me

Not the bugs. I went to fix them and realized I couldn't — not quickly. I did not know my own codebase.

Lights-off means lights off: I never read those 99 PRs. Agents wrote them, agents reviewed them, the loop merged them, and I read dashboards. That was the entire appeal — and it worked, right up until the first time something needed a human who could hold the design in their head. Debugging needs recall: where does this value get computed, what invariants does it assume, who else depends on it. I had none of it. The codebase isn't bad — it needs a handful of fixes — but the person who was supposed to make them was never in the room when it was written.

That's comprehension debt. It compounds silently, and no linter measures it.

![Agents build a connected system, but the human receives only “99 PRs merged” and “suite green.” When a wrong output appears, the missing causal map must be reconstructed before debugging can begin.](/images/after-the-loop/diagram-comprehension-debt.png "fig 3 · build → summary → incident: where comprehension debt appears")

Comprehension debt is not missing documentation. The factory produced documentation. It is the gap between the system's causal structure and the operator's working model of it. A generated architecture page can tell me that package A imports package B; it cannot give me the practiced ability to predict which invariant breaks when a value changes, or which tests ought to fail. That model is built by tracing, explaining, and occasionally being wrong in public before production forces the lesson.

The usual automation calculus counts the time no longer spent typing or reviewing. It rarely books the liability created when nobody acquires that model. Lights-off development did not remove the cost of understanding the system. It deferred it until the worst possible moment: when the system was already wrong and I was under pressure to change it safely.

## What the outer loop is missing

Three things I'm now convinced belong in any lights-off setup, whatever its topology:

**Comprehension brakes.** The loop halts at checkpoints until the human can explain what changed — not approve it, *explain* it. Pick a critical path and ask: where does the value enter, where is the authoritative decision made, what invariant must hold, who consumes the result, and which test would fail if the decision flipped? This does not mean reading every generated line. It means sampling until the operator can reconstruct the path without outsourcing the answer back to the factory. Comprehension is a budget you spend deliberately, and if you spend none, you've pre-committed to owning a codebase you can't debug.

**Mutation testing.** An old pattern — the papers are from the 70s — that answers the question agents made urgent: who tests the tests? Seed single-site bugs into the code and rerun the suite:

```go
// your code
if qty >= positionLimit {
    return ErrLimitExceeded
}

// the mutant: one operator flipped
if qty > positionLimit {
    return ErrLimitExceeded
}
```

If no test fails, the boundary was never really tested — the suite is green decoration. My campaign ran 220 mutants: 213 killed, 7 provably equivalent, a 100% kill rate on the ones that mattered. But that number only existed *after* the oracle work. The factory's own suite had an unmeasured kill rate, which is exactly how a green suite shipped `max` for `min`.

Mutation score is not a correctness proof. A campaign can only test the faults it knows how to seed, and equivalent mutants need human judgment. But it measures something ordinary coverage does not: whether the suite is sensitive to plausible mistakes in the decisions that matter. Line coverage tells you a test visited the `max`. Mutation testing asks whether the test would notice if it became `min`.

**Oracles.** Expected outputs must come from ground truth that is independent of the implementation — a hand transcription of the spec, a reference implementation, an invariant that must hold. Never from the code under test. The rule I now keep at the top of the corpus package:

```go
// Every expected value in testdata is derived from an independent oracle —
// a transcription of the primary spec — never from engine output.
// Copying the engine's output into an expectation makes the case
// self-grading, and a self-grading test is worthless.
```

When an agent writes the code and its tests in the same loop iteration, the tests *are* engine output. Self-grading, worthless. Independence is about derivation, not merely which model or person typed the file. Two agents reading the same implementation and copying the same behavior are not independent. One agent transcribing a normative table from the spec without seeing engine output is.

Side by side, the two shapes:

![Self-grading: agent writes code, writes tests from that code, suite goes green, merge. Oracle-derived: spec transcribed independently, corpus of expected outputs, diffed against the implementation](/images/after-the-loop/diagram-selfgrading.png?v=1 "fig 4 · self-grading tests vs an independent oracle")

These three controls are not interchangeable:

| Control | Question it answers | Failure it exposes |
| --- | --- | --- |
| Oracle | Does the implementation agree with independently derived ground truth? | Wrong product behavior |
| Mutation gate | Would the suite notice a plausible logic error? | Weak or decorative tests |
| Comprehension brake | Can a human trace the decision and repair it safely? | Operator knowledge debt |

An oracle without mutation testing can be guarded by a suite too weak to localize regressions. Mutation testing without an oracle can make a self-grading suite exquisitely sensitive to the wrong behavior. Both without comprehension leave a verified system that its owner still cannot repair. The controls work because they fail differently.

## The shape I'd bet on

MVP → derive oracles from the primary source → development gated by mutation score → CI review that diffs against the oracle, with comprehension brakes between the gates:

![The outer loop: MVP, derive oracles, agents develop, mutation gate loops survivors back, comprehension brake halts until a human can explain the change, CI review diffs against the oracle, merge](/images/after-the-loop/diagram-outerloop.png?v=1 "fig 5 · the outer loop with verification gates")

Not every package needs a 2,300-case oracle or a perfect mutation score. Start where being wrong is expensive: calculations, permissions, state transitions, money movement, destructive operations. Freeze a small independent corpus. Mutate the decisions on those paths. At each milestone, make the operator trace one of them end to end. Expand the verified surface when production risk justifies it.

That is a less glamorous pitch than “design a graph of agents.” It also gives the graph something objective to optimize against. The topology can change every quarter. The authority boundary should not: agents may propose and produce; independently derived evidence decides whether the result lands.

And note the last step honestly: an AI reviewer without an oracle is just a second opinion with the same blind spot — mine reviewed the `max`/`min` bug and saw plausible code.

My draft of this post ended "there are no exact metrics AI-driven development can base itself on." Half wrong. One useful metric already exists and is fifty years old: mutation kill rate. An agent can make it go up, but only by adding tests that notice more seeded faults. That is a much harder number to flatter than lines changed, PRs merged, test count, or coverage.

Comprehension debt still has no gauge. For now the brake is stubbornly human: stop, point at a critical path, and explain it. Until that becomes part of the factory, loops versus graphs is arguing about the delivery truck while nobody checks the cargo — or knows how to open it when it starts leaking.
