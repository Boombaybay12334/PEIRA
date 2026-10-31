# PEIRA Sprint 1 — agent kit

Drop this into the root of your `peira` repo. Contents:

| Path | Purpose |
|---|---|
| `AGENTS.md` | Always-on rules: stack, ADR limits, git rules, DoD, stop conditions (Copilot CLI reads this automatically) |
| `.github/skills/*/SKILL.md` | Five task-specific skills the agent loads when relevant |
| `docs/sprint-0/` | Your Phase A–D documents (the agent's source of truth) |
| `docs/sprint-01-plan.md` | Sprint 1 tickets, acceptance criteria, run order, human gates |
| `prompts/sprint-1-master.md` | The prompt you run; edit its first two lines per run |

## One-time setup (you — about 20 minutes)

```fish
# tools
sudo pacman -S --needed nodejs pnpm github-cli git
# optional container runtime for P-007: docker or podman
npm install -g @github/copilot        # or keep using `gh copilot`
copilot --version

# GitHub auth (the workflow scope is required to push .github/workflows)
gh auth login
gh auth refresh -s workflow

# repo (public, per your charter)
gh repo create peira --public --clone
cd peira
unzip ~/Downloads/peira-sprint1-kit.zip -d /tmp/kit
cp -r /tmp/kit/peira-sprint1-kit/. .
git add -A; git commit -m "chore: bootstrap docs and agent config"; git push -u origin main

# Cloudflare (dashboard needed for the API token)
npx wrangler login
npx wrangler pages project create peira --production-branch main
# Dashboard: My Profile > API Tokens > Create Token. Give it Account > Cloudflare Pages > Edit.
npx wrangler whoami                   # shows your account ID
gh secret set CLOUDFLARE_API_TOKEN    # paste when prompted
gh secret set CLOUDFLARE_ACCOUNT_ID   # paste when prompted
```

Optional but useful MCP servers (inside a Copilot session run `/mcp add`): **Context7** (`npx -y @upstash/context7-mcp`) so the agent reads current Astro/Tailwind docs, and **Playwright** (`npx @playwright/mcp@latest`) so it can screenshot at 360px.

## Running a sprint run

Edit line 1 of `prompts/sprint-1-master.md` for each run (see the table in `docs/sprint-01-plan.md`).

```fish
cd ~/path/to/peira
copilot --allow-all-tools --allow-all-urls \
  --deny-tool='shell(git push --force)' --deny-tool='shell(rm -rf)' \
  --max-autopilot-continues 30
```

Inside the session:
1. `Shift+Tab` until you're in **plan mode**.
2. Type: `Execute @prompts/sprint-1-master.md`
3. Answer its questions, read the plan, then choose **Accept plan and build on autopilot**.

Headless alternative (no plan review): 
```fish
copilot --autopilot --allow-all-tools --allow-all-urls --max-autopilot-continues 30 \
  -p "Read prompts/sprint-1-master.md and execute it exactly."
```

`--allow-all-paths` is deliberately left off so the agent stays inside the repo folder. Run `copilot --help` if a flag name has changed.

## Between runs
Read the final report, open the PRs/diffs, do the phone checks it lists, then edit the TICKETS line and start the next run.
