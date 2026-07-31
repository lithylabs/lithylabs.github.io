# Codex Instructions and Architectural READMEs Concept

## Current understanding

This thought split off from [Figma to AppState Concept](./Figma%20to%20AppState%20Concept.md). The Figma discussion led into a different question: once an unusual, project-specific architecture has been discovered, how do you keep Codex working within it?

Establishing an architecture with Codex does not make the architecture self-sustaining. Codex tends to drift back toward patterns that are more common in its training, even after a project-specific design has been discussed and implemented. Each local change can be plausible and functional while slowly violating the larger system.

General instructions and architectural rules help, but they seem to lose influence as the work moves away from the conversation where the decisions were made. Package-level READMEs may work differently because they put the relevant architectural context near the code being changed. They can restate ownership, lifecycle, and communication boundaries when Codex is making a local decision.

There may be a useful hierarchy here. Broad instructions describe principles for the whole project. Package READMEs explain what those principles mean in a specific area of the code. The README is not only documentation of a finished architecture for a human reader; it becomes working context for the coding agent.

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

## Source material

- Project: Vibing Risk.
- Architecture context: server state, long-lived client `AppState`, and presentation-ready `UiState` were made distinct.
- Communication rule: `StateFlow` is reserved for ViewModel-to-container communication; other pushed communication uses a Flow-backed `EventBus`.
- Drift pattern: Codex reintroduced familiar flow patterns that crossed the intended ownership and communication boundaries.
- Useful phrase: “Codex wanders back to its original training.”
- Guidance structure: general instructions and rules point toward architecture documentation; package READMEs reinforce the architecture locally.
- Review technique: ask Codex to describe the implemented design, then inspect the explanation for ownership or communication paths that violate the architecture.
- Possible central connection: documentation is both input to the agent and a lens for evaluating its output.

## Threads to revisit

- What did the hierarchy of instructions actually look like in Vibing Risk?
- What was written in the package READMEs?
- Was there a concrete moment when adding a README changed what Codex produced?
- Is proximity the reason local READMEs help, or are they simply narrower and more concrete?
- How does Codex encounter those README files during ordinary work?
- Which rules belong at the project level, and which belong beside a package?
- Does repeating rules at several levels create a maintenance problem or useful redundancy?
- What evidence shows that instructions lose influence over time?
- Is drift caused by missing context, ambiguous rules, or the statistical pull of familiar framework patterns?
- What exact prompt was used to ask Codex to describe the architecture?
- What did the explanation reveal that code review had not?
- Could a design-description step become a repeatable check after substantial changes?
- Could Codex's explanation be compared with a short architectural contract?
- Are situated instructions and architectural explanation checks parts of one insight, or separate posts?
- Is this really about documentation, context engineering, executable architecture tests, or conversational memory?
