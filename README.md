# Vancouver 2026 election guide

Static TypeScript + Preact site (no server). Info on Vancouver's October 17, 2026 municipal
election: offices, all 130 candidates, slate platforms, and per-candidate platform analysis.

Styling reuses the `rmd-election` / `bc-election` foundation (Atkinson Hyperlegible, same CSS
tokens, hash routing, accessible tables, source links).

## Develop

Requires Node.js 22.12+.

```sh
npm install
npm run build    # emits dist/
npm run dev      # watch-rebuild; serve dist/ with e.g. python3 -m http.server --directory dist
npm run check    # tsc --noEmit
```

Open `dist/index.html` via any static server. Routes: `#/` home, `#/match` find
candidates, `#/shortlist` shortlist, `#/c/:candidate-id`, `#/methodology`.

## Candidate pages

Each profile answers three questions in plain language (see
<https://digital.gov/guides/plain-language>): what does the candidate promise, what does the record
show, and what is still unknown?

Keep the page to three blocks. One summary per page, and one per section — never two.

1. `analysis.summary` as a lede paragraph under the name, then the `dl.facts` reference block.
2. **Where they stand** — one `IssueCard` per `PlatformItem`: the promise (`detail`) and what would have
   to happen (`delivery`) run together as a single paragraph, then the arguments on both sides, then one
   source link.
3. **What to check** — `analysis.recordNote` and `analysis.openQuestions`.

There is deliberately no sources section (each issue carries its own link) and no per-page disclaimer.
The single site-wide disclaimer lives in the footer in `src/app.tsx`; the full version is on the
methodology page. Arguments are what people in the campaign say, labelled "Supporters say" / "Critics
say". They are not the guide's view, and candidates are not scored or ranked.

`#/match` (`MatchPage`) is the candidate finder. Questions live in `src/data/questions.ts`: each one
lists the positions that exist in the sources, the slate ids that state each side (`slatesA` /
`slatesB`), and any mayor whose own platform states one (`candidatesA` / `candidatesB`). Mayors are
read from their own platform and never fall back to a slate. Everyone else is read from their slate.
A stance we cannot source is `"none"`, which shows as "no stated position" — never as disagreement.
Each question is answered Yes or No; Yes backs the sourced position. Below the choices, `for` /
`against` carry the arguments each side makes, reused from the reviewed slate-pillar copy.
Every candidate is listed under the office they seek, in ballot order, with agree/disagree notes once
the reader answers. Answers persist on the device (`van26-answers` in localStorage). Readers star names into a shortlist (`src/shortlist.ts`, persisted to
localStorage, shown at `#/shortlist` grouped by office). The finder is not a score or a ranking; keep
it that way.

Selecting a candidate opens `CandidatePanel` (a `dialog.claim-panel` drawer) with the candidate's
record and, where we have no individual analysis, the shared slate positions from `SLATES`. Keep panel
copy short: two bullets per side, one clause each.

Write for a general reader: one idea per sentence, active voice, present tense, no unexplained
jargon. Define a term the first time it appears, and keep sentences under about 25 words. Prefer a
paragraph over a stack of sub-headings: a section heading, one body, and no more.

## Data

- `src/data/election.ts` — election meta, offices (1 mayor + 10 council + 7 park + 9 school), slate platforms.
- `src/data/mayor.ts` — 8 mayoral profiles with reviewed platform + analysis.
- `src/data/council.ts` (56), `park.ts` (35), `school.ts` (31) — full roster; individual analysis pending, each links to the official source.
  The fourth column of each row is a record note, not an incumbency flag: only a note starting with
  "Incumbent …" sets `incumbent`.
- Roster source: City of Vancouver declaration of election by voting + nominated-candidates list;
  candidate cards at https://vancouver.ca/plan-your-vote/index.aspx.

## Deploy

Pushes to `main` auto-deploy to GitHub Pages via `.github/workflows/deploy.yml`
(builds `dist/` in CI with Node 22 — no backend, no env vars).
