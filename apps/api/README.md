# API

NestJS Backend-API für die Checklist Platform.

## Funktionen
- Auth (JWT mit Rollen)
- Checklisten-Vorlagen verwalten
- Checklisten-Instanzen verwalten
- Workflow-Steuerung
- Synchronisation
- Reporting

## Tech Stack
- NestJS
- TypeScript
- PostgreSQL
- TypeORM

## Setup

```bash
npm install
npm run start:dev
```

## Umgebungsvariablen

Erstelle eine `.env` Datei basierend auf `.env.example`:

```
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=checklist_platform
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=1d
```

## Modulstruktur

- `src/modules/auth` – Authentifizierung und JWT
- `src/modules/users` – Benutzerverwaltung
- `src/modules/templates` – Checklisten-Vorlagen
- `src/modules/checklists` – Checklisten-Instanzen
- `src/modules/workflow` – Workflow-Steuerung
- `src/modules/sync` – Offline-Synchronisation
