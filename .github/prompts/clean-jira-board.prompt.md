---
name: clean-jira-board
description: Clean a Jira planning hierarchy after implementation by resolving, archiving, or deleting the epic, user stories, and tasks from explicit issue IDs or from the current PRD.
model: GPT-5.4 (copilot)
tools: [read, search, vscode/askQuestions, local.mcp-bridge-new/mcp]
---

# Clean Jira Board

Use this prompt to clean the Jira planning hierarchy after implementation is complete.
This is a workflow-automation prompt for repeated Jira board cleanup.

## Variables

- Workspace root: `${workspaceFolder}`
- PRD path override: `${input:prd_path:Optional PRD path override, defaults to docs/aboutme-prd.md}`
- Jira project ID override: `${input:jira_project_id:Optional Jira project id if the target board is not obvious}`
- Jira cleanup mode: `${input:jira_cleanup_mode:Cleanup action such as done, archive, or delete}`
- Jira issue IDs override: `${input:jira_issue_ids:Optional comma-separated Jira issue keys or IDs to clean}`

Use `${workspaceFolder}` as the current repository by default.
Use `${workspaceFolder}/docs/aboutme-prd.md` as the default PRD unless `${input:prd_path:Optional PRD path override, defaults to docs/aboutme-prd.md}` is provided.
Prefer `${input:jira_issue_ids:Optional comma-separated Jira issue keys or IDs to clean}` when it is provided.
If Jira issue IDs are not provided, read the PRD and extract the Jira epic, user stories, and task issue keys from it.
If the cleanup mode, Jira project id, or issue list is missing, ambiguous, or destructive, explicitly use `#tool:vscode/askQuestions` before continuing.
Use the MCP gateway tool surface `local.mcp-bridge-new/mcp` to access the Atlassian MCP server tools for Jira lookup and cleanup.

## Trigger

Use this prompt when the user wants to:

- clean up a Jira board after implementation is complete
- close, archive, or delete Jira epic, story, and task issues created from the PRD
- resolve a finished planning hierarchy using explicit Jira issue IDs or the current PRD

Do not use this prompt for creating Jira issues or for general project planning.

## Result

The expected result is:

- the intended Jira epic, user stories, and tasks are cleaned in the requested mode
- or an exact blocker report that explains why cleanup could not be completed safely

## Steps

Follow these steps in order.

### Step 1. Resolve the cleanup target

- Treat `${workspaceFolder}` as the current repository unless repository evidence proves otherwise.
- Use `${input:jira_issue_ids:Optional comma-separated Jira issue keys or IDs to clean}` if it is provided.
- If explicit issue IDs are not provided, read `${workspaceFolder}/docs/aboutme-prd.md`, or `${input:prd_path:Optional PRD path override, defaults to docs/aboutme-prd.md}` when provided, and extract the Jira epic, story, and task IDs from the Jira sections.
- Infer the Jira project from `${input:jira_project_id:Optional Jira project id if the target board is not obvious}` or from the PRD when possible.
- If the PRD does not exist, the Jira fields are empty, or multiple issue sets are plausible, use `#tool:vscode/askQuestions` immediately.

### Step 2. Resolve the cleanup mode

- Interpret `${input:jira_cleanup_mode:Cleanup action such as done, archive, or delete}` as the intended cleanup action when it is provided.
- If no cleanup mode is provided, use `#tool:vscode/askQuestions` before making any Jira mutation.
- Treat `delete` as destructive and require explicit confirmation through `#tool:vscode/askQuestions` even if the variable was provided.
- If the Jira project supports only workflow transitions and not deletion or archival, adapt to the safest supported equivalent and report that choice.

### Step 3. Validate the issue list

- Use the MCP gateway tool surface `local.mcp-bridge-new/mcp` to confirm each epic, story, and task exists through the Atlassian MCP server tools.
- Confirm the issues belong to the intended Jira project.
- Confirm the issues match the PRD hierarchy when the PRD was used as the source.
- If any issue is missing, duplicated, already cleaned, or belongs to another board, stop and use `#tool:vscode/askQuestions`.

### Step 4. Execute the cleanup

- Use the MCP gateway tool surface `local.mcp-bridge-new/mcp` for every Jira cleanup mutation.
- For `done`, transition the epic, user stories, and tasks to the appropriate completed state in a parent-safe order.
- For `archive`, archive or otherwise retire the issues using the Jira bridge if the project supports it.
- For `delete`, remove the issues only after explicit confirmation and only for the validated issue set.
- Preserve a clear record of which issues were changed and which action was applied to each one.

### Step 5. Verify the board state

- Re-read the cleaned issues through the MCP gateway tool surface `local.mcp-bridge-new/mcp`.
- Confirm the intended action took effect for the epic, user stories, and tasks.
- If some items were cleaned and others were blocked, separate partial success from failure clearly.

### Step 6. Report the result

- Report the Jira project id used.
- Report the cleanup mode used.
- Report the epic, story, and task issue keys that were cleaned.
- Report any issues that were skipped, already resolved, or blocked.

## Tool Usage

- Use `#tool:read` and `#tool:search` to inspect the PRD and extract Jira issue references.
- Use `#tool:vscode/askQuestions` without hesitation whenever the cleanup mode, Jira project id, issue list, or destructive intent is unclear.
- Use `#tool:local.mcp-bridge-new/mcp` as the MCP gateway tool surface to access the Atlassian MCP server tools and then read, transition, archive, or delete the Jira issues.

## Examples

Example 1:
- User provides `jira_issue_ids` and `jira_cleanup_mode=done`
- Result: clean only the provided issue set after validating project membership

Example 2:
- User provides no issue IDs
- Result: read `${workspaceFolder}/docs/aboutme-prd.md`, extract the Jira keys, validate them, and clean that hierarchy

Example 3:
- User requests cleanup but does not specify whether to resolve or delete
- Result: stop and use `#tool:vscode/askQuestions` before mutating Jira

## Output Contract

The final answer must include:

- Jira project id
- cleanup mode used
- cleaned epic key
- cleaned story keys
- cleaned task keys
- exact blocker, if any

Do not report success unless the Jira mutation was verified after execution.
