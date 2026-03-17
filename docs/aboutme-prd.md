# About Me PRD

## Title

Graduate AI Engineer About Me: Professional Identity Landing Experience for Vishnu Sai Teja Nagabandi

## Jira Project

- Jira project ID: NAIS

## Problem Statement

Vishnu Sai Teja Nagabandi is a Graduate AI Engineer with production experience in multi-agent systems, voice AI, document intelligence, computer vision, and ML infrastructure. He does not yet have a personal About Me page that presents him as a credible, distinctive professional. The goal is to build a polished personal page that goes beyond a resume summary — communicating identity, background, strengths, featured work, and personality in a way that feels intentional and rewards both quick scanning and deeper exploration.

The page must answer for any visitor: who Vishnu is, what he currently does, what experience and strengths define him, what work he has done that is worth noticing, and how to reach him.

## Goals

- Give Vishnu a credible and distinctive professional presence
- Present his identity, current role at SAGE, and graduate AI engineering focus clearly and immediately
- Showcase his featured projects (Multi-Agent Resume Parser, Staffusion, Skin Cancer Detection) with enough context to be meaningful to both technical and non-technical visitors
- Include curated recommendations as a personality signal
- Make contact easy, visible, and low friction
- Feel more like a living personal website than a static resume

## Non-Goals

- This is not a resume PDF or download experience
- This is not a blog or content publishing platform
- This does not cover multi-page routing or sub-domain setup beyond the About Me page
- This does not include a portfolio CMS or dynamic content editing interface
- Technology stack selection, component choices, and deployment mechanics are out of scope for this PRD

## Target Audience

- Recruiters and hiring managers exploring Vishnu's profile
- Engineers, collaborators, or researchers evaluating technical credibility
- Peers and community members who want to understand his background and interests
- Anyone who arrives via a shared link and needs a quick, accurate picture of who Vishnu is

## User Needs

- Quickly understand Vishnu's name, title, and professional focus without reading the whole page
- Get a confident understanding of his experience, trajectory, and current work
- Assess the depth and relevance of his AI/ML skills and tooling familiarity
- See the actual projects he has built with enough context to judge quality and scope
- Learn something about Vishnu as a person through his recommendations
- Find a clear and low-friction way to reach out or continue the conversation

## Experience Principles

- Clarity first: every section should be scannable at a glance; a visitor should leave with a strong impression even if they only spend 30 seconds
- Specific over generic: avoid template-feel language; every statement should reflect Vishnu's actual work and identity
- Narrative flow: the page should tell a coherent story from identity → experience → work → personality → contact
- Intentional personality: recommendations and personal touches should feel curated, not decorative
- Confidence without inflation: present strengths confidently but let the work speak for itself
- Reward deeper exploration: offer enough detail that a visitor who reads more comes away more impressed, not more overwhelmed

## Scope Summary

The About Me page must include:

1. **Hero/Intro section** — name, title (Graduate AI Engineer), role tagline, and an opening professional summary (2–3 sentences covering background, current direction at SAGE, and domain focus)
2. **Experience section** — chronological roles at SAGE, PIBIT, and AiDash, presented as impact-oriented highlights rather than duty lists
3. **Skills section** — technical capabilities organized by category (languages, frameworks, libraries, cloud) to signal depth and breadth
4. **Projects section** — three featured AI/ML projects: Multi-Agent Resume Parser, Staffusion, and Skin Cancer Detection, each with problem, approach, and outcome framing
5. **Recommendations section** — curated books and movies as a genuine personality window, not filler
6. **Contact section** — clear call to action to reach out via email, signalling openness to recruiters, collaborators, and peers

## Delivery Hierarchy

### Epic 1

#### Objective

Design and deliver a complete, polished About Me page for Vishnu Sai Teja Nagabandi that functions as a credible professional presence — covering identity, experience, AI/ML projects, recommendations, and contact.

#### Outcome

A visitor arriving at the page comes away with a confident, specific, and memorable picture of who Vishnu is, what he has built, and how to reach him.

#### Jira Record

- Issue type: Master Epic (Jira mapped "Epic" type to "Master Epic" in the NAIS project hierarchy; adapted accordingly — see Assumptions section)
- Issue key: NAIS-89
- Issue title: Graduate AI Engineer About Me: Professional Identity Landing Experience for Vishnu Nagabandi

---

### Story 1.1

#### Description

When a visitor lands on the About Me page, they can immediately understand who Vishnu is — a Graduate AI Engineer focused on multi-agent systems, voice AI, and document intelligence. The page opens with a strong identity statement, a concise professional summary covering his background and current direction at SAGE, and clearly presented experience timeline and technical skills.

#### Value

A visitor should be able to scan this portion of the page in under a minute and leave with a confident picture of Vishnu's professional identity.

#### Jira Record

- Issue type: Story
- Issue key: NAIS-90
- Issue title: Visitor can quickly understand who Vishnu is, what he does, and what makes him credible as a Graduate AI Engineer
- Parent epic: NAIS-89 (linked via FeatureLink "is part of")

##### Task 1.1.1

###### Jira Record

- Issue type: Sub-task
- Issue key: NAIS-92
- Issue title: Define hero section content: identity statement, role tagline, and opening summary narrative
- Parent story: NAIS-90

##### Task 1.1.2

###### Jira Record

- Issue type: Sub-task
- Issue key: NAIS-93
- Issue title: Define experience timeline and technical skills section content hierarchy and emphasis
- Parent story: NAIS-90

---

### Story 1.2

#### Description

A visitor who wants to go deeper can explore Vishnu's three featured AI/ML projects (Multi-Agent Resume Parser, Staffusion, and Skin Cancer Detection), browse his curated book and movie recommendations as a window into his personality, and find a clear, low-friction way to reach out or continue the conversation.

#### Value

Visitors can assess Vishnu's hands-on AI work, get a genuine sense of his character through his recommendations, and reach out without friction.

#### Jira Record

- Issue type: Story
- Issue key: NAIS-91
- Issue title: Visitor can explore Vishnu's featured AI projects and recommendations and find a clear path to reach out
- Parent epic: NAIS-89 (linked via FeatureLink "is part of")

##### Task 1.2.1

###### Jira Record

- Issue type: Sub-task
- Issue key: NAIS-94
- Issue title: Define projects section content showcasing Multi-Agent Resume Parser, Staffusion, and Skin Cancer Detection
- Parent story: NAIS-91

##### Task 1.2.2

###### Jira Record

- Issue type: Sub-task
- Issue key: NAIS-95
- Issue title: Define recommendations and contact sections with personality framing and clear outreach pathways
- Parent story: NAIS-91

---

## Jira Delivery Summary

- Epic: NAIS-89 (Master Epic)
- User stories: NAIS-90, NAIS-91
- Tasks: NAIS-92, NAIS-93, NAIS-94, NAIS-95 (4 Sub-tasks total)
- Notes: The NAIS Jira project maps the "Epic" issue type to "Master Epic" in its hierarchy. Stories were linked to the Master Epic using the FeatureLink relationship ("is part of / is broken into"). Tasks were created as Sub-tasks with direct parent links to their respective stories. This is the closest valid structure and faithfully represents the intended Epic → Story → Task delivery hierarchy.

## Acceptance Criteria

- The page opens with a clear identity statement that names Vishnu, his title, and his domain focus within the first visible viewport
- A visitor with no prior knowledge of Vishnu can accurately describe his role, employer, and key AI skills after reading the hero and summary sections
- The experience section covers all three roles (SAGE, PIBIT, AiDash) and communicates what Vishnu actually built at each, not just job titles
- The skills section is organized by category and includes Python, PyTorch, LangChain, LangGraph, FastAPI, Docker, AWS, and Azure at minimum
- All three featured projects (Multi-Agent Resume Parser, Staffusion, Skin Cancer Detection) are present with problem, approach, and outcome context
- The recommendations section presents both book and movie picks in a way that reads as intentional personality, not boilerplate
- The contact section includes Vishnu's email and a visible call to action inviting outreach from recruiters, collaborators, and peers
- The page is readable and well-structured on a standard desktop browser
- The page does not feel like a generic resume template; it reads like a crafted personal profile

## Assumptions and Open Questions

- **Assumption:** The user profile at `docs/user-profile.md` is current and approved as the canonical source of content for this About Me page.
- **Assumption:** GitHub links for projects (Multi-Agent Resume Parser, Staffusion) will be provided by Vishnu before the projects section is finalized.
- **Assumption:** The page is a single-page experience unless a builder agent determines multi-route navigation is clearly needed.
- **Open question:** Should the recommendations section display cover art or metadata fetched from public APIs (e.g., Open Library), or should it remain a curated list with minimal visual treatment?
- **Open question:** Is a phone number (+91 8978044062) intended to be visible on the public page, or should contact be limited to email?
- **Jira hierarchy adaptation:** NAIS does not support standard "Epic" issue type at story-parent level; "Epic" was mapped to "Master Epic" by the project schema. Stories were linked to the Master Epic via FeatureLink. This should be noted in sprint planning so Jira boards are configured to surface the FeatureLink relationship correctly.

## Deployment Note

Deploy the complete application to GitHub Pages.
