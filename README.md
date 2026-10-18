# lifehub
Toolsuite containing tools for (daily) life activities, like recipe platform, presents organizer, etc.

## Claude-Integration einrichten

1. [Claude GitHub App](https://github.com/apps/claude) im Repository installieren.
2. Repository-Secret `CLAUDE_CODE_OAUTH_TOKEN` anlegen (Token lokal mit `claude setup-token` erzeugen). Alternative: `ANTHROPIC_API_KEY` (dann `anthropic_api_key` in den Workflows verwenden).
3. Schnell-Setup alternativ: `/install-github-app` in Claude Code.
4. Unter Actions den Workflow „Claude – Labels anlegen“ (`claude-labels.yml`) einmalig starten.

Workflows in `.github/workflows/`:

- `claude.yml`: Kommentar, Review oder Issue mit `@claude`
- `claude-code-review.yml`: Pull Request geöffnet, aktualisiert oder wieder geöffnet
- `claude-implement.yml`: Label `claude:auto-implement`
- `claude-architect.yml`: Label `claude:auto-architect`
- `claude-labels.yml`: manuell (`workflow_dispatch`)

Ausführliche Beschreibung inkl. Issue-Lifecycle: [docs/workflow.md](docs/workflow.md)

Doku: <https://code.claude.com/docs/en/github-actions>
