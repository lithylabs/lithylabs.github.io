# Figma to AppState Concept

## Current understanding

### Journal center

This journal entry is about discovering `AppState`: long-lived, client-only state that crosses multiple ViewModels and belongs neither to server/business state nor to screen-specific `UiState`. The story begins with introducing Figma into the development process. Mirroring Figma's storyboard organization in Compose made the visible UI structure clearer, which in turn exposed the tangled data flows underneath it. Figma is the catalyst and narrative path; the recognition and naming of `AppState` is the central change.

### Journal boundary

The entry begins with the decision to connect Figma's screen flow to the Compose structure. It ends after the architecture migration, when `AppState` and controllers have produced clearer communication rules and appear to be helping. The later work of keeping Codex aligned through layered instructions and package READMEs belongs to a separate journal concept. Codex's architectural explanation remains in this story only as the diagnostic moment that made the tangled flow visible.

The recurring troop-count problem is evidence of the old architecture's strain, but it is not the catalyst. Temporary troop values were collected until there was enough input to form a `GameAction`, and the map could switch between different troop counts while that happened. This was a thorn repeatedly fixed in place rather than the event that prompted the redesign. It may support the post briefly as a symptom, but a detailed account of that interaction flow would become a separate story.

The actual catalyst was the decision to bring Figma into the process so the writer could eventually collaborate with designers. That required a simple, direct mapping between the screen flow in Figma and the organization in Compose. Making the structure straightforward enough for Codex to follow exposed how much of the existing implementation depended on clever, difficult-to-trace patterns. The discovery of `AppState` came from using Codex to simplify and explain that structure, not from setting out to solve a particular troop-count bug.

Vibing Risk began as an experiment in having AI write all of the code. It was easy to describe the desired behavior to Codex and have it create enough Compose structure to get the project working. Because the generated code appeared to be moving in the requested direction, there was little incentive to inspect it closely.

The emerging problem was not simply that Codex failed to follow instructions or that the writer led it in the wrong direction. It developed through a feedback loop. The writer brought server-side instincts to the UI's data flow. Codex responded by introducing increasingly sophisticated reactive mechanisms and concentrating on making each requested behavior work. Because each local change appeared successful, neither side was forced to confront the accumulating architectural problem. The working implementation validated the direction, which encouraged more changes in the same style and made the underlying structure progressively harder to understand.

Codex therefore played two roles in the drift. It followed the writer's server-oriented framing, but it also tried to be clever within that framing—adding flow transformations and connective machinery that solved immediate problems while obscuring ownership and lifecycle. Its bias toward implementation meant it rarely stopped to say that the difficulty might indicate a missing architectural concept. The architecture became discoverable only when the system was reorganized and Codex was explicitly asked to explain what it had built.

Figma may enter the process as a way to improve the direction given to the coding agent—not merely as another tool for producing screens. The exact connection is still developing.

Figma had always been part of the intended path. It offered an immediate place to make wireframes and, eventually, a shared medium for bringing a designer into the project. The technical pressure to introduce it emerged alongside a struggle to standardize the relationship between ViewModels and composables.

The usual single-user model suggests a clean pipeline: a ViewModel receives business state, translates it into `UiState`, and that state determines what the composables display. Vibing Risk complicates this because it is a pass-and-play game. The same device moves between players, and the game must present a different view of the same underlying game depending on which player currently holds it.

Before this process, the writer's mental model had only two categories: `ServerState` and `UiState`, with the ViewModel serving as the bridge between them. The data that resisted this model was client-only and closely related to the UI, but it was not ephemeral presentation data. `PlayerSession` was the first clear example.

There now appear to be three distinct kinds of state:

1. **Server state**, including `GameState`, is pure business state. It describes the game without knowing how it will be presented.
2. **App state** is long-lived, client-only state. It can describe a player's perspective on the game and change as that perspective changes. It belongs to the application experience, but not naturally to the composable hierarchy. `PlayerSession` is the motivating example.
3. **UI state** is the presentation-ready data consumed by composables, such as the number shown in the Available Troops box or which composable should currently be visible.

Codex repeatedly tried to move `AppState` into the Compose `StateFlow` patterns that work well for `UiState`. Although mechanically plausible, that placement felt wrong and made it difficult to understand where the data lived and how it changed. The issue was not whether AppState could be represented by a flow; it was whether it had the same ownership and lifecycle as a screen's UI state.

The architectural response was a new **controller layer**. Controllers sit closer to the server-side data boundary and own or expose long-lived application concerns. ViewModels receive data through controllers in much the same way they receive `GameState`. In this project, both arrive through an `EventBus`, reflecting a backend that pushes much of its data.

Figma did more than specify how screens should look. Working through the design exposed a category of state that the earlier code-first model had obscured. The emerging process is therefore connecting visual design to architectural discovery: designing the possible user experiences forces the application to name who owns the state behind them.

The concrete bridge from Figma to Compose began with organization. The original Compose process was widget-focused, which did not match the way the experience appeared in Figma. Figma presented the game more like a storyboard: frames formed screens, screens belonged to sections, and the sections expressed the flow of play. The Compose structure was reorganized to mirror that model. `BoardScreen` became the starting point, with sections for Recruit, Draft, Attack, Fortify, and Opponent. Each section contained a series of screens and received its own Container, Content, ViewModel, and `UiState`.

This mapping worked well for the visible design, but it exposed a hidden data-flow problem. Session data sometimes took strange routes or fell out of sync. When Codex was asked to explain the flow, the explanation revealed chains of transformed flows: `StateFlowA` fed `StateFlowB`, which fed `StateFlowC`. The system mostly worked, but failures were difficult to trace because it was unclear which transformation introduced stale or incorrect data.

Trying to reserve `StateFlow` for the boundary between ViewModels and their rendered UI exposed the AppState leak. Codex continued introducing flows that effectively communicated from one ViewModel to another. At the same time, `SessionController` did not fit the categories Codex was using: it was not a ViewModel, but it was not client/server business code either. The mismatch stopped looking like an isolated implementation problem and became evidence that the architecture lacked a name and home for a real kind of state.

`AppState` and controllers emerged from recognizing that cross-ViewModel concern. Similar state is often absorbed into a ViewModel in simpler applications, which helps explain why there was no single obvious naming convention to adopt. In Vibing Risk, however, player session state crosses several ViewModels and outlives any one screen. Naming the concepts `AppState` and `Controller` made that difference explicit and gave the code a more stable organization.

The discovery took shape around `SessionController`. Session data had been stored as `UiState`, so the apparent consistency of the old model kept pulling toward making `SessionController` a ViewModel. But the session was not a screen model, and its data needed to cross multiple ViewModels. Moving it toward the client/server data layer also failed conceptually because it existed only on the frontend. Each attempted classification exposed another contradiction: it behaved too broadly and lived too long to be ordinary `UiState`, but it was not backend state.

The name `SessionController` came from the writer's server-development history. `Service` might be the more common general term, but on the frontend that word already suggests a different concept. `Controller` was an older familiar term from before service became the writer's standard vocabulary, and it better distinguished this application-level role in the current system.

This was not a single moment of selecting a known pattern. It involved trying several structures and observing how Codex interpreted each one in code. An important process lesson was to work with the conceptual distinctions Codex could apply reliably rather than repeatedly forcing it to reproduce the writer's private mental model. The loop became: describe the intended responsibility, inspect Codex's translation, clarify where it was wrong, and revise the shared vocabulary. Once Codex responded consistently to the idea of a third state category, the writer and Codex worked together to settle on the names `AppState` and `Controller`.

Controllers also clarified action ownership. Previously, action logic was scattered according to the widgets that happened to initiate it: the map handled clicks and country discovery, while other widgets handled draft adjustments. The new `ActionsController` separates low-level UI events from application intent. A ViewModel interprets its small portion of the UI, then delegates to `ActionsController`, which understands what those local gestures mean within the larger game interaction.

`ActionsController` followed the solution for `SessionController`; it was not part of the initial AppState discovery. Once `SessionController` established that a legitimate application-level layer existed between screen UI and game state, a related problem became easier to name. User interactions often needed application-level logic to combine or translate them into `GameAction`s. That responsibility did not belong in individual widgets or narrowly scoped ViewModels.

Introducing `ActionsController` generalized the controller layer from shared state to shared application intent. The resulting cleanup produced an important validation signal: Codex began pointing out code that did not fit the new architecture. Earlier, Codex had perpetuated the old patterns by making each local change work. Once the vocabulary and boundaries became clear enough, the same tendency to follow recognizable structure started working in the architecture's favor. Codex could now detect violations instead of silently extending them. This was the moment the writer felt the migration was on the right track.

The migration to the new architecture is now complete, and the new types proved useful because they made communication rules explicit. `StateFlow` has one narrow role: carrying state from ViewModels to containers. Other communication is pushed through an `EventBus`. This is not a traditional event bus with a separate manual subscription mechanism; subscriptions use the Kotlin Flow API, providing lifecycle behavior similar to `StateFlow` while making the nature and direction of the communication clearer.

The migration also exposed a recurring property of AI-written systems: Codex tends to drift back toward the patterns most familiar from its training. A good architecture does not enforce itself merely because it was established earlier in the conversation. Written rules help, but rules alone appear to lose influence over time. Package-level READMEs are more effective because they put architectural context near the code being changed and can reinforce the broader instructions at the moment a local decision is made.

Code review alone is a poor way to detect this drift, especially when much of the code is AI-generated. A more effective diagnostic is to ask Codex to describe the design it has implemented. Architectural violations that are buried across many files often become obvious when the agent has to state the ownership, data flow, and communication boundaries in plain language. The explanation is not merely documentation; it is a test of whether the implementation still expresses the intended design.

> **Concept split, 2026-07-31:** The ideas about Codex drifting toward familiar patterns, instruction hierarchy, package-level READMEs, and design explanations as architectural checks have opened a separate line of thought. They continue in [Codex Instructions and Architectural READMEs Concept](./Codex%20Instructions%20and%20Architectural%20READMEs%20Concept.md). The material remains here because this document records the stream in which those ideas emerged.

## Evolution

### 2026-07-28

- Began with the working title “Introducing Figma to the Process.”
- It is not yet clear whether this will become a journal entry about an experiment in progress or an insight about what changed after Figma was added.
- Vibing Risk was deliberately created as a project in which AI would write all the code.
- Codex could readily translate requests into working Compose structure.
- The generated code was not inspected closely because it appeared to be doing what had been requested.
- The first important realization was that successful agent execution does not guarantee good direction: Codex went where it was told, but the writer's server-development background led it toward the wrong destination for a UI project.
- This was later refined: the drift was not caused by the writer's background alone. It was a reinforcing loop among server-oriented direction, Codex's tendency to produce sophisticated flow-based solutions, and its focus on making each local requirement work rather than identifying a system-level architecture problem.
- Local success concealed global deterioration. Each working change appeared to validate the current approach and prompted further changes that deepened the same architectural pattern.
- Figma was always expected to join the workflow, both for early wireframing and as the eventual collaboration surface for a designer.
- The immediate architectural struggle involved interactions between ViewModels and composables.
- A conventional `GameState` → ViewModel → `UiState` flow would be relatively straightforward for a single-user version of the game.
- Pass-and-play creates a middle category of state: two players can see completely different representations while sharing the same underlying game and device.
- `PlayerSession` provides a promising structure for this player-relative concern, but integrating it with ViewModels and composables has been difficult.
- The state model is now understood less as a simple business/UI split and more as three layers: pure game state, player-relative display state, and pure UI presentation state.
- The writer's original Compose model had two categories, `ServerState` and `UiState`, connected by a ViewModel.
- `PlayerSession` revealed that the player-relative middle layer is part of a broader category: long-lived, client-only `AppState`.
- Calling this category `AppState` clarified that it belongs to the client without belonging to the composable hierarchy.
- Codex repeatedly placed this data into the `StateFlow` machinery used by `UiState`. That made the data's ownership and changes difficult to follow, even though the mechanism itself could carry the values.
- A controller layer was introduced to sit closer to server-side data and provide AppState to ViewModels through a boundary similar to the one used for `GameState`.
- The project uses an `EventBus` for this boundary because much of its backend data is pushed.
- Figma helped reveal the missing state category during the design process; it was contributing to application architecture, not only wireframes.
- The original Compose organization was widget-focused and did not align with Figma's screen-flow model.
- Figma was understood as a storyboard composed of sections, frames, and screens.
- Compose was reorganized to mirror that structure: `BoardScreen`, then gameplay sections for Recruit, Draft, Attack, Fortify, and Opponent, then the screens within each section.
- Each section received a Container, Content, ViewModel, and `UiState`.
- This visual-to-code mapping worked well, but session data still followed strange paths and occasionally became unsynchronized.
- Asking Codex to explain the data flow revealed chains of transformed `StateFlow` instances that were difficult to diagnose when something failed.
- Restricting `StateFlow` to the ViewModel/rendered-UI boundary exposed flows that were effectively being used for ViewModel-to-ViewModel communication.
- `SessionController` did not fit the existing ViewModel or client/server categories, providing further evidence of an unnamed architectural layer.
- Research through conversation with Codex suggested that this kind of application state is often folded into a ViewModel in simpler systems; Vibing Risk could not do that cleanly because the state crossed multiple ViewModels.
- The project adopted the names `AppState` and `Controller` even though there was no universal convention, because the names made ownership and lifetime legible within this codebase.
- The immediate contradiction was that session data was stored as `UiState`, encouraging repeated attempts to make `SessionController` a ViewModel even though the session crossed ViewModels and did not belong to any one screen.
- Moving session data toward the client/server data layer did not fit either, because the state existed only on the frontend.
- `Controller` came from the writer's earlier server vocabulary. `Service` might be more conventional in another context, but carries a different meaning on the frontend.
- The discovery developed through experiments: describe a responsibility, observe how Codex translated it into code, and revise the model and terminology.
- A process insight emerged: it was more effective to develop a shared model that Codex handled consistently than to force Codex to reproduce an architecture expressed only in the writer's personal terms.
- Once the third state category worked reliably in practice, the writer and Codex collaborated on naming it `AppState` and its coordinating types controllers.
- `ActionsController` consolidated action logic that had previously been spread across the map and individual widgets.
- ViewModels now translate a narrow set of low-level UI events, while `ActionsController` interprets their broader application intent.
- `ActionsController` was introduced after the `SessionController` solution revealed the broader application-level layer.
- User interactions needed application logic to translate them into `GameAction`s; this did not belong in widgets or individual ViewModels.
- The strongest sign that the new architecture was coherent was that Codex began identifying code that violated it.
- Codex shifted from extending problematic local patterns to reinforcing the newly legible boundaries.

### 2026-07-31

- Chose the journal post's center: the discovery of `AppState`.
- Figma will remain the beginning and catalyst of the story rather than becoming the post's primary subject.
- The architectural-instruction and package-README material is a distinct follow-on concept. Codex's design explanation remains relevant here only as the diagnostic event that revealed the chained data flow.
- Confirmed the journal boundary: begin with mapping Figma's screen flow into Compose; end with the completed AppState/controller migration and its initial positive results.
- Identified troop counts as a recurring symptom rather than the story's catalyst. Temporary troop values could cause the map to switch among different counts while enough input was collected to create a `GameAction`.
- The troop-count issue had been repeatedly patched and did not itself trigger the architectural work.
- Reaffirmed the actual catalyst: introduce Figma for future designer collaboration and create a straightforward Figma-to-Compose flow that would also be easy for Codex to follow.
- The post should show AppState emerging through the joint work of simplifying the structure and asking Codex to explain it, without turning into a detailed post about gameplay interaction flow.
- The architecture migration was completed, and the new architectural types made it possible to define clear communication rules.
- `StateFlow` is now reserved for communication from ViewModels to containers.
- Other pushed communication travels over an `EventBus` whose subscriptions are handled through Kotlin Flow rather than a traditional event-bus subscription API.
- This preserves lifecycle behavior similar to `StateFlow` while making the communication semantics easier to understand.
- Codex tends to wander back toward common training-data patterns even after a project-specific architecture has been established.
- A hierarchy of instructions and architectural rules was introduced to resist that drift.
- Rules by themselves lose effectiveness over time; package READMEs provide local architectural reinforcement closer to the code.
- Asking Codex to describe the implemented design is an effective way to reveal architectural breaks that are difficult to spot by reading generated code.
- Created the separate first journal draft, `Figma to AppState.md`.
- The draft begins with introducing Figma and ends with the completed controller migration and Codex beginning to recognize architectural violations.
- Detailed instruction hierarchy and package-README practices remain outside the draft and in their separate concept.
- Reviewed the first draft as a journal entry; the writer felt it accurately captured the experience and approved the overall form.
- The truth pass is complete. A future editing pass can focus on whether every section serves the discovery of `AppState`.

## Source material

- Project: Vibing Risk.
- Initial premise: have AI write all the code.
- Technology mentioned: Compose.
- Useful phrasing: “It had gone where I said, but I’m a server developer, so I led it to the wrong place.”
- Revised framing: “It wasn't just a server developer leading Codex into the wrong place.”
- Contributing forces: server-like direction from the writer; Codex “trying to be fancy”; and Codex making things work locally rather than recognizing an architecture problem.
- Feedback loop: locally successful implementations reinforced the flawed direction and made the architecture increasingly difficult to see and change.
- Interaction model: pass and play, with players handing the same device back and forth.
- Existing domain concept: `PlayerSession`.
- Example of pure UI logic: a particular number needs to appear in the Available Troops box.
- In a single-user design, the ViewModel could obtain `GameState`, break it down into `UiState`, and use that to drive the visible composables.
- The ambiguous middle state changes with the pure `GameState` but belongs to the perspective of a swappable player.
- Original mental model: `ServerState` → ViewModel → `UiState`.
- Revised mental model: server/business state, long-lived client `AppState`, and presentation-ready `UiState`.
- Useful distinction: `PlayerSession` should exist only on the client, yet acts more like server state than ordinary Compose UI state because it is long lived.
- Naming pressure: session state was frontend-only, cross-ViewModel, and longer-lived than screen `UiState`; no existing category captured all three properties.
- `SessionController` originated in the writer's older server-side terminology; `Service` was avoided because it signifies something different in frontend code.
- Discovery method: describe the responsibility to Codex, examine the generated structure, then refine the shared concepts through repeated back-and-forth.
- Failure mode: Codex kept trying to move AppState into the Compose `StateFlow` space used for UiState.
- Resulting architecture: ViewModels obtain data through controllers, much as they obtain `GameState`.
- Transport/update mechanism: `EventBus`, chosen in the context of a push-heavy backend.
- Final communication rule: only ViewModels communicate with containers through `StateFlow`; other pushed communication uses the Flow-backed `EventBus`.
- The EventBus is atypical because Kotlin Flow manages subscription and lifecycle behavior.
- Useful phrasing: “Codex wanders back to its original training.”
- AI guidance structure: general instructions and rules point toward architecture documentation; package READMEs reinforce that architecture locally.
- Review technique: ask Codex to describe the design, then inspect the explanation for ownership or communication paths that violate the architecture.
- Figma-to-Compose mapping: storyboard sections and frames became gameplay sections and screens in code.
- Gameplay sections: Recruit, Draft, Attack, Fortify, and Opponent.
- Per-section pattern: Container / Content / ViewModel / `UiState`.
- Diagnostic symptom: session data occasionally fell out of sync.
- Concrete symptom: the map could alternate between different troop counts because temporary values existed while the UI collected enough inputs to create a `GameAction`.
- This symptom is supporting texture, not the turning point of the journal entry.
- Diagnostic explanation: chains of `StateFlow` transformations obscured the origin and timing of changes.
- Previous action ownership examples: map code handled clicks and country discovery; widgets handled draft adjustments.
- New action boundary: local ViewModels translate UI events and delegate application intent to `ActionsController`.
- Sequence: solve shared session state with `SessionController`, recognize the application layer, then introduce `ActionsController` for cross-screen interaction intent.
- Validation moment: after the cleanup, Codex itself started pointing out architectural problems in existing or proposed code.

## Threads to revisit

- What process existed before Figma entered it?
- What specifically revealed that the Compose structure had arrived in the wrong place?
- Which server-side instincts produced poor UI decisions?
- What problem or friction made Figma feel necessary?
- Does `PlayerSession` constitute AppState itself, or is it one instance of state managed by a broader controller layer?
- Which parts of player-relative state must survive a handoff, process recreation, or navigation?
- Do controllers own AppState, derive it from server state, or coordinate both?
- How does a ViewModel combine controller-provided AppState and `GameState` into a screen-specific `UiState`?
- Was `EventBus` already present for server updates, or did adopting controllers expand its role?
- Why do package-level READMEs retain influence better than rules stated only in higher-level instructions?
- What questions or requested format make Codex's design explanation most useful as an architectural check?
- Can the design-description step become a repeatable gate after each substantial implementation?
- Is architectural drift primarily caused by missing context, ambiguous rules, or the statistical pull of more common Compose patterns?
- What would have prompted Codex to challenge the framing earlier instead of continuing to satisfy local requests?
- Is “local success hiding global architectural failure” the central AI-development lesson of the post?
- Who or what now moves between Figma and implementation?
- Did Figma become a source of truth, an intermediate artifact, or simply another place where decisions can diverge?
- What changed in the writer’s understanding after trying it?
- Is the strongest framing that Figma changed the unit of organization from widgets to user-flow sections, which then forced state and action ownership to become explicit?
- What was one concrete out-of-sync failure that illustrates why the chained-flow architecture was painful?
- A possible future post could focus on modeling temporary gameplay input and troop-count flow without confusing it with committed `GameState`.
- How much should the post distinguish `Controller` from the more common term `Service`, versus simply explaining why `Controller` worked as the project's shared vocabulary?
- Which problem did Codex first identify on its own after `ActionsController` made the architecture legible?
