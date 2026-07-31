# Blog Concepts

This directory is a thinking space for blog ideas. It is where ideas can be explored while they are still incomplete, contradictory, or changing.

The conversation is the workspace. The documents in this directory are the memory.

## Types of writing

There are two broad kinds of posts:

- **Insights** are retrospectives about lessons learned while working with AI. They describe what changed in my understanding, why it matters, and what someone else might reuse.
- **Journal entries** are written closer to the work in progress. They preserve mistakes, uncertainty, experiments, and the way a system evolves over time.

An idea does not need to be classified immediately. A journal conversation may eventually produce an insight, and a single insight may emerge from several journal entries.

## One conversation per idea

Each idea gets its own Codex task. The task should feel like a natural, stream-of-consciousness conversation—not like filling out a template.

A new conversation can begin with something as simple as:

> I'm processing an idea about why agents need visible failure states. Treat this as a concept conversation and keep its document updated.

During the conversation, Codex should:

- Let the idea wander before trying to organize it.
- Ask lightweight questions that uncover concrete moments, motivations, mistakes, surprises, tensions, and changes in belief.
- Avoid forcing an outline or deciding too early what kind of post the idea will become.
- Reflect emerging themes and contradictions when that would help the thinking.
- Maintain an evolving Markdown document for the idea in this directory.
- Move toward an outline or polished draft only when explicitly asked.

The writer should not need to maintain the document or interact with its structure unless they want to.

## The concept document

Each conversation should maintain one Markdown document with two complementary forms of memory:

Name the document after its Codex task and append ` Concept`. For example, a task named `Figma to AppState` uses `Figma to AppState Concept.md`. The task name may later become the working blog title, while the suffix keeps the internal concept document distinct from a future draft.

1. **Current understanding** is a clean synthesis of what I seem to believe now. It can be revised as the idea develops.
2. **Evolution** is an append-only record of meaningful changes in thought. Earlier beliefs should remain visible rather than being silently rewritten.

The document may also collect:

- Stories and concrete examples
- Mistakes and failed approaches
- Useful phrases in my own language
- Technical details
- Open questions
- Contradictions or tensions
- Threads worth revisiting

Not every conversational remark needs to become prose. Codex should extract what is meaningful, preserve uncertainty, and avoid making an unsettled thought sound more certain than it is.

A useful background structure is:

```md
# Working title

## Current understanding

An evolving synthesis of what I currently believe.

## Evolution

### YYYY-MM-DD

- What I initially thought
- What prompted the idea
- What changed
- Why it changed

## Source material

Stories, examples, phrases, mistakes, and technical details.

## Threads to revisit

Questions and unresolved tensions worth returning to.
```

This is an internal memory structure, not a form the writer must complete.

## Useful prompts during a concept conversation

- What do I seem to believe so far?
- How has my thinking changed?
- What contradictions do you notice?
- What feels unresolved?
- Show me the concept document.
- Is this becoming an insight or a journal entry?
- Turn this into an outline.
- Turn this into a draft.

## From concept to journal post

Turning a concept into a journal post should remain conversational and iterative. The following stages guide the work; they are not a form the writer must complete.

### 1. Find the post's center

Ask what experience or change this particular post is actually about. Choose one central movement rather than a broad subject.

Other themes may remain as supporting material, become separate concepts, or wait until they are better understood.

### 2. Separate competing posts

Review the concept for ideas that pull attention away from its center. Classify each one according to its role:

- **Supports this post:** Keep it in the narrative.
- **Useful context:** Mention it briefly.
- **Distinct argument or journey:** Start a new concept document and record where the idea originated.
- **Interesting but premature:** Preserve it as a thread to revisit.

The original concept document remains intact as source material. Splitting an idea into a new concept does not require erasing it from the history in which it appeared.

### 3. Define the journal boundary

Decide where this entry begins and ends. A journal post does not need to explain an entire project. It should capture one meaningful period of change, including a starting condition, a turning point, and an honest current stopping point.

The stopping point does not need to be a final answer.

### 4. Recover the lived experience

Codex should ask one or two focused questions at a time. Questions should recover events and experience rather than ask the writer to produce polished prose. Useful areas include:

- The concrete event that made the old approach feel wrong
- What the writer expected to happen
- What happened instead
- Failed attempts and confusing moments
- The moment the problem was understood differently
- What changed in the system or the writer's thinking
- What remains uncertain

Answers should be incorporated into the evolving concept document.

### 5. Create a story map

Before drafting, Codex should propose a short narrative map. A common shape is:

```text
Situation
What I expected
What became uncomfortable
What I tried
What changed my understanding
How the work changed
Where things stand now
What I am watching next
```

The map should be checked for factual accuracy and accidental hindsight. It should not make the journey appear cleaner or more inevitable than it was.

### 6. Create a separate draft

Once the story map feels true, create a separate Markdown file for the blog draft. The concept document remains the evolving source of truth and should not be converted into the draft itself.

The first draft should prioritize:

- The writer's voice
- A comprehensible chronology
- Concrete moments
- Honest uncertainty and mistakes
- Enough technical context to understand the stakes
- A truthful stopping point rather than a manufactured conclusion

### 7. Review in focused passes

Reviewing one concern at a time keeps revision manageable:

1. **Truth:** Is this what happened?
2. **Theme:** Does each section serve the central movement?
3. **Reader:** Is enough context provided?
4. **Voice:** Does it sound like the writer?
5. **Technical accuracy:** Are the details and terminology correct?
6. **Editing:** Can the structure, repetition, and wording be tightened?

### 8. Feed discoveries back into the concept space

After the draft stabilizes:

- Update the concept's current understanding.
- Record the drafting or publication boundary in its evolution.
- Create concept documents for substantial ideas separated during editing.
- Preserve unresolved questions for later journal entries.
- Record any retrospective insight beginning to emerge.

The overall lifecycle is:

> Conversation → find the center → separate adjacent ideas → recover missing experience → map the journey → draft → review → return discoveries to the concept space

## Publishing model

Published posts live in `src/content/blog/`. The concept documents in this directory remain private working memory and should not be treated as publishable drafts.

Use one publishing pipeline for both insights and journals. The distinction should be carried by metadata, title conventions, writing style, and image style rather than by creating separate content systems too early.

### Insights

Insights are polished reflections. They should read like a completed lesson, argument, or retrospective.

An insight usually has:

- A clear claim or lesson
- Enough context for someone else to understand why it matters
- A retrospective shape: what I believed, what changed, and what I now think
- A more finished conclusion, even if the topic remains open
- A detailed, eye-catching hero image

Insights can emerge from one concept conversation or from patterns noticed across multiple journal entries.

### Journals

Journals are field notes from work in progress. They should be more direct, chronological, and grounded in the current state of the project.

A journal usually has:

- A specific moment, experiment, or development period
- Concrete details about what happened
- Mistakes, uncertainty, and unresolved questions
- A truthful stopping point rather than a forced conclusion
- A quieter, more restrained hero image

Journals do not need to prove a broad lesson. Their purpose is to preserve the path of the work while it is still unfolding.

### Journal naming

Use a simple numbered title:

```text
Journal 01: Figma to AppState
Journal 02: Short descriptive title
```

Use a matching slug:

```text
journal-01-figma-to-appstate
journal-02-short-descriptive-title
```

The number should make journals feel like a continuing public log. Avoid creating a complex series system unless the publishing volume makes it necessary.

### Hero image direction

Insights and journals should be visually distinct.

**Insight images** should feel like feature artwork:

- Detailed
- High contrast
- Eye-catching
- Conceptual or metaphorical
- Suitable as the main visual for a polished essay

**Journal images** should feel like technical field notes:

- Muted and lower contrast
- Minimal or lightly textured
- More negative space
- Process-oriented rather than dramatic
- Built from wireframes, diagrams, grids, notes, traces, or small interface fragments
- Restrained accent color instead of a full cinematic palette

A useful journal image prompt shape is:

```text
Minimal editorial blog hero image, muted neutral background, subtle notebook-grid texture, abstract wireframe fragments representing [topic], thin monoline strokes, small restrained accent color, calm technical field-notes aesthetic, lots of negative space, no people, no photorealism, no glossy 3D, no dramatic lighting
```

### Journal hero image workflow

Journal posts use one low-maintenance image format rather than separate artwork for the website and each social platform.

- Use a 1200×1200 square image as the canonical journal hero.
- Use the same image on the blog list, article page, and in social metadata. A good-enough shared result is preferable to maintaining platform-specific variants.
- Keep the important title and diagram content inset from every edge so external previews can crop or reframe the image without losing its meaning.
- Publish a compressed JPEG. Quality 82 is the current baseline; it preserves the pencil and grid texture while reducing file size substantially.

The reusable visual system is a slightly askew spiral notebook with pale grid paper and a pencil-sketch field-notes aesthetic. Its stable elements are:

- Spiral binding, notebook angle, page framing, and muted palette
- A small architectural pencil supertitle, such as `JOURNAL 01`, with a thin underline
- A larger hand-printed pencil article title with no underline
- A post-specific technical note, wireframe, or flow diagram
- One restrained faded-amber accent

Use `Journal Hero Master.png` as the permanent lossless ImageGen reference for every new journal. Always return to this original master rather than using the previous journal image as the next reference; otherwise small changes will accumulate across the series.

For each journal:

1. Provide `Journal Hero Master.png` to ImageGen as the reference image.
2. Preserve the notebook, composition, materials, typography positions, and accent treatment.
3. Change only the journal number, article title, and post-specific page diagram.
4. Check the generated number and title carefully; generated text is the most likely element to fail.
5. Normalize the selected image to 1200×1200.
6. Export a quality-82 JPEG named for the post, while leaving `Journal Hero Master.png` unchanged.

Create a blank compositing template only if repeated ImageGen edits fail to preserve the journal identity. The current default favors the simpler one-reference workflow.

### Publishing frontmatter

Published posts should use the existing Astro blog collection in `src/content/blog/`.

Use `draft: true` until the post is ready to publish.

For insights:

```md
---
title: "Vibe Coding Has a Budget Problem"
description: "A short summary of the post."
pubDate: 2026-05-27
heroImage: "/blog/vibe-coding-has-a-budget-problem.jpg"
tags: ["ai", "software-development"]
type: "insight"
draft: true
---
```

For journals:

```md
---
title: "Journal 01: Figma to AppState"
description: "A short summary of the current development log."
pubDate: 2026-07-31
heroImage: "/blog/journal-01-figma-to-appstate.jpg"
tags: ["figma", "appstate", "ai", "software-development"]
type: "journal"
journalNumber: 1
draft: true
---
```

If the site schema does not yet support these fields, update `src/content/config.ts` before publishing posts that use them.

## This task

The Codex task that established this process is the meta conversation for improving it. Use that task to discuss what is working, what creates friction, and how the capture and refinement workflow should evolve.

Individual blog ideas should be explored in their own tasks.

## Guiding principle

Structure should emerge behind the conversation rather than stand between the writer and the thought.
