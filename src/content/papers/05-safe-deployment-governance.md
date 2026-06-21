---
title: "Safe deployment and governance"
slug: safe-deployment-governance
summary: "An agent earns autonomy in stages, not on day one. Shadow, human-in-the-loop, supervised autonomy, and the controls that sit underneath all three."
order: 5
---

An agent earns autonomy in stages; it is not granted on day one. The safe path runs through three modes: shadow, where the agent observes and its output is compared but not used; human-in-the-loop, where it acts and a person approves; and supervised autonomy, where it acts within limits while it is audited and monitored. Underneath all three sit a fixed set of controls. Every action stays reversible, logged, and owned until it has earned otherwise.

## How do we deploy an agent safely?

Start in shadow mode. The agent runs alongside the existing process, producing what it would do, while people keep doing the work; the two are compared until the agent is reliably right. Then move to human-in-the-loop: the agent acts, a person approves each material action. Only once it has proven itself does it graduate to supervised autonomy, acting on its own within defined thresholds, with a person watching the exceptions. Autonomy is earned with evidence, not assumed.

## What controls sit underneath?

Six, throughout. Confidence thresholds, so low-certainty cases route to a human. Audit logging, so every action is traceable. Drift monitoring, so degradation is caught early. Least privilege, so the agent can touch only what it must. A kill switch, so it can be stopped at once. And a named owner, so there is always a person accountable. These are not optional extras; they are the conditions under which an agent is allowed to operate at all.

## Who owns it?

Every agent has a named human owner in the business, responsible for its behaviour and its outcomes. Accountability does not transfer to the software. If something goes wrong, a person is answerable, and a person can intervene.

## What about the running cost?

Total cost of ownership (the running, oversight, maintenance, and drift) is real and easy to forget. Under a rental model it sits with the provider; under a build model it sits with you, forever. Either way it is named upfront, not discovered later.
