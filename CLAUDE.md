# Sung

## Plugin Installation (Web Environment)

`/plugin install` is unavailable here. Manual install steps:

1. Clone plugin repo to `/tmp/`
2. Copy to `.claude/plugins/<name>/` (plugin files)
3. Copy skills to `.claude/skills/<name>/` AND `~/.claude/skills/<name>/` (for Customize to see them)
4. Copy commands to `.claude/commands/` AND `~/.claude/commands/`
5. Register SessionStart hook in `.claude/settings.json`:
   `CLAUDE_PLUGIN_ROOT=.claude/plugins/<name> .claude/plugins/<name>/hooks/run-hook.cmd session-start`

## Installed Plugins

- **superpowers** (obra/superpowers v5.1.0) — 14 skills: TDD, debugging, brainstorming, etc.
- **frontend-design** (anthropics/claude-plugins-official) — distinctive UI generation
- **claude-md-management** (anthropics/claude-plugins-official) — CLAUDE.md audit + `/revise-claude-md`

## Plugin Sources

- Official: `github.com/anthropics/claude-plugins-official` (already cloned at `/tmp/claude-plugins-official`)
- Superpowers: `github.com/obra/superpowers`
