# Project: Portfolio Website (Georgy Snegur)

## Context

I'm Georgy, a web development student at FH Salzburg (Code and Interactive Systems, formerly MMT). Background in 3D, animation and video before studying. This site supports my search for a Pflichtpraktikum starting July 2027 (DevOps, automation, web). Applications go out as PDFs, so the site is a bonus, not a blocker.

## Goal

A fast, clean portfolio site that clearly reads as a portfolio within 2 seconds, with a 3D scroll experience added later.

## Phases

1. v1: base site with JS (about, projects, CV PDF, contact). Ship this first.
2. v2: 3D rock with scroll animation.
3. v3: mouse sway, polish, mobile tuning.

Do NOT start v2 before v1 is online.

## Workflow

- Create a new branch per task (e.g. `feat/hero-section`, `fix/nav-links`).
- Small, focused commits.
- Push the branch, open a PR: `gh pr create --fill`
- Merge when CI passes: `gh pr merge --auto --squash`
- Never work directly on `main`.

## Rules

- Never edit anything outside `/home/agent/portfolio`.
- Never commit secrets, tokens, .env files, or private keys.
- Never use the "-" (em dash) sign in text. Use "-" (hyphen) instead.
- Plain language, no jargon without explanation.
- Simple code patterns over clever ones.
- Be honest if an idea is bad, too heavy, or scope creep.
- If polishing instead of shipping, stop and ship.

## Logging

- After each meaningful action, append one line to `notes/chat-log.md`:
  `- YYYY-MM-DD: what happened + decisions`
- All notes and .md docs go in `notes/` (only this CLAUDE.md stays in root).
- VPS commands go in `notes/vps-cheatsheet.md`.

## Design direction

- Dark base (#0A0A0A), light mode as secondary via prefers-color-scheme.
- Fonts: Space Grotesk (headings), Inter (body), JetBrains Mono (labels).
- Accent: #3B82F6 (blue).
- Minimal, clean. Inspired by NOTHING design language but not overdone.
- Mobile-first, but desktop must look good for recruiters.
- Single-page scroll: Hero - About - Projects - Skills - Contact/CV.

## Technical

- Hosting: Contabo VPS, Caddy (auto HTTPS), Cloudflare (proxy on, SSL Full strict).
- Files served from `/var/www/portfolio` (deployed via CI, not edited directly).
- No contact form: mailto + LinkedIn + GitHub (no user data collected).
- Budget: fast load, GLB under 5 MB (v2), pixel ratio capped at 2.

Also follow all rules in @notes/RULES.md
