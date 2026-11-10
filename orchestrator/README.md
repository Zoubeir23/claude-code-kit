# Orchestrateur Claude Code + Antigravity

Claude Code analyse, conçoit et écrit le code. Antigravity CLI (`agy`, modèle Gemini) sert de second avis en lecture seule, de bras d'exécution et de worker parallèle.

## Prérequis

- Claude Code, avec un `~/.claude/CLAUDE.md` (la synchronisation le lit).
- [Bun](https://bun.sh) pour lancer les scripts.
- Antigravity CLI : la commande `agy` doit répondre dans ton terminal.

## Installation

```bash
mkdir -p ~/.claude/bin ~/.claude/scripts ~/.claude/skills
cp bin/antigravity-runner ~/.claude/bin/ && chmod +x ~/.claude/bin/antigravity-runner
cp -R scripts/mesh scripts/antigravity-sync ~/.claude/scripts/
cp -R skills/orchestrator ~/.claude/skills/
bun ~/.claude/scripts/antigravity-sync/src/cli.ts
```

La dernière commande copie ta configuration Claude Code vers `~/.gemini`. Redémarre `agy` ensuite.

## Ce que la synchronisation écrit

- Tes règles dans `~/.gemini/GEMINI.md`, tes agents et tes skills dans `~/.gemini/config/`.
- Tes serveurs MCP dans `~/.gemini/config/mcp_config.json`, **avec leurs clés d'API** (droits 600). Ne versionne jamais ce fichier.
- Un hook de validation des commandes, seulement si `~/.claude/scripts/command-validator/src/cli.ts` existe. Sinon aucun hook n'est installé.

## Utilisation

L'orchestrateur ne s'active que sur demande explicite : « orchestre », « fais relire par agy », ou quand ton quota Claude baisse. Le détail des modes (`review`, `execute`, `worker`) est dans `skills/orchestrator/SKILL.md` et `scripts/mesh/README.md`.
