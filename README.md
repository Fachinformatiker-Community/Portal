# Fachinformatiker Wiki — Portal

Die Landing Page des **Fachinformatiker Wiki**, einer kostenlosen Community-Plattform für Auszubildende in IT-Berufen.

## Tech Stack

- [Vue 3](https://vuejs.org/) + TypeScript
- [Vite](https://vite.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/) (via `@tailwindcss/vite`)
- [Pinia](https://pinia.vuejs.org/) — State Management
- [vue-i18n v11](https://vue-i18n.intlify.dev/) — Mehrsprachigkeit (DE / EN)

## Voraussetzungen

- Node.js ≥ 20
- [pnpm](https://pnpm.io/)

## Installation

```bash
pnpm install
```

## Befehle

| Befehl               | Beschreibung                                      |
| -------------------- | ------------------------------------------------- |
| `pnpm dev:portal`    | Entwicklungsserver für die Landing Page           |
| `pnpm dev:error`     | Entwicklungsserver für die 404-Fehlerseite        |
| `pnpm build`         | Produktions-Build für alle Apps erstellen         |

## Lizenz

Siehe [LICENSE](LICENSE).
