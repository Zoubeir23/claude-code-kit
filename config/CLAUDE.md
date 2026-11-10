# Modèle de CLAUDE.md global

À copier dans `~/.claude/CLAUDE.md`, puis à adapter. Remplace les valeurs entre chevrons.

## Workflow Git : règles absolues

Ne jamais toucher une ligne de code avant d'avoir exécuté ces étapes, dans l'ordre :

```bash
git branch --show-current          # 1. sur quelle branche suis-je ?
git checkout main                  # 2. revenir sur main
git pull origin main               # 3. toujours récupérer les derniers commits
git checkout -b Feature/<code>-description   # 4. une branche par tâche (Fix/ pour un bug)
```

Ne jamais coder directement sur une branche existante, même si elle semble liée à la tâche.

## Commits

- Un changement logique = un commit, fait au fil du travail et non en bloc à la fin.
- Format du message : choisis-en un et garde-le. Par défaut, `rules/common/git-workflow.md` utilise `<type>: <description>` (feat, fix, refactor, docs, test, chore, perf, ci). Mon format personnel est `<code>-titre-court`, avec le numéro de la tâche en préfixe.
- Jamais de commit vide ou artificiel : chaque commit doit avoir un sens seul.
- Avant d'ouvrir la PR : `git rev-list --count main..HEAD`.

## Avant de coder

- Lire le code existant avant de proposer une modification.
- Identifier le pattern du projet (architecture, conventions) et ne rien supposer.
- Toute tâche de 3 étapes ou plus : planifier d'abord (fichiers touchés, risques, retour arrière).

## Vérification avant de finir

- Le code tourne sans erreur et les logs sont propres.
- Les cas limites sont gérés et les fonctionnalités existantes ne sont pas cassées.

## Correction de bugs

1. Reproduire. 2. Lire les logs. 3. Trouver la cause racine. 4. Corriger à la source, pas le symptôme.

## Règles détaillées

Le dossier `rules/` de ce kit contient les règles par thème (style, tests, sécurité, revue de code) et par langage. Copie `config/rules/` dans `~/.claude/rules/`.
