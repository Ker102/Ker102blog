# Case Studies Evidence Hub Design

Date: 2026-05-05
Status: approved for planning

## Objective

Add a `/case-studies` page that helps hiring managers and technical reviewers quickly understand the strongest project evidence without overstating unfinished case studies. The page should treat PromptTriage as the complete featured case study and present Kaelux.dev, ViperMesh, and n8n Automation Atlas as verified project evidence cards with clear status labels.

Also improve the homepage and navigation with restrained UI/UX polish: smoother navbar behavior, clearer buttons, better hover/focus affordances, and reduced-motion-safe microinteractions.

## Audience

Primary audience:
- Hiring managers who skim for impact, technical scope, and proof.
- Engineers who inspect architecture, repositories, and tradeoffs.

Secondary audience:
- Recruiters who need a fast signal of project relevance.
- Visitors coming from GitHub, LinkedIn, Hashnode, or Vercel-hosted pages.

## Current Context

The site is an Astro project with page-level styles and a shared `Header.astro` navigation component. The homepage already uses a clean glass-inspired layout and Motion for initial reveal animations. Portfolio content currently lists projects and certifications, but the information is dense and not shaped as case-study evidence.

Local evidence inspected:
- PromptTriage README and research progress notes.
- Kaelux.dev README.
- ViperMesh README/security/setup docs.
- n8n Automation Atlas README.
- Career execution pack case-study and repo documentation standards.

## Page Approach

Use an evidence hub rather than a strict case-study index.

The page will include:
- Hero: "Case Studies & Project Evidence" with a concise positioning statement.
- Trust strip: short evidence categories such as systems, research, deployment, operations, and documentation.
- Featured case study: PromptTriage, labeled "Complete case study", with metrics and links.
- Project evidence grid: Kaelux.dev, ViperMesh, and n8n Automation Atlas, each with problem, system type, stack, evidence links, and status.
- Future pipeline: lab projects and upcoming structured studies, clearly marked as planned.
- CTA band: links to portfolio, GitHub, and contact/social profile.

Status labels should be explicit:
- Complete case study
- Source verified
- Case study in progress
- Planned

## Content Rules

Do not invent results. Use only claims supported by local docs, project READMEs, public repo links, or existing resume/cv files.

PromptTriage may include research metrics from local research notes, including the 28K+ prompt corpus, Pinecone RAG pipeline, modality-specific optimization, and completed study results. Where results are nuanced, the copy should preserve the nuance rather than cherry-picking.

Kaelux.dev should be presented as an AI engineering agency/platform site with diagnostic agent, wiki/GEO content, DigitalOcean deployment, CI/CD, and featured project hub, based on its README.

ViperMesh should use the current name, not ModelForge, while acknowledging it is an AI-powered Blender assistant/neural 3D workflow product.

n8n Automation Atlas should be described as a workflow library/explorer and dataset-style project, not as a full case study yet.

## Navigation

Add "Case Studies" to the shared header between Portfolio and About. Keep mobile bottom navigation usable by preventing label crowding.

Navbar improvements:
- Smoother hover and active transitions.
- Better backdrop/shadow behavior on scroll or hover.
- Keyboard focus states for nav links and social actions.
- Reduced-motion fallback.

## Homepage Polish

Add a Case Studies card to the homepage grid so the new page is discoverable from the first screen.

Improve component interactivity:
- Slightly richer card hover states with stable transforms.
- Button/link arrow movement on hover.
- Pointer-light or subtle sheen effect if it does not hurt readability.
- Focus-visible styles for keyboard navigation.
- Reduced-motion mode that keeps the layout stable.

Avoid broad redesign. Preserve the current clean glass visual direction.

## Components and Data

Prefer a local data array inside the case studies page for the first pass. If the page grows into individual case-study routes later, extract project metadata into a shared content/data module.

No new dependency is required. Use Astro, CSS, and existing Motion usage.

## Testing and Validation

Run:
- `npm run build`

Manual checks:
- Homepage renders with the new case studies card.
- `/case-studies` is accessible.
- Header active states work on `/case-studies`.
- Mobile navigation remains usable.
- Reduced-motion styles do not hide content.
- External links open correctly and internal links route locally.

## Risks

The largest content risk is overclaiming unfinished case studies. The design mitigates this with status labels and evidence links.

The largest UI risk is making the glass style feel noisy. Motion and hover effects should stay restrained and use transform/opacity rather than layout-changing properties.

## Out of Scope

This change will not create full long-form individual case-study pages for every project. It will not rewrite the whole portfolio page. It will not inspect every source file in each external project unless a claim requires it.
