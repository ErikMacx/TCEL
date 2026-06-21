---
title: "The system architecture"
slug: system-architecture
summary: "The diagnostic itself is a structured pipeline, not a single clever prompt. Two engines, eight guarded stages, two modes, and how it stays honest."
order: 6
---

The diagnostic itself is a structured pipeline, not a single clever prompt. It runs as two engines (one to find opportunities, one to staff them) across eight guarded stages, driven by an orchestrator that will not skip ahead. It works in two modes from the same core: a deep consultant mode for our analysts, and a guided owner mode for self-serve. The output is always the same shape: a costed, staffed, sequenced plan, with the safest pilot first and the honest caveats included.

## How is the diagnostic built?

An orchestrator runs the stages in order, each with an entry guard so the work cannot run ahead of its inputs. Specialised components handle each stage: intake, interviews, costing, opportunity scoring, actor mapping, and roadmap. Shared skills encode the method (the cost model, the suitability rubric, the staffing logic) so every run applies the same discipline rather than improvising.

## What are the two engines and eight stages?

The opportunity engine finds and ranks the work: scope, intake, interviews, a fully-loaded cost baseline, and opportunity scoring. The staffing engine matches and sequences it: actor mapping, savings by category, and the roadmap. The split matters because most AI advice does only the first engine. The value is in the second.

## What do consultant and owner modes share?

One engine, one method, two depths. Consultant mode runs the full pipeline with an analyst, for a real engagement. Owner mode guides a business owner through a lighter version themselves. The mode is a setting, not a different product, so the logic and the honesty are identical either way.

## How does it stay honest?

By design, not by promise. Every estimate is a banded range with its confidence shown. A gate insists on fixing a broken process before automating it. The method states plainly where AI should not go. And the engine runs on our own infrastructure: the knowledge and the method are open, but the running of it, and the judgement around it, is the paid work.
