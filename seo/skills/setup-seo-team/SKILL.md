---
name: setup-seo-team
description: "Installe l'équipe de 32 agents SEO et le serveur MCP Google Search Console gratuit (mcp-search-console) pour Claude Code. À utiliser pour configurer le SEO sur une nouvelle machine."
---

Tu es l'installateur de l'équipe SEO. Objectif : 32 agents SEO et le serveur MCP Google Search Console opérationnels, sans service payant.

Avance étape par étape. Après chaque étape, vérifie le résultat avant de passer à la suivante. Ne lis jamais le contenu de la clé du compte de service, ne l'affiche jamais, ne la génère jamais toi-même.

## 1. Prérequis

Vérifie avec Bash, installe ce qui manque :

- `uv` (fournit `uvx`) : `brew install uv` sur macOS, ou `curl -LsSf https://astral.sh/uv/install.sh | sh`
- `python3` en version 3.11 ou plus, `git`, `jq`
- Note le chemin complet de uvx : `which uvx`

## 2. Clé du compte de service Google Cloud

Si l'utilisateur n'a pas encore de clé, guide-le :

1. Google Cloud Console : crée un projet, puis active l'API Search Console (`searchconsole.googleapis.com`).
2. Identifiants, Créer des identifiants, Compte de service. Crée-le, puis onglet Clés, Ajouter une clé, JSON.
3. Le fichier téléchargé doit être placé à `~/.claude/mcp-gsc/service_account.json`.

Ensuite :

1. Restreins les droits : `chmod 600 ~/.claude/mcp-gsc/service_account.json`
2. Si `~/.claude` est un dépôt Git, vérifie que la clé est ignorée : `git -C ~/.claude check-ignore -q mcp-gsc/service_account.json`. Sinon, ajoute `mcp-gsc/` au `.gitignore` avant toute autre action.
3. Affiche l'adresse du compte de service, et uniquement elle : `jq -r .client_email ~/.claude/mcp-gsc/service_account.json`
4. Demande à l'utilisateur d'ajouter cette adresse dans Google Search Console, Paramètres, Utilisateurs et autorisations, avec le rôle **Propriétaire** (le serveur n'a besoin que de lecture, mais le rôle Complet suffit aussi). Attends sa confirmation.

## 3. Serveur MCP Search Console

```bash
claude mcp add gsc -s user \
  -e GSC_CREDENTIALS_PATH="$HOME/.claude/mcp-gsc/service_account.json" \
  -e GSC_SKIP_OAUTH=true \
  -- uvx mcp-search-console
```

`-s user` est obligatoire : sans lui, le serveur n'existe que dans le dossier courant. Si `claude mcp list` n'affiche pas `gsc` comme connecté, demande à l'utilisateur de relancer Claude Code, puis relance `claude mcp list`.

Par défaut, les outils d'ajout et de suppression (sites, sitemaps) sont bloqués. C'est voulu : n'active `GSC_ALLOW_DESTRUCTIVE=true` que si l'utilisateur le demande explicitement.

## 4. Agents SEO

Copie les agents du kit dans le dossier des agents de l'utilisateur :

```bash
mkdir -p ~/.claude/agents
cp seo/agents/seo-*.md ~/.claude/agents/
ls ~/.claude/agents/seo-*.md | wc -l
```

32 fichiers sont attendus. Si l'utilisateur veut les agents pour un seul projet, copie-les dans `.claude/agents/` à la racine du projet.

## 5. Validation

1. Appelle l'outil MCP `list_properties` du serveur `gsc`.
2. Si le site apparaît, invite l'utilisateur à se placer à la racine de son site et à lancer : « Utilise seo-directeur pour faire le point sur mon site et me proposer les 3 actions de la semaine. »
3. Si aucune propriété n'apparaît, rappelle-lui d'ajouter l'adresse de l'étape 2 dans Search Console, puis de réessayer quelques minutes plus tard (la propagation n'est pas immédiate).
