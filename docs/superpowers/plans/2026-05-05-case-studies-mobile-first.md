# Case Studies Mobile First Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a mobile-first case studies evidence hub that follows the professional case-study template for PromptTriage and improve responsive UX across every existing page.

**Architecture:** Keep the Astro site static and dependency-light. Add one new page at `src/pages/case-studies.astro`, update shared navigation in `Header.astro`, add homepage discoverability in `index.astro`, and tune existing page styles for mobile-first readability. Add a Node verification script that checks the route and template-critical source content.

**Tech Stack:** Astro 5, page-level Astro styles, global CSS, existing Motion package, Node verification script, `npm run build`.

---

## File Structure

- Create `src/pages/case-studies.astro`: full evidence hub page with PromptTriage template sections, project evidence cards, future pipeline, metadata, and mobile-first CSS.
- Modify `src/components/Header.astro`: add Case Studies nav link, improve fixed header/mobile bottom nav spacing, smoother hover/focus states, and reduced-motion support.
- Modify `src/components/HeaderLink.astro`: improve active/focus transitions without conflicting with the header island styles.
- Modify `src/pages/index.astro`: add Case Studies card and improve mobile card grid, hover states, and reduced-motion behavior.
- Modify `src/pages/portfolio.astro`: make custom portfolio header/nav and dense project sections wrap cleanly on phones.
- Modify `src/pages/blog/index.astro`: reduce mobile padding and make recent posts usable as a non-sticky mobile section.
- Modify `src/layouts/BlogPost.astro`: improve mobile prose spacing, title sizing, source banner wrapping, and hero image behavior.
- Modify `src/components/Footer.astro`: improve focus states and small-screen spacing.
- Modify `src/styles/global.css`: add mobile-first global defaults for focus states, text wrapping, media overflow, and base typography.
- Create `scripts/verify-case-studies.mjs`: source-level regression checks for page existence, required case-study template sections, nav/home links, and mobile-first CSS markers.
- Modify `package.json`: add `verify:case-studies` script.
- Modify `docs/superpowers/specs/2026-05-05-case-studies-evidence-hub-design.md`: keep the amended spec in the implementation commit.

## Task 1: Add Failing Source Verification

**Files:**
- Create: `scripts/verify-case-studies.mjs`
- Modify: `package.json`

- [x] **Step 1: Create the verification script**

```js
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const exists = (file) => fs.existsSync(path.join(root, file));

const checks = [
  {
    name: 'case studies route exists',
    pass: () => exists('src/pages/case-studies.astro'),
  },
  {
    name: 'case studies page follows required template sections',
    pass: () => {
      const page = read('src/pages/case-studies.astro');
      return [
        'Executive summary',
        'Problem',
        'Context and constraints',
        'Requirements',
        'Architecture',
        'Security model',
        'Deployment pipeline',
        'Operations',
        'Cost analysis',
        'Results',
        'Tradeoffs',
        'Failure modes and lessons learned',
        'What I would improve next',
        'Repository and demo links',
        'Interview explanation',
        'Resume bullets',
      ].every((section) => page.includes(section));
    },
  },
  {
    name: 'case studies page has evidence statuses and mobile-first CSS',
    pass: () => {
      const page = read('src/pages/case-studies.astro');
      return [
        'Complete case study',
        'Source verified',
        'Case study in progress',
        '@media (min-width:',
        'grid-template-columns',
      ].every((token) => page.includes(token));
    },
  },
  {
    name: 'shared header links to case studies',
    pass: () => read('src/components/Header.astro').includes('href="/case-studies"'),
  },
  {
    name: 'homepage links to case studies',
    pass: () => read('src/pages/index.astro').includes('href="/case-studies"'),
  },
  {
    name: 'mobile-first pass touched all page surfaces',
    pass: () => {
      const files = [
        'src/pages/index.astro',
        'src/pages/portfolio.astro',
        'src/pages/blog/index.astro',
        'src/layouts/BlogPost.astro',
        'src/components/Header.astro',
        'src/components/Footer.astro',
        'src/styles/global.css',
      ];
      return files.every((file) => read(file).includes('@media'));
    },
  },
];

const failures = checks.filter((check) => {
  try {
    return !check.pass();
  } catch {
    return true;
  }
});

if (failures.length > 0) {
  console.error('Case studies verification failed:');
  for (const failure of failures) console.error(`- ${failure.name}`);
  process.exit(1);
}

console.log(`Case studies verification passed: ${checks.length}/${checks.length} checks`);
```

- [x] **Step 2: Add npm script**

Add this script to `package.json`:

```json
"verify:case-studies": "node scripts/verify-case-studies.mjs"
```

- [x] **Step 3: Run and verify RED**

Run: `npm run verify:case-studies`

Expected: FAIL because `src/pages/case-studies.astro` does not exist yet and links are missing.

## Task 2: Build the Case Studies Evidence Hub

**Files:**
- Create: `src/pages/case-studies.astro`

- [x] **Step 1: Create the page**

Implement:
- Astro frontmatter importing `BaseHead`, `Header`, and `Footer`.
- Local arrays for project evidence cards and template sections.
- PromptTriage featured case study with every required template heading.
- Mermaid-like visual architecture built with semantic HTML/CSS, not external scripts.
- Mobile-first CSS, then `@media (min-width: 760px)` and `@media (min-width: 1040px)` enhancements.

- [x] **Step 2: Run verification**

Run: `npm run verify:case-studies`

Expected: still FAIL until header and homepage links are added.

## Task 3: Update Shared Header and Homepage Discovery

**Files:**
- Modify: `src/components/Header.astro`
- Modify: `src/components/HeaderLink.astro`
- Modify: `src/pages/index.astro`

- [x] **Step 1: Add nav link**

Add `<HeaderLink href="/case-studies">Case Studies</HeaderLink>` between Portfolio and About.

- [x] **Step 2: Improve header mobile behavior**

Update CSS so mobile nav uses compact spacing, safe-area bottom padding, horizontal overflow protection, touch-friendly targets, and focus-visible outlines.

- [x] **Step 3: Add homepage Case Studies card**

Add a fourth glass card linking to `/case-studies`, using evidence-focused copy and the same card pattern.

- [x] **Step 4: Run verification**

Run: `npm run verify:case-studies`

Expected: PASS if required page content and links exist.

## Task 4: Apply Mobile-First Fixes Across Existing Pages

**Files:**
- Modify: `src/styles/global.css`
- Modify: `src/pages/portfolio.astro`
- Modify: `src/pages/blog/index.astro`
- Modify: `src/layouts/BlogPost.astro`
- Modify: `src/components/Footer.astro`

- [x] **Step 1: Global CSS**

Add mobile-safe defaults for text wrapping, media overflow, focus-visible, responsive typography, and `prefers-reduced-motion`.

- [x] **Step 2: Portfolio**

Make the custom portfolio header wrap, reduce mobile heading sizes, allow social/CV buttons to wrap, make upcoming certifications stack, and keep stack cards readable at narrow widths.

- [x] **Step 3: Blog index**

Reduce mobile article padding, keep content before recent posts, and convert recent-post navigation into a full-width mobile panel.

- [x] **Step 4: Blog post layout**

Improve title sizing, prose padding, hero image spacing, and external banner wrapping on narrow screens.

- [x] **Step 5: Footer**

Add focus-visible and touch-friendly hover/focus behavior.

## Task 5: Build and Responsive Verification

**Files:**
- No new files unless a build issue requires a targeted fix.

- [x] **Step 1: Run source verification**

Run: `npm run verify:case-studies`

Expected: PASS with all checks.

- [x] **Step 2: Run production build**

Run: `npm run build`

Expected: Astro build completes successfully.

- [x] **Step 3: Launch local server**

Run: `npm run dev -- --host 127.0.0.1`

Expected: local Astro dev server URL is available.

- [x] **Step 4: Browser responsive check**

Open and inspect:
- `/`
- `/case-studies`
- `/portfolio`
- `/blog`
- one blog post route
- `/about`

Check mobile width around 390px and desktop width around 1440px for no horizontal overflow, readable nav, and content not hidden behind fixed navigation.

## Self-Review

Spec coverage:
- Template sections are covered by Task 2 and verified by Task 1.
- Evidence hub is covered by Task 2.
- Homepage/nav polish is covered by Task 3.
- Mobile-first all-pages pass is covered by Task 4 and browser verification in Task 5.

Placeholder scan:
- The plan contains no deferred implementation placeholders. The only intentional future-facing status is for public case studies that are not complete yet.

Type consistency:
- File paths and npm script names are consistent across tasks.
