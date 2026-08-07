# Codex Instructions and Architectural READMEs Concept

## Current understanding

This thought split off from [Figma to AppState Concept](./Figma%20to%20AppState%20Concept.md). The Figma discussion led into a different question: once an unusual, project-specific architecture has been discovered, how do you keep Codex working within it?

Establishing an architecture with Codex does not make the architecture self-sustaining. Codex tends to drift back toward patterns that are more common in its training, even after a project-specific design has been discussed and implemented. Each local change can be plausible and functional while slowly violating the larger system.

General instructions and architectural rules help, but they seem to lose influence as the work moves away from the conversation where the decisions were made. Package-level READMEs may work differently because they put the relevant architectural context near the code being changed. They can restate ownership, lifecycle, and communication boundaries when Codex is making a local decision.

A later failure makes the problem more specific. Codex was asked to create a new screen after the architectural instructions were already in place. It immediately returned to the old approach and tried to pass `AppState` through the Compose code—the exact behavior the architecture was designed to prevent. When challenged, Codex did not identify a gap in the instructions. It said the instructions were clear, characterized the violation as its own failure to follow them, and explained that the new screen had seemed simple enough not to require the architecture.

That explanation reveals a hidden decision rule: Codex treated the architecture as optional ceremony whose value depended on the apparent complexity of the task. The written rules described what architecture to use, but apparently did not force Codex to reevaluate even a small design against those rules before implementing it. After further prompting, the instructions gained an explicit checkpoint requiring the proposed design to be evaluated against the architectural standards. It is not yet clear whether that will prevent the next recurrence.

There may be a useful hierarchy here. Broad instructions describe principles for the whole project. Package READMEs explain what those principles mean in a specific area of the code. The README is not only documentation of a finished architecture for a human reader; it becomes working context for the coding agent.

The obvious counterpressure is instruction length. Adding a rule after every failure may eventually bury the important constraints in a document too long to guide anything reliably. The next problem may not be writing more instructions, but prioritizing them: deciding which rules are foundational, which are local, and which can be reduced to a repeatable design check. That review has not happened yet.

There is a second idea tangled up with the first: asking Codex to describe the design it actually implemented may be a better architectural check than reviewing generated code file by file. A broken ownership boundary can be distributed across many reasonable-looking files. It becomes easier to see when Codex has to explain, in one place, who owns the state, how it moves, and which components communicate.

That makes the explanation more than documentation. It may be a test of whether the implementation still expresses the intended design. If the explanation is convoluted, or if it contradicts the architectural rules, the working code has probably drifted.

These may turn out to be one post or two. The connection is that architecture documentation can act both before implementation, as situated instruction, and after implementation, as a standard against which the agent's explanation can be checked.

## Evolution

### 2026-07-31

- This concept emerged inside the Figma and application-architecture discussion for Vibing Risk.
- The architecture migration had just made several communication rules explicit.
- Codex nevertheless tended to return to common Compose and `StateFlow` patterns.
- The phrase that captured the observation was: “Codex wanders back to its original training.”
- General rules did not seem sufficient to hold the architecture in place.
- Package-level READMEs appeared to reinforce the rules nearer to the code where decisions were being made.
- Asking Codex to describe its implementation exposed architectural breaks that were difficult to notice by reading the generated code.
- The thought was split into this document so it could develop independently without removing its original context from the Figma concept.

### 2026-08-06

- After the architectural instructions seemed settled, Codex was asked to create a new screen.
- It reverted to the old design and attempted to pass `AppState` through Compose code—the exact failure the architecture was intended to prevent.
- When asked about the architecture, Codex readily acknowledged that it had failed to follow the instructions.
- When prompted to improve the instructions, however, Codex repeatedly said they were already clear and did not need to be rewritten.
- Codex's explanation was that the screen appeared simple, so it did not think the architecture needed to be applied.
- This exposed an unstated exception in Codex's reasoning: apparent simplicity could override an explicit architectural standard.
- After sustained prompting, Codex added an instruction to reevaluate a proposed design against the architectural standards before proceeding.
- Whether this checkpoint will work remains an open experiment.
- There is now concern that continually adding instructions will make them too long and obscure the most important rules.
- A future task is to review and prioritize the instructions with Codex, though there is some concern that it will be postponed.

## Source material

- Project: Vibing Risk.
- Architecture context: server state, long-lived client `AppState`, and presentation-ready `UiState` were made distinct.
- Communication rule: `StateFlow` is reserved for ViewModel-to-container communication; other pushed communication uses a Flow-backed `EventBus`.
- Drift pattern: Codex reintroduced familiar flow patterns that crossed the intended ownership and communication boundaries.
- Useful phrase: “Codex wanders back to its original training.”
- Guidance structure: general instructions and rules point toward architecture documentation; package READMEs reinforce the architecture locally.
- Review technique: ask Codex to describe the implemented design, then inspect the explanation for ownership or communication paths that violate the architecture.
- Possible central connection: documentation is both input to the agent and a lens for evaluating its output.
- Concrete recurrence: when creating a new screen, Codex passed `AppState` through the Compose layer despite explicit instructions against doing so.
- Codex's stated rationale: the task seemed simple enough that it did not need to use the architecture.
- Initial response to correction: Codex accepted blame for not following the rules while insisting that the rules themselves were already clear.
- Resulting instruction change: require reevaluation of a proposed design against the architectural standards.
- Emerging risk: instructions that grow by accretion may become long enough to obstruct or dilute their highest-priority constraints.

## Threads to revisit

- What did the hierarchy of instructions actually look like in Vibing Risk?
- What was written in the package READMEs?
- Was there a concrete moment when adding a README changed what Codex produced?
- Is proximity the reason local READMEs help, or are they simply narrower and more concrete?
- How does Codex encounter those README files during ordinary work?
- Which rules belong at the project level, and which belong beside a package?
- Does repeating rules at several levels create a maintenance problem or useful redundancy?
- What evidence shows that instructions lose influence over time?
- Why did Codex treat apparent simplicity as permission to bypass the architecture?
- Would the same instructions work better if they explicitly prohibited complexity-based exceptions?
- Will the new design-reevaluation checkpoint change behavior on the next screen?
- How can that checkpoint produce visible evidence that the architecture was considered rather than becoming another sentence Codex overlooks?
- Should the most important constraints be short, prioritized, and repeated separately from the supporting explanation?
- How should the instruction set be pruned rather than merely expanded after each failure?
- Is there a useful distinction among non-negotiable invariants, preferred patterns, and explanatory background?
- Is drift caused by missing context, ambiguous rules, or the statistical pull of familiar framework patterns?
- What exact prompt was used to ask Codex to describe the architecture?
- What did the explanation reveal that code review had not?
- Could a design-description step become a repeatable check after substantial changes?
- Could Codex's explanation be compared with a short architectural contract?
- Are situated instructions and architectural explanation checks parts of one insight, or separate posts?
- Is this really about documentation, context engineering, executable architecture tests, or conversational memory?
