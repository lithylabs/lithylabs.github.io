# Building a Frenemy: stream assets

Templates for the *Building a Frenemy* series: the YouTube thumbnail and the OBS stream screen for each Frenemy Game. Both are plain HTML pages that fill themselves in from URL parameters, so each episode needs no design work.

The full design exploration lives on this canvas: https://claude.ai/artifact/Qu79bnjbCG7AwojAsyNX47

## What's here

| File | What it is |
|---|---|
| `thumbnail.html` | YouTube thumbnail, 1280×720 |
| `stream-screen.html` | OBS starting/ending screen, 1920×1080 |
| `assets/frenemy.js` | Shared colors, mascot faces and URL-parameter handling |
| `assets/allies-map.jpg` | Allies board used as the background |
| `assets/discord-symbol.svg` | Official Discord symbol (from Discord's brand kit) |
| `exports/` | Images made for each episode. **Not in git**: they can always be remade from the templates |
| `examples/` | Sample renders from the original design chat. **Not in git** |

The templates and assets are committed. Generated images are not, to keep the repo small.

## Running an episode

Each Frenemy Game is one file in `src/content/frenemy/`, e.g. `game-01.md`. It drives the [/frenemy](https://lithylabs.com/frenemy) page, the home page's "Latest Frenemy Game" card and the Me vs AI score. Its `colorA`, `colorB` and `face` are the same choices used for that game's images.

### Before the stream

1. Add `src/content/frenemy/game-NN.md` (copy the last one). Set `game`, `title`, `date`, `colorA`, `colorB`, `face` and a short description as the body. Leave `result` out: the page shows the game as **Upcoming**.
2. Make the images into `exports/` (see [Exporting PNGs](#exporting-pngs)):
   - `game-NN-thumbnail.png` (1280×720): upload to YouTube.
   - `game-NN-stream-starting.png` and `game-NN-stream-ending.png` (1920×1080): "Starting Soon" and "Thanks for Watching" for OBS.
3. Once the stream is scheduled on YouTube, add its video ID as `youtubeId` (the part after `watch?v=`). The page then shows the uploaded thumbnail instead of a placeholder.

### After the stream

1. Add `result: me` or `result: ai`. The score counts itself from these.
2. Update the description with what happened, and add `replay:` with an Allies replay link if there is one.
3. Commit the episode file. Only the episode file changes per game; no images are committed.

The page shows YouTube's copy of the thumbnail (`i.ytimg.com/vi/<id>/maxresdefault.jpg`, falling back to the always-16:9 `mqdefault.jpg`), so nothing per episode is stored in the repo.

## Making an episode's assets

Pick five things, then open the templates with them in the URL:

| Parameter | Meaning | Example |
|---|---|---|
| `game` | Frenemy Game number | `7` |
| `title` | Episode title; `\|` forces a line break | `Added Grudges` |
| `a` | Color A: frame, mascot, "emy" | `purple` |
| `b` | Color B: "Fren", game badge | `gold` |
| `face` | Mascot face: the AI behavior being worked on | `grudge` |
| `tilt` | Mascot angle in degrees (optional) | `-12` |
| `status` | Stream screen only. Leave empty (`status=`) to use an OBS text source instead | `Starting\|Soon` |

Colors: `red`, `blue`, `gold`, `green`, `teal`, `purple` (any CSS color also works).
Faces: `neutral`, `aggressive`, `grudge`, `friendly`, `calculating`, `defensive`, `greedy`.

Examples:

```
thumbnail.html?game=7&title=Added Grudges&a=purple&b=gold&face=grudge&tilt=-12
stream-screen.html?game=7&title=Added|Grudges&a=purple&b=gold&face=grudge&status=
```

### Exporting PNGs

With Chrome in headless mode (nothing to install). From this folder:

```
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
"$CHROME" --headless=new --hide-scrollbars --force-device-scale-factor=1 --virtual-time-budget=8000 --window-size=1280,720 --screenshot="$PWD/exports/game-01-thumbnail.png" "file://$PWD/thumbnail.html?game=1&title=The%20Baseline&a=purple&b=gold&face=neutral&tilt=-12"
"$CHROME" --headless=new --hide-scrollbars --force-device-scale-factor=1 --virtual-time-budget=8000 --window-size=1920,1080 --screenshot="$PWD/exports/game-01-stream-starting.png" "file://$PWD/stream-screen.html?game=1&title=The|Baseline&a=purple&b=gold&face=neutral&tilt=-12&status=Starting|Soon"
"$CHROME" --headless=new --hide-scrollbars --force-device-scale-factor=1 --virtual-time-budget=8000 --window-size=1920,1080 --screenshot="$PWD/exports/game-01-stream-ending.png" "file://$PWD/stream-screen.html?game=1&title=The|Baseline&a=purple&b=gold&face=neutral&tilt=-12&status=Thanks%20for|Watching"
```

`--virtual-time-budget` gives the Rubik font time to load from Google Fonts; without it the text can render in a fallback font. Check each image before using it.

Or with Playwright (no install beyond `npx`):

```
npx playwright screenshot --viewport-size "1280,720" "file://$PWD/thumbnail.html?game=7&title=Added%20Grudges&a=purple&b=gold&face=grudge" thumbnail-07.png
npx playwright screenshot --viewport-size "1920,1080" "file://$PWD/stream-screen.html?game=7&title=Added|Grudges&a=purple&b=gold&face=grudge&status=" stream-07.png
```

Or open the page in Chrome at 100% zoom and take a screenshot of the element. In OBS you can also add the stream screen as a **Browser source** pointing at the file URL, with OBS text on top for "Starting Soon" / "Thanks for Watching".

## The rules (what we decided)

- **Series name:** "Building a Frenemy". Small "BUILDING A", big "Frenemy" in two colors. The word looks odd in one color; split in two it reads as friend + enemy.
- **Two colors per episode.** Color A = frame, mascot and "emy". Color B = "Fren" and the game badge. Pick two clearly different player colors; rotating them gives lots of variety for no extra work.
- **The mascot** is a map-style troop badge with a face. Any color can wear any face. The face shows the AI behavior being worked on that episode, chosen before the stream.
- **Font:** Rubik (900 for headlines, 600 for labels).
- **Background:** the real Allies board. Thumbnail 12% dark; stream screen 58% dark so the panels and white text pop.
- **Thumbnail layout:** series title upper left, "GAME" + big badge upper right, mascot breaking out of the lower-left frame, episode title centered in the remaining space and as loud as "Frenemy". Equal 40px insets for the top corners. Slight overlap of mascot and title is on purpose.
- **Stream screen:** one image for start and end; OBS text swaps the status. Calm and spacious: series name with a short explainer, "TODAY:" with the badge and title, the mascot beside the status, and three link bubbles (Frenemy page, play Allies, Discord in Discord blurple). No score on screen; the score lives on lithylabs.com/frenemy.

## How we got here

1. **Starting point.** The first stream screen was a notebook-paper page with a torn edge revealing the board. Charming on stream, but unreadable at thumbnail size.
2. **Thumbnail experiments.** Notebook red-pen "grading the AI", a dark dramatic map with a glowing region ("B"), a report card and a scoreboard. Lesson: pre-stream thumbnails must promise a question, not an outcome, because the result isn't known yet.
3. **The series found its name.** The show isn't one AI trying to beat me; it's a cast of AIs with personalities that cooperate and compete. "Building a Frenemy" fits *Allies: The Art of Betrayal*. Each game is "Frenemy Game #N".
4. **Mascot search.** Six two-faced characters (game piece, territory, diplomat, mask, die, flag). The die was the favorite ("many faces") until we remembered Allies, unlike Risk, has no dice. The winner came from the board itself: the troop-count badge, with a face.
5. **Style search.** Six full styles (felt, pop, midnight, paper, retro, ink). "Six Faces Pop" won for its mellow faces. Board-inspired redraws missed the mark; using the real map screenshot and the tutorial's dark card fixed it.
6. **Layout narrowing.** Rounds T, R and F settled the thumbnail: R2's game badge, R5's type, R3's mascot size moved further into the frame, 12% background, then the two-color rule.
7. **Stream screen.** Six big layout changes (S), then the floating-panel layout refined (P) into the final: calmer, darker, smaller series panel, wider "Today" panel, two-line status, link bubbles with top accent bars.
8. **Copy.** Descriptions name me as the developer and use the full title *Allies: The Art of Betrayal* on first mention.

## Copy

**OBS screen** (already in `stream-screen.html`):
> Building AI frenemies for my strategy game, Allies: The Art of Betrayal. I play them, break down their decisions, and make them better.

**YouTube description:**
```
I'm the developer of Allies: The Art of Betrayal, and I'm building its AI players live. ▶ Play free: https://allies.lithylabs.com

Today: [Episode title] — [one line on what changed or what I'm testing]

In Building a Frenemy, I'm creating AI players with real personalities: they make deals, compete, and sometimes betray you. Each game, I play against them, break down why they made the moves they did, and work out how to make them better.

📈 Follow the AI's progress, every game and replay: https://lithylabs.com/frenemy
🎲 Challenge the AI yourself: https://allies.lithylabs.com
💬 Join the discussion: https://discord.gg/JAGpUPpdp3

#gamedev #indiegame #strategygame #AI
```

**Frenemy page intro:**
> I'm the developer of Allies: The Art of Betrayal, a strategy game of alliances and betrayal, and I'm building its AI players in the open. The goal isn't one unbeatable AI. It's a cast of AI players with real personalities, who cooperate when it helps them, compete when it doesn't, and keep you guessing which one they'll do next.
>
> Every Frenemy Game is a test. I play against the AIs, break down their decisions, and figure out what to improve. Each entry below shows what changed, how the game went, and a full replay you can watch in Allies.
>
> The scoreboard tracks how the AIs are doing over time. It's not the goal, just a way to see if the changes are working.
