---
name: about-me-problem-statement
description: Define the About Me experience brief, including the intended app path and GitHub Pages deployment target for this workspace.
model: Claude Sonnet 4.6 (copilot)
tools:
  - read
  - search
  - askQuestion
  - agent
---

# Problem Statement

## Variables

- Current repo path: `${workspaceFolder}`
- App path override: `${input:app_path:Optional app path override if the deployable app is not obvious}`
- GitHub Pages repository URL override: `${input:github_repo_url:Optional GitHub repository URL override if origin is not the publish target}`
- Default branch override: `${input:default_branch:Optional branch override if not main}`
- Custom domain override: `${input:custom_domain:Optional custom domain override, leave blank for github.io}`

Use `${workspaceFolder}` as the current repository by default.
Infer the deployable app path, GitHub repository URL, default branch, and custom-domain intent from local repository state and GitHub configuration when possible.
If any deployment-related value cannot be inferred confidently, use `#tool:askQuestion` before deployment proceeds.

Design and build a dedicated About Me experience for the current user that goes beyond a basic biography or resume summary. The goal is to present the user as a thoughtful, credible, and well-rounded professional through a polished personal page that communicates identity, background, strengths, work, and personality in a way that feels intentional and memorable.

The page should function as a strong first impression for visitors who want to quickly understand who the user is, what the user does, what kind of work the user has done, and how to get in touch. It should balance professionalism with personality. The result should not read like a generic template or a plain list of facts. Instead, it should feel like a crafted personal profile that tells a coherent story.

The About Me page must clearly answer the following questions for a visitor:

- Who is the user?
- What does the user currently do or focus on?
- What experience, interests, and strengths define the user?
- What projects, achievements, or bodies of work are worth highlighting?
- Why is the user interesting, credible, or differentiated?
- How can someone continue the conversation or reach out?

The experience should prioritize clarity, readability, and narrative flow. A visitor should be able to scan the page quickly and still come away with a strong understanding of the user. At the same time, the page should reward deeper exploration by offering enough detail to build trust and interest.

The page should include, at minimum, the following content areas:

- A strong introductory section that establishes the user’s name, role, identity, or point of view
- A concise summary that explains the user’s background, interests, and current direction
- A section covering experience, responsibilities, or meaningful past work
- A section highlighting skills, strengths, or areas of expertise
- A section showcasing projects, case studies, or notable contributions
- A section for contact information or clear next steps for reaching the user

Where content supports it, the page may also include richer supporting areas such as writing, recommendations, personal principles, curated links, bookmarks, featured highlights, or other material that helps the visitor understand the user more deeply.

The problem is not simply to place content on a page. The challenge is to shape that content into a personal experience with clear structure, strong hierarchy, and enough personality to feel authentic. The final result should communicate confidence without feeling inflated, personal without feeling casual, and detailed without becoming cluttered.

The About Me page should feel suitable for audiences such as recruiters, collaborators, hiring managers, peers, clients, or community members. Different visitors may arrive with different goals, so the page should support both quick scanning and deeper exploration. It should be easy for someone to identify the user’s profile, understand the most relevant highlights, and decide whether to reach out, continue reading, or explore further.

Success means the final page:

- gives the user a credible and distinctive online presence
- presents information in a clear and engaging way
- feels more like a living personal website than a static resume
- reflects both professional substance and personal identity
- makes projects, experience, and strengths easy to understand
- leaves the visitor with a clear sense of who the user is and what the user brings

## Deployment Intent

The current repository is `${workspaceFolder}`.

The intended application path should be inferred from the current repository unless `${input:app_path:Optional app path override if the deployable app is not obvious}` is provided.

The intended GitHub Pages destination should be inferred from the current repository remote unless `${input:github_repo_url:Optional GitHub repository URL override if origin is not the publish target}` is provided.

The intended branch should be inferred from repository state unless `${input:default_branch:Optional branch override if not main}` is provided.

If `${input:custom_domain:Optional custom domain override, leave blank for github.io}` is blank, the deployment should remain on the default GitHub Pages URL unless repository configuration proves otherwise.
If the custom-domain intent or deployment target is ambiguous, use `#tool:askQuestion` before changing Pages settings.

Final delivery should also include deploying the complete application to GitHub Pages.
