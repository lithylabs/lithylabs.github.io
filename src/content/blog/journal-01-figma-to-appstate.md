---
title: "Journal 01: Figma to AppState"
description: "Introducing Figma into Vibing Risk exposed a third kind of state between server state and screen UI—and led to a new controller layer."
pubDate: 2026-07-31
heroImage: "/blog/journal-01-figma-to-appstate.jpg"
tags: ["vibing-risk", "figma", "appstate", "ai", "software-development"]
type: "journal"
journalNumber: 1
draft: false
---

Vibing Risk started as an experiment: I wanted AI to write all of the code.

That part worked surprisingly well. I could describe what I wanted to Codex, and it would create the Compose structure needed to make it work. I did not spend much time looking closely at the code. The application kept moving in the direction I asked it to move, which felt like evidence that the process was working.

The problem was that “where I asked it to go” was not necessarily the right place.

I am a server developer. I brought server-side ideas about data and communication into a Compose application. But this was not just a case of me giving Codex bad directions. Codex also had a tendency to get fancy. It would introduce another flow or transformation that made the next feature work without stopping to question the architecture around it.

That created a feedback loop. I described things in server-like flows. Codex built increasingly clever reactive machinery around those descriptions. Each local change worked, so we kept building on it. The fact that the code functioned concealed the fact that the architecture was becoming harder to understand.

## Bringing Figma into the process

I had always intended to make Figma part of the development flow. It was a good place to create wireframes, and I knew that I would eventually need to bring a designer into the project. Figma seemed like the right shared space for that collaboration.

When I started connecting Figma to the Compose code, I found that our existing organization did not translate well. The code was organized around widgets. Figma felt more like a storyboard.

In Figma, the experience was broken into sections, frames, and screens. Those screens described the flow of the game. I wanted the mapping into Compose to be simple enough that both a designer and Codex could understand where everything belonged.

We started with `BoardScreen`, then organized the experience around the gameplay phases: Recruit, Draft, Attack, Fortify, and Opponent. Each section contained a series of screens, and each section received the same basic structure:

`Container / Content / ViewModel / UiState`

This worked well for the visible parts of the application. The organization in Figma now had an understandable counterpart in Compose. More importantly, the structure was straightforward enough that Codex could follow it without inventing a new pattern for each screen.

Once the visible structure became clearer, however, the data moving underneath it became more confusing.

## Two kinds of state

At the time, I thought a Compose application had two basic kinds of state.

There was `ServerState`, which represented the business state coming from the backend. In this project, `GameState` described the current state of the game without knowing anything about how the game would be displayed.

Then there was `UiState`, which contained the presentation-ready data consumed by Compose. A number might need to appear in the Available Troops box, or the current state might determine which composable should be shown.

The ViewModel was the bridge between them:

`ServerState → ViewModel → UiState`

That model is fairly easy to imagine for a single-user application. The ViewModel reads the game state, converts the relevant parts into `UiState`, and exposes it to the UI.

Vibing Risk is also a pass-and-play game. Two players use the same device and hand it back and forth. The underlying `GameState` may be the same, but each player can have a completely different view of that state.

I had created a `PlayerSession` concept to represent that perspective. It existed only on the frontend, but it was long-lived and needed to cross multiple screens and ViewModels. I kept treating the session data as `UiState` because that was the only frontend state category I had.

That classification never quite worked.

One recurring symptom involved troop counts. The UI sometimes needed temporary values while it collected enough inputs to create a `GameAction`. The map could switch between different troop totals depending on which value had reached it. I kept fixing these problems as they appeared, but I treated them as individual thorns rather than evidence of a larger architectural problem.

## Following the flows

As part of making the Figma-to-Compose structure simpler, I asked Codex to explain how the session data moved through the application.

The answer confused me.

The data had become a chain of `StateFlow` objects. One flow would be transformed into another flow, which would feed another flow. It mostly worked, but when something went wrong it was difficult to tell which value had changed, when it had changed, or which transformation had introduced the problem.

I tried to establish a simple rule: use `StateFlow` for state moving from a ViewModel to its rendered UI. But as I applied that rule, the session data kept leaking out of the model. Codex would introduce flows that looked like ViewModel-to-ViewModel communication. I kept trying to turn `SessionController` into a ViewModel because I associated `UiState` with ViewModels.

But `SessionController` was not a ViewModel. It did not describe one screen, and its state needed to survive across several ViewModels.

It did not fit in the server-side data layer either. The session existed only on the frontend. It was related to the UI, but it was not screen presentation. It behaved more like long-lived application data.

That contradiction finally highlighted the missing concept. I did not have two kinds of state. I had three:

1. `ServerState` described the business or game state.
2. `AppState` described long-lived, frontend-only state shared across screens and ViewModels.
3. `UiState` described the presentation-ready state for a particular part of the UI.

`PlayerSession` was not an awkward form of `UiState`. It was `AppState`.

## Finding language that worked with Codex

The discovery did not happen as one clean architectural insight. I tried different patterns and watched how Codex translated them into code. I would describe a responsibility, inspect what Codex produced, explain why it did not feel right, and try again.

I originally used the name `SessionController` because of my server-development background. A more common term might be “service,” but service already means something different in frontend development. I fell back to controller, a term I had used before service became the standard term in most of my server code.

There did not seem to be one universal name for the state either. In simpler applications, this kind of data can be folded into a ViewModel without creating much friction. My problem was that the session crossed multiple ViewModels. It needed an identity and lifecycle outside any one of them.

Eventually, Codex and I settled on `AppState` and controllers. The names were useful not because they were the official names for a universal pattern, but because both of us could apply them consistently.

That changed how I thought about working with Codex. I had been trying to force Codex to implement the architecture the way I already imagined it. I started having better results when I worked with how Codex interpreted the concepts. The process became a back-and-forth: describe the model, see how Codex expresses it in code, correct the differences, and develop shared language that makes the intended structure easier to reproduce.

## From SessionController to ActionsController

Once `SessionController` had established the application-level layer, another scattered responsibility became easier to see.

User interactions often needed to be translated into `GameAction`s. That translation had been spread around the UI according to whichever widget initiated the interaction. The map handled clicks and country discovery. Other widgets handled draft adjustments. ViewModels and composables knew pieces of the larger interaction, but there was no clear owner for what those pieces meant at the application level.

This led to `ActionsController`.

ViewModels could focus on their small portion of the UI and translate low-level events. `ActionsController` could understand the larger intent and turn those events into the appropriate `GameAction`. The controller layer was no longer just a place to put session state that did not fit anywhere else. It described an application-level boundary between individual screens and the game.

The cleanup also gave me the clearest indication that the architecture was moving in the right direction: Codex started pointing out problems with the code.

Earlier, Codex had helped extend the confusing architecture. Once the new types and boundaries were clear, it began recognizing when code did not fit them. The same tendency that had previously allowed Codex to keep making the old design work was now reinforcing the new design.

## Where the architecture stands

The migration is now complete, and the communication rules are much clearer.

`StateFlow` has a narrow role: ViewModels expose state to their containers. Other pushed communication uses an `EventBus`. It is not a traditional event bus with its own manual subscription system; subscriptions are handled through the Kotlin Flow API. That gives us lifecycle behavior similar to `StateFlow`, while making the kind of communication much more explicit.

I started this work because I wanted to bring Figma into the process and eventually work with designers. I expected to create a cleaner relationship between drawn screens and Compose screens. That did happen, but the more important result was that the process exposed a category of state I had been missing.

Figma changed the way I organized the visible application. Making that organization simple enough for Codex to follow forced me to examine how data crossed it. That led from `PlayerSession`, to `SessionController`, to `AppState`, and finally to a controller layer that could also own application-level actions.

The architecture is still specific to this project, and I am not claiming that every Compose application needs an `AppState` layer or controllers. In a simpler application, a ViewModel may be enough. In this one, naming the third kind of state made the difference between code that happened to work and a system that both Codex and I could reason about.
