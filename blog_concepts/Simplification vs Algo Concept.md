# Simplification vs Algo

## Current understanding

Early in his coding career, Jeffrey wanted to write the next cool thing: clever code and patterns that would make everything better. Looking back, he finds that code hard to read and overly complex. His sense of what makes good code has shifted toward making things as simple as possible.

Achieving that simplicity is difficult. A problem presents ideas and constraints, and the easiest path is often to implement each of them directly. As constraints accumulate, their interactions and timing become harder to reason about. Complicated code can therefore be the easier code to write.

Simplification requires understanding the problem deeply enough to recognize when a constraint no longer matters, or to discover an organization of the code or process that removes the need for it. Finding a key concept can turn a complex project into a simple one.

The next developer may encounter straightforward code that looks obvious. The finished code does not necessarily reveal the difficulty of discovering the idea that made it possible. That simplicity is obvious only in hindsight.

Working with Codex on algorithms for Allies AI has made this tension more apparent. Jeffrey regards Codex as stronger than himself at programming algorithms, yet finds himself describing algorithms in more detail than he expected. His experience is that Codex recognizes a stated problem and proceeds directly to a solution without first investigating how accurate the result needs to be or what larger decision it serves.

The concrete example begins with finding the cheapest path to a location. Codex proposed Dijkstra’s shortest-path search. Jeffrey accepted the proposal and began accumulating algorithmic building blocks. The larger purpose was to determine whether the AI could eliminate a player. As the approach expanded toward planning captures across the board, accounting for costs and avoiding attacks on allies, Jeffrey reports that complexity grew dramatically and execution became too slow.

The emerging concern is that Codex can solve the stated subproblem competently while leaving the necessary precision and scope of the overall problem unexamined. Jeffrey describes this as taking the easy way out by making things complex. The implementation has not been inspected here, and the precise source of the runtime growth is not yet established. Neither a simpler replacement nor the required accuracy has been described yet.

This remains an evolving concept, not yet an argument, outline, or classified post.

## Evolution

### 2026-09-25

- Began with the working subject “simplification vs Algo,” without a settled explanation of the connection.
- Recalled an early attraction to clever code and patterns, followed by a later judgment that the resulting code was difficult to read and overly complex.
- Identified a tension: implementing every constraint can be easier than understanding how to remove the need for some of them.
- Highlighted interactions among constraints and timing as sources of complexity.
- Observed that the eventual simplicity can hide the work of discovering the key concept from future developers.

### 2026-09-25 — Connection to Allies AI

- Connected the initial reflection to working with Codex on Allies AI algorithms.
- Expressed confidence in Codex's algorithm programming ability alongside frustration that it jumps from a stated problem to implementation.
- Described accepting Dijkstra’s shortest-path search for a cheapest-path subproblem without discussing the accuracy actually needed.
- Clarified the larger objective: assess whether the AI can eliminate a player.
- Reported that accumulating algorithmic building blocks and adding costs and ally restrictions led to excessive complexity and slow execution.
- The question now includes how to establish the real decision and required precision before committing to algorithms. No simplifying breakthrough has been described yet.

## Source material

Jeffrey's phrases:

> Often times it much easier to write complicated code.

> The act of understanding the problem so completely that you know that a constraint isn't important anymore.

> Or that if you organize the code or the process in a different way you can remove these constraints.

> It is only obvious in hindsight.

> Finding that key concept might switch a complex project into a simple one. Finding that concept is hard

### Allies AI example

- Initial request: find the cheapest path to a location.
- Codex's proposed tool: Dijkstra’s shortest-path search.
- Actual purpose: determine whether the AI can eliminate a player.
- Development trajectory as recalled: accept the proposed solution, accumulate algorithmic building blocks, broaden capture planning, then account for cost and avoiding attacks on allies.
- Reported outcome: complexity explodes and the algorithm takes too long to run.
- Jeffrey described the path search as finding “all the paths.” Preserve this as his recollection; the actual search behavior and implementation have not been verified.

> Codex is taking the easy way out by making things complex.

> Codex is solving the problem that I stated but didn't take the time to figure out how accurate we need it to be.

> I'm describing algos more than I was expecting.

## Threads to revisit

- A concrete moment when changing the organization of code or a process removed constraints and their interactions.
- What made the key concept difficult to find, and what eventually revealed it?
- What information does the AI actually need to decide whether eliminating a player is worth attempting, and how accurate must it be?
- Where did the runtime growth arise: individual path searches, combinations of capture plans, changing costs, or something else? This has not been established.
- Has a simpler approach been found for the Allies example, or is Jeffrey still working through it?
