# PersonaX — Source de vérité projet

> **Règle #1** : Chaque session commence par lire ce fichier intégralement.

---

## Contexte

PersonaX est un SaaS qui prend des notes d'interviews utilisateurs brutes et génère automatiquement des **Empathy Maps**, des **Behavioral Personas** et des **Jobs To Be Done (JTBD)**. L'utilisateur colle ses notes ou uploade un fichier `.txt`/`.md`, l'IA Claude analyse et structure les insights.

Projet d'apprentissage : Claude Code + MCPs.

---

## Stack technique

| Technologie       | Version  | Notes                                    |
|-------------------|----------|------------------------------------------|
| Next.js           | 16.1.6   | App Router, Server Components par défaut |
| React             | 19.2.3   |                                          |
| TypeScript        | ^5       | Strict mode activé                       |
| Tailwind CSS      | v4       | `@import "tailwindcss"`, `@theme inline` |
| @anthropic-ai/sdk | latest   | Server-side uniquement, jamais client    |
| lucide-react      | latest   | Icônes                                   |

Path alias : `@/*` → racine du projet

---

## Architecture

```
app/
├── globals.css              Design tokens CSS (Verso DS)
├── layout.tsx               Metadata + polices (PT Serif + Inter)
├── page.tsx                 Shell state machine (input ↔ results)
└── api/analyze/route.ts     POST → Claude (server-only)

types/persona.ts             Toutes les interfaces TypeScript
lib/prompt.ts                System prompt + analyzeNotes() — SERVER ONLY

components/
├── InputPanel.tsx           "use client" — textarea + upload + submit
├── ResultsPanel.tsx         "use client" — tabs switcher
├── EmpathyMapCard.tsx       Server Component — grille empathy
├── PersonaCard.tsx          Server Component — carte persona
├── JtbdCard.tsx             Server Component — carte JTBD
└── LoadingSpinner.tsx       Server Component — spinner SVG
```

---

## Règles de code

### TypeScript
- **Strict mode activé** — pas de `any`, pas de `as unknown`, pas d'assertions de type non justifiées
- Toutes les interfaces sont dans `types/persona.ts`
- Les props de composants sont typées inline ou avec `interface`

### Server vs Client Components
- **Server Components par défaut** — ne jamais ajouter `"use client"` sans raison
- `"use client"` uniquement si le composant utilise : `useState`, `useEffect`, `useRef`, événements navigateur
- **Règle critique** : `lib/prompt.ts` et `@anthropic-ai/sdk` sont **server-only**. Ne jamais les importer dans un Client Component — cela exposerait la clé API dans le bundle navigateur
- La communication Client → Serveur se fait exclusivement via `fetch("/api/analyze")`

---

## Design System — Verso DS

**Figma source de vérité** : https://www.figma.com/design/dV25JmqLz3uy1mTiZW0EPM/%F0%9F%93%95-Verso-DS---En-construction?node-id=4008-776&m=dev

Toujours consulter ce fichier Figma en priorité pour les couleurs, la typo et les composants.

---

### Typographie

| Rôle              | Police       | Taille | Poids | Line-height |
|-------------------|--------------|--------|-------|-------------|
| Titres (h1, h2)   | PT Serif     | 30px+  | 700   | 36px        |
| Body / Labels     | Inter        | 16px   | 500   | 24px        |
| Méta / Catégories | Inter        | 12px   | 400   | uppercase   |

Polices chargées via `next/font/google` : `PT_Serif` (700) + `Inter` (400, 500).

---

### Tokens sémantiques — mode Light

Définis dans `app/globals.css` sous `:root`. Toujours utiliser ces tokens, jamais les valeurs hex directement.

#### Background

| Token CSS           | Valeur    | Source Verso DS          |
|---------------------|-----------|--------------------------|
| `--bg-default`      | `#fefdfc` | Brand Secondary 50       |
| `--bg-secondary`    | `#f6f2ee` | Brand Secondary 100      |
| `--bg-strong`       | `#d7d3ce` | Brand Secondary 300      |
| `--bg-subtle`       | `#eae9fe` | Brand Primary 100        |
| `--bg-accent-01`    | `#6237f0` | Brand Primary 700        |
| `--bg-accent-02`    | `#ef4444` | Red 500                  |
| `--bg-accent-03`    | `#120d07` | Brand Secondary 950      |
| `--bg-disabled`     | `#e4e4e7` | Gray 200                 |
| `--bg-error`        | `#fef2f2` | Red 50                   |
| `--bg-warning`      | `#fefce8` | Yellow 50                |
| `--bg-success`      | `#f4fce9` | Green 50                 |

#### Foreground (texte)

| Token CSS           | Valeur    | Source Verso DS          |
|---------------------|-----------|--------------------------|
| `--fg-default`      | `#120d07` | Brand Secondary 950      |
| `--fg-secondary`    | `#585551` | Brand Secondary 700      |
| `--fg-tertiary`     | `#837e79` | Brand Secondary 600      |
| `--fg-accent-01`    | `#fefdfc` | Brand Secondary 50       |
| `--fg-accent-02`    | `#6237f0` | Brand Primary 600        |
| `--fg-disabled`     | `#a1a1aa` | Gray 400                 |
| `--fg-error`        | `#dc2626` | Red 600                  |
| `--fg-warning`      | `#eab308` | Orange 600               |
| `--fg-success`      | `#58941c` | Green 600                |

#### Border

| Token CSS              | Valeur    | Source Verso DS          |
|------------------------|-----------|--------------------------|
| `--border-default`     | `#d7d3ce` | Brand Secondary 300      |
| `--border-secondary`   | `#ebe7e2` | Brand Secondary 200      |
| `--border-strong`      | `#c4bfba` | Brand Secondary 400      |
| `--border-accent`      | `#5e32de` | Brand Primary 700        |
| `--border-disabled`    | `#d4d4d8` | Gray 300                 |
| `--border-error`       | `#dc2626` | Red 600                  |
| `--border-warning`     | `#eab308` | Orange 600               |
| `--border-success`     | `#58941c` | Green 600                |

#### Active states

| Token CSS                   | Valeur    | Source Verso DS          |
|-----------------------------|-----------|--------------------------|
| `--active-bg-default`       | `#f6f2ee` | Brand Secondary 100      |
| `--active-bg-secondary`     | `#ebe7e2` | Brand Secondary 200      |
| `--active-bg-accent-01`     | `#451fb8` | Brand Primary 800        |
| `--active-bg-accent-02`     | `#dc2626` | Red 600                  |
| `--active-bg-accent-03`     | `#2e2b29` | Brand Secondary 800      |

#### Highlight (Empathy Map quadrants)

| Token CSS        | Valeur    | Usage PersonaX    |
|------------------|-----------|-------------------|
| `--hl-white`     | `#ffffff` |                   |
| `--hl-purple`    | `#b9b4fe` | Thinks            |
| `--hl-pink`      | `#f9a8d4` | Feels             |
| `--hl-green`     | `#d0f0a6` | Says              |
| `--hl-blue`      | `#b7e9ff` | Does              |
| `--hl-red`       | `#fca5a5` | Pains             |
| `--hl-cyan`      | `#a5f3fc` | Gains             |
| `--hl-yellow`    | `#fef08a` |                   |
| `--hl-orange`    | `#fed7aa` |                   |

---

### Composants de base

#### Carte

```css
background: var(--bg-default);
border: 1px solid var(--border-default);
border-radius: 8px;
```

#### Bouton principal (CTA)

```css
background: var(--bg-accent-01);   /* #6237f0 */
color: var(--fg-accent-01);        /* #fefdfc */
border: 1px solid var(--border-accent);
border-radius: 8px;
padding: 12px 24px;
font-weight: 500;
```

#### Hover button

```css
background: var(--active-bg-accent-01);  /* #451fb8 */
```

---

## Modèle Claude

- **Modèle** : `claude-sonnet-4-6`
- **max_tokens** : `2048`
- **Appel unique** : une seule requête retourne les 3 outputs en JSON
- **Clé API** : `ANTHROPIC_API_KEY` dans `.env.local` (jamais commitée)

---

## API Route

```
POST /api/analyze
Content-Type: application/json
Body: { "notes": "string" }

Réponses :
→ 200 { result: AnalysisResult }
→ 400 { error: "..." }  — notes trop courtes (<50) ou trop longues (>20 000 chars)
→ 500 { error: "..." }  — erreur Claude ou parse JSON
```

---

## Commandes

```bash
npm run dev    # Développement sur localhost:3000
npm run build  # Build production
npm run lint   # ESLint
```
