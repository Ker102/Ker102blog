# Project Progress

## Current Objective
Integrate Hashnode GraphQL API to automatically sync blog posts to the Astro site at build time.

## Progress Summary
- [x] Researched project structure and Hashnode API
- [x] Extended `content.config.ts` to support `externalUrl` and `source` fields
- [x] Created `scripts/fetch-hashnode.js` build-time sync script
- [x] Created GitHub Actions workflow `.github/workflows/sync-hashnode.yml`
- [x] Updated `src/layouts/BlogPost.astro` with an external source banner
- [x] Fixed `src/pages/rss.xml.js` to exclude non-RSS fields
- [x] Verified build processes and visual appearance in dev server

## Blockers and Decisions
- **Decision:** Use Hashnode's public GraphQL API (no auth needed)
- **Decision:** Extract excerpts from the `brief` field, cleaning up the title and newlines
- **Decision:** Prefix auto-generated posts with `hn-` to avoid conflicts with manual posts

## Next Steps
- Commit and push changes
- Verify successful CI deployment
