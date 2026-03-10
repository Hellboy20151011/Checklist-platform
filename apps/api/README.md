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
# 1. PostgreSQL starten (via Docker Compose im Repo-Root)
docker compose up -d

# 2. .env Datei anlegen
cp .env.example .env

# 3. Abhängigkeiten installieren
npm install

# 4. Initialen Admin-Benutzer anlegen
npm run seed

# 5. API starten
npm run start:dev
```

## Umgebungsvariablen

Erstelle eine `.env` Datei basierend auf `.env.example`:

```
PORT=3000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=checklist_platform
DB_SSL=false

JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=1d

CORS_ORIGIN=http://localhost:4000
```

## Datenbank-Seed

Das Seed-Skript legt einen initialen Admin-Benutzer an:

```bash
npm run seed
```

Standardmäßig wird folgender Benutzer erstellt:
- **E-Mail:** `admin@checklist.local`
- **Passwort:** `Admin1234!`

Die Zugangsdaten können über Umgebungsvariablen überschrieben werden:
```
SEED_ADMIN_EMAIL=mein-admin@firma.de
SEED_ADMIN_PASSWORD=MeinSicheresPasswort!
SEED_ADMIN_NAME=Max Mustermann
```

## API-Endpunkte

### Health
| Methode | Pfad              | Auth | Beschreibung        |
|---------|-------------------|------|---------------------|
| GET     | /api/health       | –    | Healthcheck         |

### Auth
| Methode | Pfad                  | Auth | Beschreibung         |
|---------|-----------------------|------|----------------------|
| POST    | /api/auth/login       | –    | Login, gibt JWT zurück |
| GET     | /api/auth/status      | –    | Auth-Modul-Status    |

### Users
| Methode | Pfad              | Auth         | Beschreibung           |
|---------|-------------------|--------------|------------------------|
| POST    | /api/users        | JWT + ADMIN  | Neuen Benutzer anlegen |
| GET     | /api/users        | JWT + ADMIN  | Alle Benutzer auflisten |
| GET     | /api/users/:id    | JWT + alle   | Benutzer nach ID       |

### Templates
| Methode | Pfad                  | Auth | Beschreibung              |
|---------|-----------------------|------|---------------------------|
| GET     | /api/templates        | –    | Alle Vorlagen auflisten    |
| GET     | /api/templates/:id    | –    | Vorlage nach ID            |

### Checklists
| Methode | Pfad                   | Auth | Beschreibung                   |
|---------|------------------------|------|--------------------------------|
| GET     | /api/checklists        | –    | Alle Instanzen auflisten       |
| GET     | /api/checklists/:id    | –    | Instanz nach ID                |

### Workflow
| Methode | Pfad                                | Auth | Beschreibung              |
|---------|-------------------------------------|------|---------------------------|
| GET     | /api/workflow/instance/:instanceId  | –    | Events einer Instanz       |

### Sync
| Methode | Pfad              | Auth | Beschreibung        |
|---------|-------------------|------|---------------------|
| GET     | /api/sync/status  | –    | Sync-Modul-Status   |

## Modulstruktur

- `src/modules/auth` – Authentifizierung und JWT
- `src/modules/users` – Benutzerverwaltung
- `src/modules/templates` – Checklisten-Vorlagen
- `src/modules/checklists` – Checklisten-Instanzen
- `src/modules/workflow` – Workflow-Steuerung
- `src/modules/sync` – Offline-Synchronisation
- `src/database` – Seed-Skript
- `src/health` – Healthcheck-Endpunkt

