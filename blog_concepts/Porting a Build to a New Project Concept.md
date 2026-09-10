# Porting a Build to a New Project

## Current understanding

A friend wanted a new project that mimicked what I was doing in the Allies architecture. I expected that bringing over some proven pieces from Allies—specifically the deploy and release scripts—would give Codex a concrete starting point for recreating the build in the new project.

Instead, Codex looked at the scripts and created its own version of the system. It made massive changes rather than preserving the known structure, identifying the project-specific gaps, and asking me to supply the missing information. The result did not feel like a port. Codex treated the old implementation as inspiration for a rewrite.

The first concrete failure involved connecting each client release to its API URL. Every deployment creates a new API endpoint. The deploy script first deploys the SAM template, retrieves the new URL, writes a `release.json` file, and invokes a Gradle task that generates application configuration for the release. I copied the deploy script but did not copy the Gradle task it called.

That missing task should have made the incomplete context visible. Codex could see a script invoking a build step whose implementation was absent, but it did not stop and ask for it. Although I had said to use the existing scripts as a base, Codex filled the gap with its own implementation based on familiar patterns.

Its replacement was a `config.json` file that the application would retrieve through a URL. This was not merely a solution that would have failed on iOS or Android. It failed in the web application itself. Codex had already implemented part of the Compose architecture, then inserted a conventional web configuration mechanism that was incompatible with both that architecture and the existing deployment process. The file was not found at runtime.

My friend only wanted a website, and Codex appears to have used that fact to justify the familiar web pattern. But the problem was not that the project needed to preserve hypothetical native clients. The web application was still being built with the Compose architecture Codex had begun to port. Codex mixed two incompatible approaches inside one implementation, even though the deploy script showed the intended ordering of the release process.

I also did not fully understand the existing release model, so I could not give Codex a clear picture of the entire process at the outset. That is part of the story rather than merely a prompting mistake. One reason to give a porting task to a collaborator is to use the existing implementation to discover the system together. I would expect a human encountering a referenced but missing Gradle task to ask for it. Codex instead made the uncertainty disappear from view by generating something plausible.

This may expose an important difference between building something new and porting an existing design. In a port, unexplained values, missing dependencies, and assumptions tied to the original project are not invitations to invent replacements. They are evidence that the agent has not yet recovered enough of the source system to reproduce it faithfully. The first useful output may need to be an inventory of what transfers unchanged, what must be adapted, and what cannot be known without asking.

The work is still in progress. I think the current version is close to working, but I am considering restarting—not merely to obtain a working build, but to discover a better repeatable process for this kind of migration. A successful restart could compare two approaches: repairing a rewrite that drifted early, and beginning again with an explicit preservation-and-discovery phase.

It is too early to claim that restarting is the right answer or that the ideal process is known. The immediate story is that Codex failed to recognize the nature of the task. It responded to incomplete context with confident implementation instead of questions.

The emerging problem is therefore not simply that I failed to provide enough context or that Codex chose the wrong implementation. I did not know which context was essential, and Codex did not help expose that. A better porting process may need to make unresolved references and missing source material explicit before either participant is expected to understand the architecture.

I discovered the incoherence by asking Codex about the design. Codex did not apply further patches; it offered design suggestions. Those suggestions made its assumptions visible and showed that the replacement mechanism did not make architectural sense. This echoes the earlier experience behind *Designing the Pipeline Codex Couldn’t*: generating an implementation did not mean Codex had formed a coherent design. That connection is useful context, but it should not become the center of this post. This post is about designing a porting process that makes Codex expose missing pieces and ask questions before it invents replacements.

## Evolution

### 2026-08-20

- A friend asked for a project that mimicked the Allies architecture.
- I began by copying parts of the existing project into the new one, specifically the deploy and release scripts.
- I expected Codex to use those scripts as the basis for porting the existing build and release design.
- Codex instead created its own version and made massive changes.
- It did not stop to identify or ask about missing pieces.
- I think the resulting build is close to working, but I may restart so I can find a better process rather than merely finish this attempt.
- The emerging distinction is between using an old project as loose reference material and faithfully porting its design into a new project.
- No final lesson has been established yet; this remains an account of a failed first approach and a possible second attempt.
- The first concrete divergence involved the process that connects a newly deployed API endpoint to its corresponding application release.
- Each release creates a new endpoint by deploying a SAM template.
- The deploy script retrieves that URL, creates `release.json`, and calls a Gradle task that generates application configuration.
- I copied the deploy script but did not include the Gradle task that it referenced.
- Codex did not identify the absent task as missing source material or ask me to provide it. It created its own mechanism instead.
- I had told Codex to use the copied implementation as a base, but it still jumped toward patterns it already knew.
- I did not fully understand the original release model and therefore could not explain the complete design clearly at the beginning.
- The expected value of collaboration was partly discovery: a human given the same incomplete source would likely ask about the visibly missing task.
- A more precise concern emerged: Codex can hide a shared gap in understanding by replacing the unknown piece with a plausible implementation.
- Codex replaced the absent Gradle-generated configuration with a `config.json` file fetched through a URL.
- The file could not be found because the web-file mechanism did not fit the existing Compose application architecture.
- The failure was present in the web build itself, not only in hypothetical iOS or Android clients.
- Codex had implemented part of the Compose architecture, then substituted a conventional web architecture for the missing configuration step.
- The two approaches were incompatible, and the replacement also did not work with the existing deployment process.
- The deploy script showed the intended order of operations, but Codex still decided its web configuration pattern was preferable.
- I saw the architectural mistake when I asked Codex for the design and its suggestions exposed the assumptions behind the implementation.
- Codex did not apply additional patches during that exchange; the suggestions themselves revealed the problem.
- This repeats the architectural weakness described in the previous pipeline post, but the new post should use that only as context.
- The center of this post is how to make Codex identify missing pieces and ask questions during a port.

## Source material

### Initial account

> Porting a build to a new project is the topic of the next blog.
>
> A friend wanted me to create a project that mimicked what I was doing in the Allies architecture. When I tried to run through the process, Codex failed miserably.
>
> I started by copying some pieces of the old project over, specifically the deploy and release scripts. Codex looked at them, created its own version, and made massive changes. It didn't stop and ask me to fill in missing pieces. I think I'm close to making it work, but I might want to restart to figure out the best process.

### Emerging tensions

- Finishing the nearly working implementation versus restarting to learn a reproducible process.
- Giving Codex room to adapt the scripts versus requiring it to preserve the source design.
- A result that eventually works versus a migration process that remains understandable and trustworthy.
- Codex's ability to generate a plausible system versus its ability to recognize missing context.
- My responsibility to provide a clear architectural picture versus Codex's responsibility to surface references it cannot resolve.
- Treating the copied scripts as specifications versus treating them as examples of intent.
- Making rapid progress with a familiar pattern versus preserving visible uncertainty until the original mechanism is understood.
- Finishing a nearly working port versus restarting with a process that requires questions before substitutions.
- Using a design explanation to discover what Codex already assumed versus requiring that explanation before implementation.

### The missing Gradle task

The original release path was approximately:

```text
deploy SAM template
        ↓
retrieve the release's new API URL
        ↓
write release.json
        ↓
invoke a Gradle task
        ↓
generate application configuration for the release
```

The copied deploy script included the invocation, but the Gradle task itself was not copied into the new project. Codex therefore had a concrete unresolved reference in front of it. Rather than report that the port was incomplete and ask for the task, it designed a replacement.

The replacement wrote `config.json` and made the application retrieve it through a URL. That was a familiar web pattern, but Codex had already implemented part of the Compose architecture. The new mechanism did not connect to that architecture or to the release layout established by the deploy script, so the file was not found even in the web application.

This was not a choice between supporting a website and supporting iOS or Android. The website itself used the Compose architecture. Codex inserted a second, incompatible architectural pattern when it reached the missing Gradle task. The fact that the requested product was a website seems to have made that substitution feel reasonable to Codex, despite the architecture and deployment order already visible in the copied material.

After the failure, I asked Codex about the design. It offered suggestions rather than making further changes. Those suggestions exposed the bad assumption: the implementation was not an incomplete version of the original release architecture but a mixture of that architecture and a conventional web configuration pattern. Asking for the design was how I recognized that Codex was doing something architecturally unsound.

I did not initially recognize the significance of that task because I did not fully understand how the old release model connected its pieces. The failure was not that Codex lacked a perfect initial explanation. The process failed to turn an incomplete explanation and incomplete source into useful questions.

### Possible phrases

- Codex treated the old implementation as inspiration for a rewrite.
- It responded to missing context with implementation instead of questions.
- A port begins by recovering constraints, not replacing them.
- Working eventually is not the same as being ported faithfully.
- The missing pieces were questions, not opportunities for invention.
- I may need to restart to learn the process, not just to fix the build.
- Codex made the gap in our understanding disappear by putting code in it.
- I could not explain the missing piece because I did not yet know it was the important piece.
- The first job of the port was to discover the existing system.
- An unresolved build reference should become a question, not a design decision.
- Codex implemented half of one architecture and filled the gap with another.
- Fixing the URL would not fix the architectural mistake.
- A locally reasonable web pattern can still be the wrong port.
- Explaining the proposed design can expose assumptions that are difficult to see in the generated code.
- The question is not how to prompt Codex to design better; it is how to make uncertainty trigger questions before design begins.

## Threads to revisit

- What exactly was the new project meant to share with Allies: architecture, build tooling, deployment topology, release behavior, or all of them?
- What files or systems accompanied the copied deploy and release scripts?
- Where did Codex write `config.json`, which URL did the application request, and why did the existing deployment layout prevent that URL from resolving?
- What exact Gradle command appeared in the deploy script, and what evidence showed that its task definition was absent?
- Should Codex have stopped at the first unresolved command, or completed an inventory of all unresolved references before asking questions?
- Did the initial prompt explicitly say to preserve the scripts, or did that expectation remain implicit?
- Did Codex explain why it believed the massive changes were necessary?
- Is the nearly working result structurally wrong, or mainly difficult to trust because its relationship to Allies is unclear?
- What would the restart process look like?
- Could the first step be a source-to-target migration map with categories such as preserve, parameterize, replace, and unknown?
- Should the agent be prohibited from implementation until every unknown that affects architecture has been resolved?
- Would it help to port one working path end to end before generalizing the rest?
- How will the two attempts be compared: amount of rework, correctness, similarity to Allies, number of assumptions, or ease of explanation?
- Is this post primarily about porting builds, about teaching Codex when to ask questions, or about the danger of allowing implementation before discovery?
- How much of the original model became clear only after inspecting the missing Gradle task?
- Would a human necessarily have asked for the missing file, or is the more defensible claim that the missing reference would have remained visible in a human collaboration?
- Is the key failure premature implementation, or the loss of information about what remained unknown?
- What instruction or checkpoint would make Codex report every unresolved reference before changing code?
- Should the restart begin with Codex explaining the release sequence back to me and labeling every step as found, inferred, or missing?
- Should Codex be required to explain the intended design before implementation so its assumptions can be corrected earlier?
- What is the smallest amount of the previous architecture-design story needed to explain why question-asking matters here without repeating the earlier post?
