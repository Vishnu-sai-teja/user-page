---
name: github-pages-deploy
description: Deploy a Node.js or React web app from the current workspace to a GitHub repository using GitHub Pages. Use when the user wants Git repo setup, remote wiring, Pages workflow setup, deployment verification, or recovery from a broken GitHub Pages deployment. Do not trigger for non-GitHub hosting targets such as Vercel, Netlify, or S3.
---

# GitHub Pages Deploy

This skill standardizes GitHub Pages deployment for Node.js web apps, especially React and Vite projects.
It is a workflow-automation skill with a strict sequential flow.

## Trigger

Use this skill when the user asks to:

- deploy a React or Node.js web app to GitHub Pages
- connect a local non-git workspace to a GitHub repository for publishing
- create or fix a GitHub Pages workflow
- verify whether a GitHub Pages deployment actually succeeded
- recover from GitHub Pages issues such as missing runs, broken asset paths, or custom-domain redirects

Do not use this skill when:

- the target host is not GitHub Pages
- the repository is not a web app with a buildable frontend
- the user only wants local development setup and not deployment

## Inputs

Collect or infer these inputs before execution:

- workspace repository root
- app path inside the workspace
- GitHub repository URL
- default branch, usually `main`
- optional custom domain

Use the current workspace as the default repository root.
Infer the app path, GitHub repository URL, default branch, and custom-domain intent from local repository state and GitHub configuration when possible.
If any required input is still missing or ambiguous after inspection, explicitly use the `askQuestion` tool before proceeding.
Do not guess the destination repository or app directory when multiple plausible options exist.

## Result

The expected result is one of these two outcomes:

1. A verified GitHub Pages deployment with:
   - Git repository initialized or updated
   - remote configured
   - Pages workflow or Pages branch strategy configured
   - deployment triggered
   - public URL and workflow status confirmed
2. A precise blocker report that names the failed step, the observed evidence, and the next user action needed

## Workflow

Follow these steps in order.
Do not skip ahead.

### 1. Read the deployment prompt first

Read `.github/prompts/deploy-github-pages.prompt.md` in full before making deployment decisions.
Treat it as the task entrypoint and variable contract.

### 2. Discover the app shape

Inspect the selected app path and determine:

- package manager
- build command
- output directory
- framework and router style
- whether static hosting needs route handling changes
- whether the app already contains GitHub Pages configuration

Look for:

- `package.json`
- framework config such as `vite.config.*`
- static asset base-path handling
- router mode such as browser router vs hash router

### 3. Validate locally before deployment

Run the local build first.
Do not deploy a broken app.

Confirm:

- install is already present or can be completed
- build succeeds
- output directory is known
- generated assets use a Pages-safe base path

If the build fails, stop deployment work and fix or report the build issue first.

### 4. Prepare Git safely

If the workspace is not already a Git repository:

- initialize Git
- create or verify a sane `.gitignore`
- create the default branch, usually `main`

If the workspace is already a Git repository:

- inspect current status before editing deployment files
- preserve unrelated work
- do not overwrite existing remotes or branches without evidence and user intent

### 5. Configure GitHub Pages deployment

Prefer a GitHub Actions Pages workflow for Node.js and React apps.

Prepare:

- the workflow file under `.github/workflows/`
- any required app config changes for base paths or static routing
- any Pages-specific static files if needed, such as `.nojekyll` or route fallback assets

Choose the smallest correct deployment strategy for the app instead of forcing one template onto every repo.

### 6. Connect the remote and push

Set or verify the destination remote.
Commit deployment-related changes cleanly.
Push the deployment branch to the target repository.

If authentication or network access blocks the push:

- capture the exact error
- ask the user for approval or credentials using `askQuestion` when that runtime is available
- do not claim deployment success

### 7. Enable and trigger Pages

Confirm that GitHub Pages is configured for the repository.
For workflow-based deployments:

- ensure Pages is enabled
- ensure the build type is workflow-based when needed
- trigger the workflow if normal push events do not start it

### 8. Verify the live result

Verification is required.
Check both:

- workflow run status
- public site URL behavior

Validate:

- the latest run completed successfully
- the site URL returns the expected content or redirect chain
- custom-domain behavior is sane

### 9. Report the final state

Report one clear final state:

- deployed and reachable
- deployed but blocked by custom domain or DNS
- not deployed because of a concrete blocker

Always include the exact URL and the exact failed step when something is still broken.

## Failure Handling

Anticipate these common failure points and respond deterministically:

- Missing repo URL: use `askQuestion`
- Multiple app folders: use `askQuestion`
- Build failure: stop and fix or report before push
- Push succeeds but no workflow runs: verify Pages settings, then trigger manually if possible
- Workflow succeeds but site fails: inspect redirect chain, base path, and custom domain
- `github.io` redirects to a custom domain that does not resolve: report deployment as technically successful but publicly unreachable
- Invalid GitHub auth: report it as an external blocker, not an app failure

## Trigger Examples

These should trigger the skill:

- "deploy this React app to GitHub Pages"
- "publish this Vite repo to my GitHub repo"
- "make this local folder a git repo and host it on GitHub Pages"
- "why is my GitHub Pages workflow green but the site is still broken"

These should not trigger the skill:

- "deploy this to Vercel"
- "set up local npm scripts"
- "review my React component"

## One-Shot Example

User request:

> Deploy `about-me-carbon` from this workspace to `https://github.com/acme/user-page`.

Expected behavior:

1. Read the deployment prompt and collect variables.
2. Inspect the app and verify the build.
3. Initialize or inspect Git.
4. Add GitHub Pages workflow/config.
5. Push to the remote repository.
6. Enable or trigger Pages if needed.
7. Verify workflow status and public URL.
8. Report success or the exact blocker.
