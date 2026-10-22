# Tracking AI Changes

## Current understanding

I want to keep a record of changes to the AIs: what I noticed, why the existing behavior or logic wasn't working, and what I changed. This is an evolving concept for tracking that work, beginning with Ben's fortification behavior. It currently has the character of a journal, but its eventual form is still open.

The first situation started with Ben often skipping fortification, including when troops were trapped. Looking at the algorithm revealed that its straight Defend/Attack model did not fit the stage model we had. We initially switched to Consolidate, Secure, and Advance as approaches usable in the different stages.

We ultimately settled on a special Opening fortify and a DefendAttack fortify. DefendAttack uses a defense allocation percentage to determine how many troops should be used in defense. Changing that percentage lets us switch between an attacking and defensive emphasis. Opening retains its own fortification behavior.

This refines the initial diagnosis: the final approach still combines defense and attack, but now makes the troop allocation between them adjustable and handles Opening separately. The reason for moving away from Consolidate/Secure/Advance has not yet been described in detail.

The emerging thread is the connection between an observed behavior and the model behind it: the skipped fortifications prompted a review of the logic, and that review led to a change in how fortification decisions were framed. We have not yet recorded how Ben behaved after the change.

## Evolution

### 2026-09-27 — Starting the record with Ben's fortification change

- I wanted a blog concept that tracks changes to the AIs, the reasons for those changes, and what I did.
- I noticed that Ben wasn't always fortifying troops. It often skipped, including when troops were trapped.
- After looking at the algorithm, it was apparent that the logic wasn't correct. It used a straight Defend/Attack model, which wasn't going to work with our stage model.
- We switched to Consolidate, Secure, and Advance as a model usable across the different stages.
- The initial account captures the symptom, diagnosis, and change. The results and any further adjustments remain to be recorded.

### 2026-09-27 — Settling on Opening and configurable DefendAttack

- After the Consolidate/Secure/Advance iteration, we settled on a special Opening fortify and a DefendAttack fortify.
- DefendAttack uses a defense allocation percentage to determine how many troops should be used in defense.
- Changing the defense percentage allows us to switch from attack to defense within that fortification approach.
- This revises the earlier direction: Opening has dedicated behavior, while the attack/defense emphasis can be changed through an allocation percentage.
- The reasons for leaving the intermediate model and the observed gameplay results remain to be captured.

## Source material

### First situation: Ben skips fortification

**Observed behavior:** Ben often skipped fortification. The skipping also happened when troops were trapped. The specific board position and what made the troops trapped have not yet been described.

**Reason for the change:** Inspecting the algorithm exposed a mismatch between its straight Defend/Attack logic and the existing stage model.

**Intermediate change:** We switched to three approaches that can be used in the different stages:

- **Consolidate:** Get troops ready to attack. Often designed for a scattered position, such as in the Opening.
- **Secure:** Focus first on securing a continent, then redirect toward taking another continent.
- **Advance:** Pull troops from defense to form an attacking force.

These are recorded as approaches usable within the stage model, rather than as a replacement list of stages. The exact rules for choosing between them have not yet been captured.

### Where we settled: Opening and DefendAttack

- **Opening fortify:** Special fortification behavior for Opening. Its exact movement rules have not yet been recorded.
- **DefendAttack fortify:** Uses a defense allocation percentage to determine how many troops should be used in defense. Adjusting this percentage changes the attack/defense emphasis.

The account does not yet specify the percentages used, how they are selected, or how troop movements satisfy the allocation. It also does not yet establish whether the original skipping behavior was resolved.

### Phrases to preserve

- "It would often skip and would skip when troops were trapped."
- "It was using a straight Defend/Attack model."
- "It was clear that wasn't going to work with the stage model that we had."
- "Consolidate, Secure, Advance"
- "This allowed just changing the defense % to switch from attack to defense."

## Threads to revisit

- What was one concrete position where Ben skipped fortification, and what troop movement did I expect instead?
- What led us from Consolidate/Secure/Advance to a special Opening fortify and configurable DefendAttack?
- What does Opening need that the shared DefendAttack approach does not cover?
- How is the defense allocation percentage selected across stages or board situations?
- What changed in Ben's actual behavior after the switch? Did trapped troops start moving, and were there cases that still failed?
- As further changes are recorded, does this become a continuing development journal, or does a more specific insight emerge?
