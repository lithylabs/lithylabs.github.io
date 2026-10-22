# Journal 04: Engineering vs Coding

Codex writes code better than I do. That has made it surprisingly difficult to explain what I keep finding missing.

I have been pleased with the work we have done together. When I provide a good design or architectural structure, the code it produces can be amazing. But I kept noticing strange patterns in the designs themselves. As I pushed new features into them, things would become intertwined. The structure would get more complicated, and changes that seemed straightforward in my head became difficult to accommodate.

I could see a difference between Codex's designs and mine. I was struggling to put my finger on what that difference was.

The idea that generative AI produces poor-quality code did not describe my experience. The code was often very good. Architecture and design seemed closer to what I was concerned about, but even those words did not quite get at it. Codex knew design patterns. It could implement them correctly. It could also build a design that was overkill without seeming to recognize that the design itself was the problem.

I was having trouble finding language that accounted for both experiences.

## The concepts were turning into actions

One place I encountered this was in the structure behind the AI code I was developing. I described the actions I wanted, but I also used terms like Goal and Plan. Those words represented concepts in how I thought about the system.

Codex seemed to translate the whole description into actions that needed to happen. It could make those actions work, but the separation I had in mind did not carry through into the code.

For simple behavior, that was fine. As the behavior became more complex, everything began to intertwine. Adding more exposed how little room the structure had to accommodate it.

I have always worked from the premise that code should map to your thought process. There are times when scale or efficiency requires something less intuitive, but most of the time those mental abstractions are useful. They let me hold several concepts in mind without holding every detail of their implementation. I can see how they relate and where their responsibilities separate.

I was using those abstractions in the conversation, yet the code kept bringing me back to the individual actions. I could explain what I wanted it to do more easily than I could explain what felt wrong about the result.

## Pushing on the design

Finding an awkward design is a normal part of development. Usually, questioning it is where the interesting work happens. The idea changes as we discuss it. We find a reason something does not fit, reconsider an assumption, and the shape of the solution moves.

With Codex, I often found it defending the existing design. It could explain how the parts worked and why it had put them there. The house was standing. I wanted to explore how we could improve its construction.

I started asking it to critique designs explicitly. That helped. Asking it to compare and contrast different designs showed promise too. But I could not get that kind of examination into the normal flow. I kept having to pull the conversation toward it.

This reminded me of working with junior developers, although the experience was different. A junior developer might have exercised the coding muscle much more than the design muscle. When pushed, they would try and struggle. I could recognize the effort even when they could not find the answer.

With Codex, it sometimes felt as though that movement was not available. There is a difference between having a weak shoulder that makes lifting something overhead a struggle and being unable to attempt that movement at all. That was closer to how these conversations felt to me, despite how capable Codex was at writing the code.

## A word I had been using for years

Around this exploration, I read an article that discussed engineering versus coding. That distinction stayed with me.

I had heard the title software development engineer for years. I had never really separated out what the engineering part meant in my own work. Writing code, designing a system, and working through its problems had always happened together.

With Codex doing more of the coding, I could see more of the other work I was doing. I was thinking about what the concepts were, who should have responsibility for them, and how a structure could accommodate several needs at once. Sometimes I was trying to remove a perfectly valid design because it made the problem harder than it needed to be.

Engineering gave me a useful way to think about that work. The distinction helped explain why I could be pleased with the code and still spend so much time questioning the structure around it.

## Real gameplay inside a teaching sequence

Later, the teaching system in Allies gave that idea something concrete to work against.

I wanted to mix actual gameplay with a scripted teaching sequence. In ordinary play, combat uses randomness. In a teaching sequence, I need to know the result of a battle so the next step can build on it. Players should be able to interact with the game, but only certain interactions should be accepted at a given point. Clicking around should not break the sequence.

The game needed to keep being a game while also following a script.

I had described the first sequence as a series of actions: when the player clicks here, do this, then show the next action. Codex got that working. The decisions ended up distributed across objects that made sense for the individual functions.

But understanding the teaching sequence meant following those decisions through the game. When I wanted another sequence, I wanted to replace one concept with another. The structure made that difficult.

There were good reasons to keep behavior in its functional areas. There were also good reasons to keep the teaching decisions together. Both needed to work within the same system.

Codex kept following the existing construction. The ViewModel created a Client that managed the flow, so Client became responsible for creating the tutorial. The discussion moved toward how to pass the choice through that chain so it could create one tutorial or another. More of the teaching system was becoming Client's responsibility.

As we worked through the flow, I found a place for a simple intercept. The tutorial could look at each call and decide what to do. We could extend the existing Client to provide that opportunity, reuse its behavior, and avoid duplicating it into another Client. Client did not need a large amount of code managing the teaching sequence.

That change let the scripted decisions live together while the existing game behavior remained available. Several needs could coexist through a simpler structure.

Codex helped me work through the code and offered suggestions, but getting there took considerable guidance. I found the structural change. It did not make that leap.

I could connect this to what had bothered me about Goal and Plan. In both cases, I was thinking about concepts that needed a place in the structure. Getting all the actions to happen could leave those concepts scattered across an otherwise working implementation.

The phrase “the code is good, but the engineering is lacking” has become useful to me because it gives those experiences a place in the same picture. It helps me think about why supplying the structure can make such a difference to the work Codex produces.

I am spending less time writing code and more time considering these relationships. Work I used to experience as part of coding is becoming more visible on its own. The engineering part of that familiar job title means more to me now when I look at where my attention goes.
