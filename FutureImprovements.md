# Future Improvements

## Branding and Personal Positioning

Keep LithyLabs as the primary brand, while making Jeffrey Kleiss more visible as the person behind the work.

Positioning direction:

> LithyLabs is the software and AI lab of Jeffrey Kleiss: a place for experiments, production projects, and writing about how modern software gets built.

This keeps LithyLabs broad enough for projects, writing, and future products, while giving readers a real person to trust and follow.

## About Page

Use `/about` as the full bio and context page rather than only a short site description.

The page should cover:

- What LithyLabs is
- Who Jeffrey Kleiss is
- Why LithyLabs exists
- What topics the site focuses on
- Current areas of exploration
- Links to projects, writing, and contact information

Suggested opening:

> LithyLabs is the software and AI lab of Jeffrey Kleiss.

Possible sections:

- About LithyLabs
- About Jeffrey Kleiss
- Why LithyLabs Exists
- What I Write About
- Current Focus
- Selected Projects

The About page should be warm and narrative, not resume-heavy.

## Resume Page

Add a dedicated `/resume` page when the site needs to serve more directly as a professional portfolio.

The resume page should be scannable and proof-oriented, separate from the more narrative About page.

Suggested route:

```txt
/resume
```

Suggested heading:

```txt
Jeffrey Kleiss
Software Engineer - AI-assisted development - Game systems - Product engineering
```

Suggested sections:

- Selected Work
- Writing
- Experience
- Technical Strengths
- Contact

## Project Pages

Add project pages for major LithyLabs work so the site can demonstrate concrete output, not only blog posts.

Suggested structure:

```txt
/projects
/projects/vibing-risk
/projects/allies-the-art-of-betrayal
```

### Vibing Risk

Position as an experiment in AI-assisted "vibe coding" using a Risk-like strategy game as the case study.

Use this project to support a blog series about:

- What AI-assisted coding accelerates
- Where it breaks down
- What still requires human engineering judgment
- How architecture, testing, and iteration change under AI-assisted workflows

### Allies: The Art of Betrayal

Position as a production game project and portfolio proof point.

Emphasize:

- Production game development
- Strategy and negotiation systems
- Alliance-building and betrayal mechanics
- Product execution beyond prototypes

## Site Navigation

Potential future navigation:

```txt
Home
Blog
Projects
About
Resume
RSS
```

Avoid adding too many nav items until project and resume pages have enough content to justify them.

## Blog Author Presence

Add Jeffrey Kleiss as the visible author layer on blog posts.

Possible improvements:

- Add a byline near the post date: `By Jeffrey Kleiss`
- Link the byline to `/about`
- Add a short author block at the bottom of posts

Suggested author block:

> Jeffrey Kleiss writes LithyLabs, a practical lab for software, AI, product experiments, and game systems.

## Implementation Order

Recommended sequence:

1. Expand `/about` into a full bio and LithyLabs origin page.
2. Add blog post bylines linking to `/about`.
3. Add a `/projects` index.
4. Add pages for Vibing Risk and Allies: The Art of Betrayal.
5. Add `/resume` once the project pages provide enough supporting evidence.
