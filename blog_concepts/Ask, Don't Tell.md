d# Journal 03: Ask, Don't Tell

I used to spend a lot of time trying to write the perfect prompt.

If Codex produced the wrong result, I assumed the prompt had left something out. I would make the next prompt more explicit. I would add another condition, describe the expected result more precisely, or say what Codex should not do.

I came to think of this as the evil genie problem.

An evil genie grants the wish exactly as it was stated while finding some way to ruin what the person actually wanted. My prompts often felt like that. No matter how carefully I wrote them, Codex could interpret the words in a way that technically completed the request while breaking my intent.

The answer always seemed to be one more sentence. Then one more exception. Then a clarification for the exception.

Eventually, I stopped trying to put the entire answer into the prompt.

## I started asking instead

I started asking Codex what it thought.

This was not a clever prompting technique. I was going back to the development conversations I had been having for decades. Instead of trying to specify the entire result in advance, I was discussing the problem.

By asking, I started a development conversation. Codex and I could work through the problem and find the issues together. We were finding problems in the design before they became problems in the code. That saved a lot of time, and the results were better.

The conversations still took time to develop. Codex would propose something, I would explain what felt wrong, and we would try another direction. We would establish language for things I cared about and gradually develop a shared sense of the work.

At some point, the conversation would begin to flow.

Once that happened, the results could be excellent. I did not have to explain every small decision. Codex could follow the direction of the conversation because the earlier discussion had established what mattered. It could sometimes recognize a problem and correct itself before I needed to point it out.

That was much better than trying to predict every possible misunderstanding in one prompt.

## The constant new developer

Things were going well. I was producing more clean code in less time and spending less time correcting it. But something kept getting in the way: I was repeating myself.

The repetition did not usually happen during development. It happened at the beginning.

I had a practice of starting a new Codex session after each project or development chunk. Each new session was like hiring a new developer. I had to explain my quirks again. My ideas about how code should be written, and what I wanted from the work, had to be reestablished every time.

Instructions seemed like the answer. When a conversation uncovered an important preference or corrected a recurring problem, I could put it in the instructions. The next developer would arrive with some understanding of how I wanted to work.

I kept introducing more rules. I worked with Codex to make the rules better, but the instructions became more complex with every correction. The more I tried to fix them, the more the evil genie showed up. Codex could satisfy the new wording while missing the reason the rule was there.

It began to feel like I was trying to force Codex into a box it did not want to be in.

Each new conversation would eventually become the conversation I wanted. We would work through the misunderstandings and find our flow again. But if I kept a conversation going for too long, it would begin to drift away from the instructions and revert to the bull-in-a-china-shop developer.

Make it work at all costs. Do not worry about what the code looks like. It only matters that it works. Who cares if it will be difficult to maintain or difficult to improve later?

I was caught between constantly onboarding a new developer and watching the current one gradually forget how we had agreed to work. The growing instruction file was supposed to solve that problem. Instead, it was becoming another version of the prompt I had already stopped trusting.

## Codex told me I wanted boring code

For the umpteenth time, I was explaining why I did not want an abstraction that made the code harder to understand. The instructions already told Codex to avoid unnecessary abstractions and keep things simple, but we were having the same argument again. Codex responded with something like:

> Oh, that's right. You don't like clever code. You like boring code.

I am paraphrasing, but that was what it felt like. Codex was starting to sound like the cocky junior developer I used to be. I knew what was right. I knew the latest and greatest technique. In that moment, Codex brought me back to the emotional experience of being that young developer.

Only later did I learn that boring code was often better and easier to maintain. Hearing Codex call it boring made me realize that this was more than a collection of rules. It was a style of coding.

If you ask me what boring code looks like, I will not be able to give you a complete definition. But I bet most experienced developers would recognize it when they saw it. Apparently, Codex could too.

In the next conversation, I said I wanted boring code. Codex picked up on the style immediately. It started writing boring code.

I was no longer fighting every individual abstraction or repeatedly asking Codex to simplify what it produced. “Boring” worked better than telling Codex to write simple code. “Simple” was too easy for the evil genie to turn against me. “Boring” carried the experience and the style in a way the rule did not.

## Room to play

If Codex responded to “boring,” maybe it would respond to other things that help junior developers become better developers. One of those things is giving them more responsibility.

That does not mean letting them loose, which I think too many people are doing with generative AI. It means helping them find the answer instead of telling them the answer. Let them try things. Ask why they made a decision. Point out where it breaks and give them room to try again.

That is what I began doing more deliberately with Codex. I stopped trying to tell it exactly what to do and began asking how it would solve the problem. I would point out issues in the proposed design or explain why something would cause a problem. Sometimes I would express a direction I wanted to explore. We could work through those decisions before Codex turned them into code.

Codex was now trying to understand what I wanted instead of finding a way to satisfy a list of rules. At the same time, I started reducing those rules and looking for guidance that carried more of the emotional meaning that “boring” did.

That led me toward workflows. Instead of prescribing the answer, I described how I wanted the conversation and the work to proceed. The workflows created room to discuss the problem, explore a design, and discover where it was wrong. Most importantly, they kept Codex from jumping straight into code.

## Still finding the flow

The workflows have been better than the rules, but they have not solved the problem. Codex still drifts, and I have continued changing the workflows as I discover where they fall short. I do not remember every iteration, and I am not sure there would be much value in pretending it was a clean progression.

More recently, I have started organizing the work around Core Principles. That feels like the beginning of another journal.

For now, I am no longer trying to write the perfect instruction. I am trying to start the right conversation.
