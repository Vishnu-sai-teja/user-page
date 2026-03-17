---
name: deploy-github-pages
description: Deploy a Node.js or React web app from the current workspace to GitHub Pages with repo setup, Pages workflow configuration, trigger handling, and live verification.
model: GPT-5.4 (copilot)
tools: [execute, read, edit, search, web, vscode/askQuestions, agent]
---

# Deploy To GitHub Pages

Use this prompt to deploy a buildable Node.js frontend from the current workspace to GitHub Pages in a deterministic way.
This is a workflow-automation prompt for repeated GitHub Pages deployments.

## Variables

- Workspace root: `${workspaceFolder}`
- Current repo path: `${workspaceFolder}`
- App path override: `${input:app_path:Optional app path override if the deployable app is not obvious}`
- GitHub repository URL override: `${input:github_repo_url:Optional GitHub repository URL override if origin is not the publish target}`
- Default branch override: `${input:default_branch:Optional branch override if not main}`
- Custom domain override: `${input:custom_domain:Optional custom domain override, leave blank for github.io}`

Use `${workspaceFolder}` as the current repository by default.
Infer the app path, destination GitHub repository URL, branch, and custom-domain intent from local repository state and GitHub configuration when possible.
If any inferred value is missing, invalid, or ambiguous, explicitly use `#tool:vscode/askQuestions` before continuing.

## Required Context

- Deployment skill: `.github/skills/github-pages-deploy/SKILL.md`
- Current workspace: `${workspaceFolder}`
- Current repository: `${workspaceFolder}`
- Target app path override: `${input:app_path:Optional app path override if the deployable app is not obvious}`
- Target repo override: `${input:github_repo_url:Optional GitHub repository URL override if origin is not the publish target}`

Read the deployment skill in full before execution.

## Trigger

Use this prompt when the user wants to:

- deploy a React or Node.js app to GitHub Pages
- connect a local repo to a GitHub repository and publish it
- set up or repair a GitHub Pages workflow
- verify whether a GitHub Pages deployment actually worked

Do not use this prompt for non-GitHub hosting targets.

## Result

The expected result is:

- a verified GitHub Pages deployment with workflow status and public URL
- or an exact blocker report with the failed step and next required user action

## Steps

Follow these steps in order.

### Step 1. Validate the inputs

- Treat `${workspaceFolder}` as the current repository unless repository evidence proves the deployable code lives elsewhere.
- Infer the destination repository URL from Git remotes unless `${input:github_repo_url:Optional GitHub repository URL override if origin is not the publish target}` is provided.
- Infer the app path from repository structure unless `${input:app_path:Optional app path override if the deployable app is not obvious}` is provided.
- Infer the default branch from Git state unless `${input:default_branch:Optional branch override if not main}` is provided.
- If any of these remain unclear after inspection, use `#tool:vscode/askQuestions` immediately.

### Step 2. Confirm the target app

- Read the app manifest under the inferred app path inside `${workspaceFolder}`, or under `${workspaceFolder}/${input:app_path:Optional app path override if the deployable app is not obvious}` when an override is provided.
- Confirm it is a buildable frontend app.
- If multiple app folders are plausible or the provided path is wrong, use `#tool:vscode/askQuestions`.

### Step 3. Inspect the deployment shape

- Detect package manager, build command, output directory, router mode, and framework config.
- Inspect base-path handling and static-hosting compatibility.
- Look for an existing GitHub Pages workflow or Pages-specific config before adding new files.

### Step 4. Build locally first

- Run the app build locally.
- Do not continue to deployment until the build succeeds.
- If build output is broken or asset paths are not Pages-safe, fix that first.

### Step 5. Prepare Git

- If `${workspaceFolder}` is not a Git repository, initialize it.
- Ensure generated artifacts are ignored where appropriate.
- Set or verify the inferred branch, or `${input:default_branch:Optional branch override if not main}` when provided.
- Preserve unrelated user changes.

### Step 6. Configure GitHub Pages

- Prefer a GitHub Actions Pages workflow for Node.js and React apps.
- Add or update the workflow under `.github/workflows/`.
- Adjust app config for GitHub Pages where needed, such as base path, static route handling, or fallback files.
- If `${input:custom_domain:Optional custom domain override, leave blank for github.io}` is provided, configure with care and verify that the domain requirement is intentional.
- If custom-domain intent cannot be determined confidently from the repo or hosting config, use `#tool:vscode/askQuestions` before changing Pages settings.

### Step 7. Connect and push

- Set or verify the remote for the inferred destination repository, or `${input:github_repo_url:Optional GitHub repository URL override if origin is not the publish target}` when provided.
- Commit deployment changes cleanly.
- Push the inferred branch, or `${input:default_branch:Optional branch override if not main}` when provided, to the target repository.
- If auth or network is blocked, use `#tool:vscode/askQuestions` to request the missing approval or user action.

### Step 8. Enable or trigger Pages

- Verify that GitHub Pages is enabled for the target repository.
- If push events do not create a workflow run, trigger the workflow explicitly when the environment allows it.

### Step 9. Verify the deployment

- Check the latest workflow run status.
- Check the public site URL and any redirect chain.
- Distinguish clearly between:
  - deployment succeeded and site is reachable
  - deployment succeeded but a custom domain or DNS issue blocks access
  - deployment failed before publish

### Step 10. Report the result

- Provide the deployed URL.
- Provide the workflow run URL or status.
- If something failed, provide the exact failed step and the next required action.

## Tool Usage

- Use `#tool:read` and `#tool:search` to inspect the repository and app configuration.
- Use `#tool:execute` for build, git, and deployment commands.
- Use `#tool:web` when online verification or hosted GitHub state needs to be checked.
- Use `#tool:vscode/askQuestions` without hesitation whenever the app path, GitHub repo URL, branch, or custom-domain intent cannot be inferred confidently.

## Output Contract

The final answer must include:

- deployment status
- workflow status
- public URL
- exact blocker, if any

Do not report success unless both the build and the deployment verification steps are complete.
