# Engineering vs Coding

## Current understanding

### Narrative center clarified

The writer approved a sharper focus for the concrete example: actual gameplay coexisting with a scripted teaching experience. Calling the problem merely adding another tutorial diminishes what made it interesting. Normal combat uses randomness and the game accepts player actions; the teaching sequence needs predictable outcomes and selective interaction while retaining real gameplay. The structural challenge is supporting those needs together, including different teaching sequences, without scattering exceptions or duplicating the game's machinery. The intercept gives this tension a concrete resolution within the implementation, while engineering-versus-coding remains a useful working theory rather than a definitive explanation.

The prospective journal arc follows the writer's changing view of their own contribution: being pleased with AI-assisted work but noticing designs become tangled under new features; finding that poor code quality did not explain excellent results within a supplied structure; trying to understand the different response to design questioning; finding useful language in engineering versus coding; and grounding that language in the coexistence of gameplay and scripted teaching. Prioritize the felt experience of trying to articulate the difference over a procedural account. Do not add an inventory of uncertainties or imply that useful theories are either merely beginning or finally settled.

The writer's latest correction is essential to tone and scope: this is an ongoing attempt to understand, not a completed discovery of a settled distinction. They have some new understanding but do not feel they fully understand engineering yet, and will still be exploring it after the article is finished. Do not write as though the conversation has arrived at a known answer that simply needs explaining. The SDE connection is a tentative recognition, not the resolution of the story. Distinguish this open intellectual inquiry from the earlier instruction not to portray the tutorial implementation as unfinished merely because writing and development overlapped. A completed article and a completed implementation do not imply completed understanding.

The writer has now named the personal discovery at the center of the journal: they had long heard the title software development engineer (SDE), but had never really understood the engineering part. As they focus less on writing code, they can see that more of their time is spent on engineering. The experience with Codex is helping them recognize an aspect of their own work that was previously harder to distinguish from coding. This recognition should orient the eventual story; it is not primarily an argument about fixing agents or proving an AI limitation.

The writer further clarified that the journal is an effort to understand and put words to different parts of software development. It is not a guide to getting Codex to behave differently or an attempt to change Codex. Keep prompting experiments subordinate to that inquiry.

The comparison with junior developers is more specific than a shared lack of experience. The writer has seen junior developers develop their coding ability before their engineering ability. When pushed, they try and struggle to exercise the less-developed ability. Codex feels different to the writer: that kind of effort does not appear in the same way, almost as if the muscle is absent. The writer's analogy is the difference between a weak shoulder muscle that makes lifting overhead difficult and lifting overhead not being an available option. Preserve this as a description of the writer's experience, not a factual assertion that the model lacks a capability. It adds nuance to their earlier belief that generative AI might support engineering with a different focus.

An earlier example predates the tutorial: the structure behind the AI code. The writer described desired actions using conceptual terms such as Goal and Plan, but Codex translated those descriptions into actions to carry out rather than organizing the system into clear areas and concerns. That was adequate for simple behavior. As complexity increased, the behavior became intertwined and the structure broke down. This gives the writer's difficulty naming the gap a concrete history before the tutorial. Do not invent the precise responsibilities or implementation of Goal and Plan; those have not been supplied.

The latest correction takes precedence over the earlier proposed arcs: the journal's interest is the emotional experience of struggling to name the difference between Codex's designs and the writer's own. Do not reduce that experience to concrete steps, techniques, or lessons acquired. As the writer pushed new features onto earlier designs, those designs broke down, were insufficiently adaptable, and grew overly complex. Yet the familiar claim that generative AI produces poor-quality code did not fit: when the writer supplied good design or architectural structure, the generated code was amazing. The writer was struggling to find a narrative that could account for both that strength and the limitation they kept encountering. Preserve the uncertainty and difficulty of articulating it rather than imposing a tidy sequence of discoveries.

The journal should follow the writer's discovery, rather than present a predetermined thesis with an illustrative example. The writer has been pleased with AI-assisted work and thinks it writes code better than they do. Do not frame the starting point as general dissatisfaction with the work or bad code.

The writer kept noticing strange patterns, which they regard as a normal part of development. What stood out was the response to questioning them. The writer normally expects the idea to change through discussion as the reason something does not fit becomes clearer. In their experience, Codex instead moves into defending the existing approach. They associate that defense of a working implementation with a coding response; engineering would explore how to improve the structure. Their analogy is that the house is standing, but engineering would figure out how to improve it.

That experience led the writer to investigate why Codex was not understanding the concern. Asking it explicitly to critique designs helped, and asking it to compare and contrast designs showed promise. However, the writer could not get that behavior into the normal development flow. Preserve the distinction between useful responses to directed evaluation and the agent independently bringing that judgment into ordinary work. These experiments add an important stage to the discovery; their exact timing relative to reading the article has not been established.

The writer tentatively recalls encountering the engineering-versus-coding framing in the article about Linus Torvalds before finding the tutorial intercept. The framing helped articulate the distinction; the later intercept grounded it in their own work. Do not present the intercept as the origin of the distinction. The article's framing and Torvalds's verified remarks remain separate.

The writer rejected the initial draft and paused rewriting to develop the narrative arc. They have now explicitly authorized replacing it. The replacement follows their experience of trying to name the difference, with the Goal and Plan example before the gameplay-and-script example. The latter grounds the engineering distinction rather than originating it. The draft is in `Engineering vs Coding.md` and remains separate from this concept memory.

The emerging distinction is between writing code to get something to work and structuring code around concepts. The writer calls the latter engineering, while emphasizing that it is more than organization: it is about the structure itself.

The writer's emerging framing for the discussion of generative AI code quality is: “the code is good, but the engineering is lacking.” In the tutorial example, Codex could produce working code in functionally sensible places, while the larger structure made the tutorial difficult to understand and replace. This is the writer's interpretation of the experience, not an established claim about all generated code or a claim attributed to Linus Torvalds.

Attribution matters: Codex made suggestions and helped the writer work through the code, but required substantial guidance and did not make the structural leap. The writer found the solution. This should not be presented as a solution Codex reached merely after being asked a better question. The writer recognizes a similar limitation in junior programmers and does not see it as an inherent impossibility for generative AI. Their hypothesis is that generative AI could do engineering with a different focus, whereas its current focus is on coding; this is an interpretation, not a verified claim about model training or a demonstrated prompting fix.

The concrete example is an interactive tutorial. The writer asked Codex to implement a sequence of behaviors: when the player clicks here, show the next action. Codex could readily make that sequence work, distributing the logic across objects that matched the individual functions. But the scattered logic made the overall behavior difficult to understand and the code less flexible.

The concrete test of flexibility was creating a second tutorial. The writer wants to switch tutorials by replacing a single object. With the tutorial logic scattered across functional objects, the existing structure does not offer that conceptual unit of replacement.

There are two reasonable pressures: put behavior in the functional areas where it belongs, and represent a tutorial as one replaceable concept. The writer sees the conflict between these pressures as the place where engineering comes in: “Engineering is about transforming something so it works in multiple ways simultaneously.” The emerging argument concerns a structure that serves both needs together.

For the eventual journal, focus on the structural problem and transformation. The writer is developing the implementation and the writing together; the conversation's timing should not become a claim that the work is unfinished when the journal is written.

Keep the technical detail at the level needed to explain the change in thinking. The writer considers a deeper investigation of how the interception point was discovered too far into implementation details for this entry.

The underlying premise is that code should usually map to the writer's thought process. This is a preference with exceptions: scale or efficiency can justify a less intuitive structure. The writer sees abstractions as how people hold complex systems in mind, understand connections, and separate concerns.

Ordinary layering supports that mental model by separating responsibilities such as UI drawing and network communication. A networking problem can then be investigated within a focused area without also reasoning about UI code. In the writer's experience, poor separation makes systems scattered and fragile, allows changes in one area to break another, and contributes to duplication and maintenance difficulty.

The tutorial introduces a different organizing need. It deliberately changes normal game flow to provide a teaching script. In Allies, combat should have repeatable, known outcomes instead of normal randomized results, because subsequent tutorial steps depend on those outcomes. The tutorial must also restrict accepted interactions so players can explore by clicking without breaking the teaching sequence. These requirements span functional areas but belong together conceptually as the tutorial. The structure must accommodate that relationship alongside the usual separation of responsibilities.

The construction chain makes the responsibility problem concrete: ViewModel creates a Client, and Client manages the flow. The writer observes Codex working within that existing structure, placing tutorial creation in Client. Creating a Tutorial1 object alone does not solve substitutability if Client still determines which tutorial is created. A second tutorial then prompts a local question about passing the tutorial choice through the call chain so Client can create either one.

The writer identifies the engineering question as examining construction and ownership: who should be responsible for the tutorial, and how can that responsibility move to support interchangeable tutorials while preserving the existing production chain? This is a distinction between fitting another behavior into the current structure and reconsidering responsibilities within that structure.

The turning point came from examining the flow and finding a simple interception point. The writer reports that Tutorial can now look at every call and decide what to do. Client therefore does not need a large amount of tutorial-management code. The existing Client can be extended to provide the intercept, avoiding duplication into a new Client. This supplies a concrete example of the desired structural change: tutorial decisions belong with Tutorial, while the existing Client remains reusable. The exact interception mechanism and call scope have not been described.

The writer is skeptical that a better user prompt alone would produce the missing engineering judgment. Their educated guess is that coding agents operate within a complex set of prompts and accumulated conversation that can keep pulling the work toward coding within the existing structure. Steering toward engineering may feel like working against that direction. This is an opinion grounded in how their conversations play out; it does not require confirmation of the agent's internal implementation. Preserve that uncertainty rather than converting it into either a factual claim about hidden prompts or advice to solve the problem with a better prompt.

## Evolution

### 2026-10-08

- Opened the concept conversation: “Looking at creating a blog about engineering vs coding.”
- No thesis or outline has been chosen yet.
- The writer grounded the distinction in implementing an interactive tutorial with Codex. Requests described behaviors in sequence, and the resulting code worked, but its logic was scattered across functionally matching objects.
- The writer identified understandability and flexibility as problems with that structure, and described engineering as structuring code around concepts rather than merely organizing it.
- Creating a second tutorial exposed the specific flexibility problem. The desired change is to replace a single object to switch tutorials.
- The writer acknowledged the logic of both distributing code into functional areas and representing a tutorial as a replaceable object. Their conflict is central to the emerging idea of engineering.
- The writer proposed a broader formulation: engineering transforms something so it works in multiple ways simultaneously. No implementation of that transformation has been described yet.
- Editorial direction: do not frame the eventual journal as mid-progress based on the timing of this conversation. The writer expects the work to be complete when the journal is written.
- The writer connected the argument to a longstanding premise: code should usually map to the thought process, while allowing exceptions for scale or efficiency. Abstractions make complexity manageable and help reveal connections and separate concerns.
- UI and network layers provide the ordinary example of separating responsibilities to focus understanding and maintenance.
- The tutorial adds a different organizational requirement: its teaching script spans responsibilities and intentionally changes normal behavior. In Allies this includes repeatable combat outcomes and restricted interactions that preserve tutorial flow.
- The writer supplied the construction chain: ViewModel creates Client, which manages flow. Codex follows that existing structure by having Client create the tutorial. Adding a Tutorial1 object leaves the question of how to select and substitute tutorials through that chain.
- The distinction sharpened from conceptual organization to construction and responsibility: engineering asks how tutorial responsibility can shift while preserving the production chain, rather than only how to pass a choice through the current calls.
- After examining the flow, the writer found a simple interception point. Tutorial can look at every call and decide what to do, removing the need for extensive tutorial management in Client.
- The existing Client can be extended to provide that intercept, avoiding the need to duplicate its code into a new Client. The structural solution emerged from understanding the flow, rather than continuing to wire tutorial management into Client according to the original design.
- The writer set an editorial boundary: further exploration of the interception mechanics would be too much in the weeds. The journal should focus on the experience and structural lesson already captured.
- The writer recalled an article connecting Linus Torvalds's move away from coding with engineering. Research found a likely article and a reported quote about his role as a development lead. Keep the article's interpretation distinct from Torvalds's own wording; the exact remembered article is not confirmed.
- The writer questioned whether the Torvalds quote fits. The preferred direction is to connect to the broader discussion of generative AI code quality and articulate their own distinction: the code is good, but the engineering is lacking.
- The writer corrected an overly collaborative attribution of the breakthrough: Codex offered suggestions and helped explore the code, but struggled despite substantial guidance. The writer found the structural solution; Codex did not make that leap.
- The writer sees a parallel with junior programmers and believes engineering may be possible for generative AI with a different focus. The critique concerns the current emphasis on coding, rather than an assertion that AI is inherently incapable of engineering.

- Further clarification: the writer doubts that a better prompt alone will resolve the engineering gap. They suspect the agent's surrounding instructions and accumulated conversation influence its direction. They explicitly want this treated as an educated opinion drawn from experience, without an investigation to confirm internal mechanisms.
- The writer authorized a first journal draft. Created `Engineering vs Coding.md` with the working title `Journal 04: Engineering vs Coding`, following the existing journal sequence through 03. The narrative boundary is the working first tutorial, the second tutorial exposing the structure, the writer finding the intercept, and the resulting distinction between competent code and engineering judgment. Omitted the Torvalds quotation and kept the agent-prompt explanation explicitly speculative. This is a private draft, not a published post.

- Narrative correction: the writer rejected an argument-first outline and clarified that the purpose is to communicate their discovery. The intercept came after the engineering-versus-coding framing and provided grounding for it.
- Starting-condition correction: the writer was pleased with AI-assisted work. They noticed strange patterns and expected questioning to lead to evolution of the idea, but experienced Codex defending the implementation instead. This interaction is part of what led them to distinguish coding from engineering.

- The writer described the next stage of discovery: trying to understand why Codex was not getting the concern. Explicit requests to critique designs helped, and comparing and contrasting designs showed promise, but the writer could not integrate that behavior into the normal flow.

- The writer rejected another procedural outline because it emphasized steps and knowledge over emotional experience. They identified the center as difficulty putting a finger on the difference between Codex's designs and their own, watching designs become overly complex under new features, and struggling to describe the gap when the generated code was amazing within a good supplied structure.

- The writer supplied an example before the tutorial: the structure behind the AI code. Even when descriptions used Goal and Plan, Codex translated them into actions rather than clean areas and concerns. Simple cases worked, but increasing complexity intertwined the behavior and the structure fell apart.
- The writer clarified that understanding and naming software-development abilities is the purpose, rather than changing Codex. They distinguished junior developers visibly struggling to exercise a weak engineering ability from Codex seeming not to attempt the same movement. The shoulder-muscle analogy expresses this felt difference without establishing an inherent capability limit.
- The writer identified the personal recognition behind the journal: despite familiarity with the title software development engineer, they had not really understood the engineering part. Focusing less on code has made visible where they spend more time on engineering.
- The writer corrected the assistant's overly conclusive framing. Their understanding is a work in progress and will remain so after the article is done. Preserve tentative recognition and live questions; do not turn the SDE connection or tutorial example into a final definition of engineering. This clarifies, rather than reverses, the earlier preference about not portraying the implementation as unfinished.
- The writer refined the epistemic framing: understanding can develop over decades, and these are educated working theories with some predictive value, not definitive conclusions. They rejected adding a separate account of where they remain unsure.
- The writer approved centering the concrete example on real gameplay coexisting with scripted teaching, rather than simply adding a tutorial. The contrast between random combat and predictable teaching outcomes, and between player interaction and preserving the teaching sequence, is what makes the structural problem interesting.
- The writer asked to scrap the original draft and start again with the developed arc. Replaced the draft with the experience of being pleased with the code yet struggling to name a structural difference; the earlier Goal and Plan example; design conversations and the junior-developer comparison; engineering as useful language; and real gameplay coexisting with scripted teaching as grounding. Kept the writer's role in finding the intercept clear. Omitted agent-internals speculation so the focus stays on understanding software-development work rather than changing Codex.

## Source material

- Starting phrase: “engineering vs coding.”
- “I had always heard the term software development engineer SDE, but I never really understood the engineering part.”
- “Now that I'm focusing less on the code I see where I'm spending more time on the engineering side.”
- “Even though I used terms like Goal and Plan, Codex was just translating it into actions that need to be done.”
- “This is fine on simple things, but as things get more complex everything intertwines and things fall apart”
- “I was struggling to put my finger on the difference between Codex and my Designs”
- “I was finding the codex design would break down as I started to push new features on the old design.”
- “When I provided good design/architectual structure the code it produced was amazing.”
- “I was struggling to figure out the narrative around GenAI code and where it lacks”
- “I have been pleased with the AI assisted work, but kept finding strange patterns.”
- “when pushed I normally see morphing of the idea. Trying to find the reason it wasn't working. Codex jumps into defending.”
- “The house is standing, but engineering would figure out how to improve”
- “writing code to get something to work and organizing the code around concepts.”
- “it is more that just organization. It is about the structure.”
- Tutorial request pattern: “Do this when the player clicks here show this next action.”
- Codex separated the tutorial logic across many objects that matched functionally. The writer found that this scattered structure made the behavior harder to understand and the code less flexible.
- “The engineer would like to have a single object to replace to switch tutorials.”
- “if you are just coding in makes logical sense to put code in functional areas.”
- “Engineering is about transforming something so it works in multiple ways simultaneously”
- “code should map to your thought process.”
- “Our minds naturally create abstractions so that it can hold many concepts in the mind at the same time.”
- Layering example: keep UI drawing and network communication separate so a networking investigation can stay focused; tangled responsibilities make changes fragile and maintenance harder.
- Allies tutorial: replace normal randomized combat with repeatable actions whose known results can support the next teaching step.
- Allies tutorial: prevent unwanted clicks and accept only certain interactions, allowing exploration without breaking tutorial flow.
- “This takes a different kind of organization.”
- “Codex uses the existing structure and just figures out how to make the code work.”
- Construction example: ViewModel → Client; Client manages flow and creates the tutorial. Supporting another tutorial raises the question of passing the choice through the call chain.
- “Engineering looks at how the code is constructed who has what responsiblity.”
- “How can we shift the responibility for tutorial to get what we want without breaking the chain that exists for production.”
- “after looking at the flow there was a point where we could find a simple intercept.”
- “Tutorial now just gets to look at every call and decide what to do.”
- “we don't need to duplicate code into a new Client we can just extend the existing to provide the intercept”
- “the code is good, but the engineering is lacking”
- “it was a lot more hand holding and me finding the solution.”
- “Codex and I worked together through the code, but in the end it wasn't able to make the leap.”
- “This isn't uncommon with junior programmers either.”
- “I think it would be possible to get GenAi to do engineering, but it would require a different focus where right now the focus is on coding.”

## Potential external reference

- Likely remembered article: Noah Byteforge, July 10, 2026, [Linus Torvalds Said the Quiet Part Out Loud About AI and Code Quality. The Engineering Community Is Not Ready for It.](https://levelup.gitconnected.com/linus-torvalds-said-the-quiet-part-out-loud-about-ai-and-code-quality-934b2d4be398). Only the public opening was accessible; it connects his changing role to engineering.
- Reported quote: “I hardly read code at all anymore. I'm not a programmer, I'm a development lead.” Reproduced in [coverage citing ZDNET](https://www.miamammausalinux.org/2026/07/ma-oggi-linus-torvalds-quali-strumenti-usa-per-sviluppare-soprattutto-e-ancora-uno-sviluppatore/), concerning Open Source Summit India 2026. [Original ZDNET report](https://www.zdnet.com/article/open-source-summit-linus-torvalds/) could not be opened directly during this search. This is a reported quotation, not independently checked against a recording.
- Context: the same coverage says he still sends occasional patches as suggestions to maintainers. Avoid turning this into a literal claim that he never writes code, or attributing a formal coding-versus-engineering definition to him.
- Primary interview corroborating the broader role change: [Linux Journal, 25 Years Later: Interview with Linus Torvalds](https://www.linuxjournal.com/content/25-years-later-interview-linus-torvalds). Torvalds describes writing little code and acting more as a technical lead. This predates the recent article.
- The writer now questions the quote's fit and favors discussing generative AI code quality through their own distinction between working code and engineering. Retain these references as background; do not assume the quote belongs in the journal.

## Threads to revisit

- What structural decisions allow the system to support multiple tutorials, and why do they work?
- How can functional objects retain their responsibilities while a tutorial becomes a single replaceable concept?
- How does the writer distinguish conceptual structure from merely moving code into different files or objects?
- How does the teaching script express combat outcomes and allowed interactions while preserving the responsibilities of the systems carrying them out?
- Where should tutorial selection, creation, and execution each belong, and how does that arrangement preserve normal production flow?
