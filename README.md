# Claude Code Kit

Ma configuration Claude Code, prête à copier : une équipe SEO connectée à Google Search Console, l'orchestration avec Antigravity CLI, des agents de revue de code et des règles de codage par langage.

| Dossier | Contenu |
|---|---|
| `seo/` | 32 agents SEO + le skill `setup-seo-team` qui installe le serveur MCP Google Search Console |
| `orchestrator/` | Skill `orchestrator`, runner et synchronisation vers Antigravity CLI (`agy`) |
| `review/agents/` | 16 agents : revue de code, sécurité, TDD, planification, un relecteur par langage |
| `config/` | Modèle de `CLAUDE.md` et règles de codage (common + 11 langages) |

## Installer l'équipe SEO avec Claude Code

```bash
git clone https://github.com/Zoubeir23/claude-code-kit.git
cd claude-code-kit
mkdir -p ~/.claude/skills && cp -R seo/skills/setup-seo-team ~/.claude/skills/
```

Lance ensuite Claude Code dans ce dossier et demande : « Utilise le skill setup-seo-team pour installer l'équipe SEO. » Le skill fait les étapes : prérequis, clé Google Cloud (que tu fournis toi-même), serveur MCP, copie des 32 agents, validation.

## Installer le reste

```bash
cp review/agents/*.md ~/.claude/agents/
mkdir -p ~/.claude/rules && cp -R config/rules/* ~/.claude/rules/
cp config/CLAUDE.md ~/.claude/CLAUDE.md   # à adapter, puis à renommer si tu as déjà un CLAUDE.md
```

L'orchestrateur demande Antigravity CLI et Bun : voir [orchestrator/README.md](orchestrator/README.md).

## Sécurité

Le kit ne contient aucune clé. La clé du compte de service Google reste sur ta machine (`~/.claude/mcp-gsc/`, droits 600, jamais dans Git).

## Licence et attributions

MIT. Détail des sources dans [NOTICE.md](NOTICE.md).
