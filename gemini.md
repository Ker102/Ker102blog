# Project Progress

## Current Objective
Overhaul the professional resume (v3.0) incorporating recent AI models, Cloud/ML training workflows, and solo-author context while correctly branding Kaelux.dev, and establishing the final Hashnode build-time integration.

## Progress Summary
- Mapped Vercel build command to `npm run sync:hashnode && astro build` to automatically pull Hashnode posts at build time, replacing the cron-based commits.
- Generated Plain Text Resume 3.0 updating front-end, backend, RAG pipeline, and cloud architecture experience, including Azure ML, Unsloth QLoRA, and modern LLM APIs (Gemini 3.1 Pro, Claude 4.6).
- Authored professional Harvard-style HTML templates for both English and Estonian.
- Generated Harvard-style PDF resumes cleanly using headless Microsoft Edge rendering.
- Handled complete English to Estonian translation of technical terms and accomplishments.

## Blockers and Decisions
- **Decision:** Used a headless Edge browser to print high-quality, ATS-friendly `resume.pdf` from standard HTML templates rather than wrangling LaTeX binaries on Windows.
- **Decision:** Removed "Solo Developer" references across the portfolio entries to streamline formatting per user feedback.

## Next Steps
- User to review the 3.0 output artifacts (`docs/kristofer_jussmann_harvard_resume_3.0.pdf` and its `_EE` counterpart).
- Standby for further content pushes or additional blog synchronization needs.
