# Ask, Don't Tell

## Current understanding

This journal is becoming an account of how my way of working with Codex changed over time. I did not begin with a theory about process-shaped instructions. I arrived there through a sequence of approaches that each worked for a while and then exposed a new problem.

I began with prompts. I tried to make them explicit enough to produce the result I intended. This led to what I call the “evil genie problem”: no matter how carefully I stated the request, Codex could find an interpretation that satisfied the words while violating the intent. Making the prompt more exact did not remove interpretation. It often created a more elaborate wish for the genie to grant incorrectly.

I then moved from prompts toward conversations. Instead of trying to specify the whole result in advance, I worked through the problem with Codex. A conversation would eventually begin to flow. We would take several steps, correct misunderstandings, establish what mattered, and settle into a way of working together. Once that flow developed, the results could be excellent.

The difficulty appeared when I started a new conversation. I found myself repeating the same expectations and recreating the same working relationship. The previous conversation had developed an effective process, but almost none of that process survived the boundary between conversations.

Instructions were my attempt to carry what I had learned from one conversation into the next. They seemed to work, although it is difficult to isolate why. A fresh conversation could begin with expectations that previously had to be established interactively. But over time the instructions accumulated as rules: do this, do not do that, preserve this, check that. Their effectiveness degraded in a way that resembled the degradation of prompts. Codex could follow an individual rule while missing the larger intent, and each failure encouraged another rule. The growing document still did not reproduce the quality of the mature conversation.

“Boring code” became a revealing example. Codex regularly preferred fancy code over straightforward code. It behaved like a junior developer who had read about a sophisticated technique for making a large codebase better, then introduced it into a small area where it doubled the code and complexity for very little gain. My preference was to begin with the simple solution and introduce additional machinery only when real complexity made it necessary.

After many conversations, Codex began telling me that I wanted boring code. I found the phrase funny, but it was exactly right. More importantly, Codex seemed able to correct itself around the idea of boring. The word carried more than a formatting preference or a prohibition against a particular pattern. It evoked a way of judging tradeoffs: familiar over clever, direct over abstract, and complexity introduced in response to an actual need rather than anticipated prestige.

When I tried to transfer that learning into formal instructions, the conversational quality was lost. At one point I noticed that “boring” itself was no longer present in the instructions. Adding it back improved the results. There was still drift, but it became easier to recognize and easier to correct because the shared phrase provided a direction to return to.

That is especially interesting because “boring” can sound dismissive or insulting when applied to engineering. My experience has taught me almost the opposite. Code that looks cool or sophisticated in the moment often creates worse long-term systems. Boring is good. The mildly provocative analogy may make the principle more memorable than a neutral list of rules about avoiding premature abstraction, minimizing complexity, and preferring established patterns.

The important difference may be that the long conversation did not succeed because it had eventually collected enough instructions. It succeeded because Codex and I had moved through a process together. The sequence of discussion, decisions, corrections, and next steps created a flow that helped Codex follow me. When I describe that process, I see fewer errors than when I specify a larger set of exact instructions.

This changes what I want an instruction file to preserve. I do not only want it to remember conclusions such as “never redesign a component when making a small edit.” I want it to recreate the way the work unfolds: how we begin, what Codex should notice, when it should respond, how intent is established, how the next step emerges, and what kind of collaboration continues from there.

I have started thinking of these instructions almost as conversation starters. They express what is expected, but they also initiate a mode of working. A useful instruction may place Codex at the beginning of the same flow that previously took a long conversation to discover.

Figma is the current experiment. I am trying to move the Figma instructions away from exact commands and toward a conversational flow with intent. I am asking Codex to help write them based on the successful conversations and the corrections we made along the way. Because Codex is writing them, the result still tends to sound like conventional instructions. Even so, it is becoming closer to a description of a process than a rulebook.

Since beginning that experiment, workflows have shown some improvement over the earlier rule-based instructions. Describing how the work should proceed appears to preserve intent better than accumulating exact rules. It has not eliminated drift, however, and the workflows themselves have not been exactly right. They have needed continued iteration.

I do not remember every iteration clearly enough to reconstruct a clean history of the workflow changes. That does not need to be repaired for this journal. The important current observation is that workflows were a meaningful improvement, but not a final form. The same pattern continues: an approach helps, its limitations become visible through use, and the process changes again.

A newer approach organized around Core Principles has begun to emerge. That likely belongs to another post. It can appear here as the next direction without requiring this journal to explain it. This entry can end with workflows as an imperfect improvement and Core Principles as the question that followed.

Because this is a journal, the post does not need to turn the experiment into evidence for a finished argument. The uncertainty, incomplete memory, and continuing drift belong in the entry. I know that prompts led me toward conversations, that conversations developed a flow I struggled to carry forward, that conventional instructions seemed to lose something important, and that workflows improved the situation without resolving it.

This idea overlaps with [Codex Instructions and Architectural READMEs Concept](./Codex%20Instructions%20and%20Architectural%20READMEs%20Concept.md), which records how Codex drifted away from explicit architectural rules and back toward familiar patterns. This concept is now centered more specifically on what the long conversation contains that a conventional instruction file does not, and whether that quality can be carried into the next conversation.

## Evolution

### 2026-08-25

- I began with the phrase “ask, don’t tell.”
- The observation came from comparing prompts that told Codex what to do with prompts that asked what it thought should be done.
- Direct instructions seemed to produce worse results, while questions led to better judgment and collaboration.
- I connected this conversational pattern to instruction files.
- Collections of rules appeared to lose their influence over time as Codex drifted toward its base training.
- Instructions became more effective when they explained a process rather than merely listing constraints.
- Dividing the process into phases improved adherence, even when the rules were not restated in every phase.
- A possible explanation emerged: both questions and phases interrupt immediate execution and require Codex to form or reveal an understanding before acting.
- This is being treated as a journal concept rather than a settled insight because the mechanism and limits are still uncertain.
- I named the recurring failure the “evil genie problem”: Codex can satisfy the explicit wording of a prompt while violating its intent.
- Asking Codex for a design may involve the same underlying decisions as implementation, but it exposes those decisions before they become changes.
- I began thinking of instructions as conversation starters that establish expectations and a way of working, rather than as a comprehensive rulebook.
- Some instructions emerged from corrective conversations after Codex had already made a mistake.
- In one Figma example, a request to round corners caused Codex to redesign the entire widget.
- The correction involved explaining why the expanded scope was wrong and collaboratively recovering the intended approach.
- A new problem appeared during retrospectives: Codex often said my prompt was good and took responsibility for failing to understand it.
- That response did not create durable improvement. A new conversation would not contain the correction and could repeat the same mistake.
- This made the inadequacy of the old instructions more visible: identifying fault is not the same as changing future behavior.
- The retrospective needs to produce a reusable instruction, checkpoint, or process change that can survive across conversations.
- I corrected the center of the concept: it is less about requiring Codex to explain a design before acting and more about reproducing the flow that develops during a long conversation.
- Mature conversations eventually produced excellent results because Codex and I had moved through a sequence of steps and developed a way of working together.
- New conversations lost that flow, forcing me to repeat expectations and corrections.
- Accumulating rules in the instruction file began to reproduce the evil genie problem found in individual prompts.
- The rules could become more explicit without capturing the intent or interaction that made the earlier conversation successful.
- I observed fewer errors when I described the process than when I prescribed exact behavior.
- The instruction file may need to function as a conversation starter that places Codex at the beginning of a productive flow.
- I am currently rewriting the Figma instructions in this direction with Codex's help.
- Because Codex is helping write them, they still sound more like instructions than conversation, but they are moving toward a flow organized around intent.
- This remains an experiment. The useful measure will be what happens in a fresh conversation, not how good the instructions sound in the conversation where they are written.
- I identified the chronological transition as the journal's narrative center.
- The progression began with increasingly explicit prompts and the evil genie problem.
- I moved from prompts to conversations, which produced better results once a shared flow developed.
- New conversations repeatedly lost that flow and reproduced earlier problems.
- Instructions were introduced to carry learning between conversations, and they initially worked.
- As the instructions accumulated rules, their effectiveness degraded in much the same way that increasingly exact prompts had degraded.
- The current transition is from rule-like instructions toward process-like instructions that try to recreate how a successful conversation unfolds.
- The post should stop with that experiment still underway rather than claiming that process-like instructions have solved the problem.
- I complicated the claim that instructions simply worked: they seemed to help, but it is difficult to distinguish the effect of the rules from the conversational ideas embedded in them.
- “Boring code” emerged across many conversations as shared shorthand for preferring straightforward code over clever or premature complexity.
- Codex's recurring failure resembled a junior developer applying a sophisticated large-codebase technique to a small problem, doubling the code for little gain.
- The intended principle was to start simply and introduce additional mechanisms when actual complexity required them.
- Codex began describing my preference back to me as “boring code,” and the phrase felt both funny and exactly correct.
- Codex appeared able to self-correct around “boring” because the word carried a broad engineering judgment rather than one narrow rule.
- Formalizing the idea into instructions weakened the conversational style that had helped keep Codex on track.
- When “boring” disappeared from the instructions, the old behavior returned more often; adding the word back improved results.
- Drift did not disappear, but the analogy made it easier to return to the intended direction.
- The phrase is productively provocative: although “boring” can sound insulting, experience has shown that cool and fancy code often ages badly, while boring code is good.
- I clarified the boundary of the piece as a journal rather than a results-driven retrospective.
- The post does not need to prove that process-like instructions work or collect enough examples to validate a general claim.
- The uncertainty about why earlier instructions seemed to work belongs in the journal rather than being resolved before drafting.
- The Figma instruction experiment can be the stopping point even before it produces results.
- A later entry can record what happened when the new instructions were used in fresh conversations.

### 2026-09-10

- After spending substantial time developing and using workflows, I found that they improved on instruction rules.
- Drift still occurs.
- The workflows themselves have not been exactly right and have required iteration.
- I am not sure I remember the individual iterations well enough to explain them accurately.
- The journal does not need a complete changelog of those iterations; the incomplete memory is part of the honest current account.
- The emerging conclusion is limited: workflows helped, but they did not solve the problem.
- I have begun a new process based on Core Principles.
- Core Principles likely represents the next stage and may deserve its own post rather than expanding the boundary of this one.
- This journal can mention Core Principles as the direction that emerged from the workflow limitations, then stop before explaining it.
- A separate first draft was created as `Ask, Don't Tell.md` with the working title `Journal 03: Ask, Don't Tell`.
- The draft follows the chronological transition from prompts, to conversations, to instructions, to workflows.
- “Boring code” provides the central concrete example of conversational shorthand carrying more intent than formalized rules.
- The draft does not reconstruct forgotten workflow iterations or claim that workflows solved drift.
- It ends with Core Principles as the emerging next direction and likely subject of a separate journal.

## Source material

### Initial account

> I would like to start a new journal about instructions and prompts. It is based on ask don't tell.
>
> Meaning that I have found that telling AI (Codex) what to do leads to far worse results than asking it what it thinks. This leads into the instructions side of the equation also. I found that if the instructions were a bunch of rules that AI would slowly drift away to its base training. The more that I explained a process that I would like it to do the better. By having different phases provided better adherence to rules even when the rules weren't there.

### Clarification of the center

> What I found over time is that my conversations would eventually get flow with great results. But I found myself repeating things between conversations. The changes to the instructions were feeling like the genie problem in prompts.
>
> It appears that the long conversation leads to a flow rather instructions. I find myself going through a process of steps and then Codex can flow me. I find that I have less errors when I describe the process rather than the instructions.
>
> I'm trying to move my Figma instructions to be more like conversation. I'm having it write it, so it is coming out more like instructions, but it is closer to a flow with intent than exact instructions, so we will see how that goes.

### Emerging distinctions

- A mature conversation versus a fresh conversation.
- Preserving isolated corrections versus preserving the flow that made the corrections meaningful.
- Rules that specify behavior versus a process that establishes a way of working.
- Exact instructions versus an expression of intent.
- Instructions as a reference document versus instructions as the beginning of a conversation.
- A document that sounds comprehensive versus one that helps a new conversation reach productive flow sooner.
- Having Codex write conventional instructions versus collaborating with Codex to describe the process it successfully followed.

### The flow that disappears

The best results often appeared late in a conversation. By then, the collaboration had passed through several steps:

```text
initial request
   ↓
attempt and response
   ↓
correction and explanation
   ↓
shared sense of intent
   ↓
a productive rhythm for the remaining work
```

The obvious thing to preserve was the corrections. That led to rules. But the rules were only the visible conclusions of a longer interaction. They did not necessarily preserve the shared sense of intent or the rhythm that allowed Codex to follow the work successfully.

The experiment is to describe how the collaboration proceeds rather than compiling everything Codex must or must not do. The hoped-for result is not perfect compliance with a document. It is a fresh conversation that enters the useful rhythm without needing to repeat the entire history.

### Emerging journal arc

```text
Prompts
I tried to specify the intended result precisely.
The evil genie problem made precision unreliable.
        ↓
Conversations
Working through the problem together produced better results.
Long conversations eventually developed a productive flow.
        ↓
Repetition
Fresh conversations lost the flow.
The same expectations and corrections had to be established again.
        ↓
Instructions
Written rules appeared to carry some learning into new conversations.
As they accumulated and became more formal, they lost some of the
conversational shorthand and larger intent that had made them useful.
        ↓
Process-like instructions
The current experiment tries to preserve how the successful
conversation unfolds, not only the rules discovered within it.
```

The transition is the story. Each stage is a reasonable response to the failure of the previous stage, and each creates the conditions for the next discovery. The journal does not need to prove that the final stage is correct. Its honest stopping point is now that workflows improved on rules but continued to drift, prompting a new experiment with Core Principles.

The entry should not be organized as a case proving that process-shaped instructions outperform rules. It should remain close to the experience of noticing a pattern, trying to preserve it, watching that preservation lose something, and beginning another experiment. Examples such as “boring code” belong because they show what prompted the change in thinking, not because they establish a result.

### Current Figma experiment

The Figma instructions are being rewritten with Codex's help. The intended change is from a list of exact design and editing rules toward a process that conveys the intent of the work and starts an appropriate conversation.

There was a tension in the experiment: asking Codex to write an instruction file naturally produced language that still sounded instructional. The workflows became an intermediate form—more structured than a conversation, but closer to a conversational flow than the previous rulebook.

After using them, I found that this intermediate form did improve on the rules. It also continued to drift, and its own structure needed revision. I no longer have a reliable memory of every iteration. The journal can preserve the result of that period without manufacturing a detailed chronology: workflows worked better, remained imperfect, and led into the Core Principles experiment.

### Boring code

The recurring coding problem was not that Codex produced obviously broken code. It produced code that was more sophisticated than the problem justified. The pattern resembled an inexperienced developer applying a recently learned large-system technique in a small part of the codebase:

```text
small problem
   ↓
recognize an opportunity to use a sophisticated pattern
   ↓
add abstraction and machinery
   ↓
double the code and complexity
   ↓
gain very little in return
```

The desired process moves in the other direction:

```text
start with the straightforward solution
   ↓
observe actual complexity
   ↓
introduce structure when the simpler design stops being sufficient
```

After enough conversation, “boring code” became shorthand for this whole judgment. Codex could use the phrase to notice and correct its own tendency toward cleverness. Translating it into more formal engineering language did not necessarily preserve the same effect. When the word “boring” was omitted from the instruction set, some of the behavior returned. Putting the word back helped.

This may be evidence that a memorable analogy can carry intent better than a precise rule. “Prefer straightforward implementations and avoid premature abstraction” sounds more professional, but “boring code” may activate a richer and more coherent model of the desired engineering style. It also gives a drifting conversation a simple way to reorient itself.

### Possible phrases

- Ask, don't tell.
- Instructions may work better as a path than as a fence.
- A rule tells Codex where not to go; a process gives it somewhere to stand.
- The phases held the behavior in place even when the rules were no longer present.
- More rules did not create more adherence.
- Codex did better when the instructions described how the work should unfold.
- Instructions can preserve the shape of a successful corrective conversation.
- The conversation eventually learned how to flow, but the next conversation started over.
- I was preserving the rules we discovered, not the process that helped us discover them.
- The instructions should begin the working relationship, not attempt to replace it.
- The test is whether a new conversation reaches the flow sooner.
- Each solution worked well enough to reveal the next problem.
- Prompts tried to preserve the answer; instructions tried to preserve the corrections; process-like instructions try to preserve the collaboration.
- I did not abandon instructions because they never worked. I changed them because they worked and then degraded.
- Boring is good.
- Codex learned that I wanted boring code.
- “Boring” carried more engineering judgment than the respectable version of the rule.
- Start simple. Introduce complexity when complexity becomes the problem.
- The phrase did not eliminate drift, but it gave us somewhere recognizable to return to.
- Fancy code can be locally impressive and globally expensive.

## Threads to revisit

- What did the earlier rule-based instruction file look like?
- What phases replaced or reorganized those rules?
- Were the rules actually removed, or did the process make the remaining rules easier to apply?
- How was improved adherence observed? Was there a repeated task or failure that stopped recurring?
- Does the model follow phased instructions better because each phase narrows its attention?
- How does this idea relate to the hidden complexity exception recorded in the architectural-instructions concept?
- Could “ask, don't tell” become a process for writing instructions themselves: ask Codex how it needs to reason, observe the failures, and then encode the successful process?
- How can a proposed instruction be tested without relying on the corrective conversation that produced it?
- What evidence would show that the new conversation-starter style works better than the old rule-based instructions?
- At what point in a successful long conversation does the flow become noticeable?
- What changes in Codex's responses once that flow exists?
- Which parts of the flow are sequential steps, and which parts are tone, intent, or shared context?
- Can a written process recreate a relationship that originally emerged interactively?
- How conversational can an instruction file actually be?
- Does having Codex write the process help it describe something it can follow, or pull the result back toward conventional rule language?
- What happens when the new Figma instructions are used in a genuinely fresh conversation?
- What did the earliest prompt-heavy way of working feel like before the evil genie problem became obvious?
- What made conversations feel like a distinct alternative rather than simply longer prompts?
- How many conversations had to repeat the same problems before instructions became the obvious next step?
- What did instructions improve immediately when they were first introduced?
- How did the degradation of instructions show itself over time?
- Is there one Figma instruction file whose revisions could make the whole transition concrete?
- What exact kinds of abstractions or patterns did Codex introduce when it made the code too fancy?
- Did Codex literally use the phrase “you want boring code,” and in what context did that first happen?
- What formal wording replaced or displaced “boring” in the instructions?
- Why did the respectable engineering language appear to carry less force than the analogy?
- Does “boring code” work because it is memorable, because it compresses many tradeoffs, or because it gives Codex a recognizable persona to adopt?
- Are there other conversational phrases that produced similar self-correction?
- Could the process-like instructions deliberately preserve this kind of informal shorthand instead of translating it into formal rules?
- What kinds of drift remained after workflows replaced rule-heavy instructions?
- What made a workflow feel “not exactly right” even when it improved the results?
- Is there one remembered workflow revision that captures the broader pattern without requiring a complete iteration history?
- Does Core Principles change the same approach again, or begin a genuinely different inquiry?
