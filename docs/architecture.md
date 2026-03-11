# Architektur

## Überblick

Das System besteht aus drei Hauptkomponenten:

1. Admin-Webanwendung
2. Mobile Techniker-App
3. Backend-API

## Admin-Web
Verwaltung von:
- Vorlagen
- Rollen
- Benutzern
- Workflows
- Auswertungen

## Techniker-App
Funktionen:
- Login
- Checkliste auswählen
- offline bearbeiten
- Fotos/Kommentare/Unterschrift
- Synchronisieren
- Einreichen

## Backend
Domänen:
- Auth
- Users
- Templates
- Checklist Instances
- Workflow
- Sync
- Reports

## Datenhaltung
- Server: PostgreSQL
- Mobile lokal: SQLite

## Offline-First-Prinzip
Die mobile App speichert Änderungen lokal und synchronisiert bei verfügbarer Verbindung.

## Spätere Erweiterung
- Konfliktauflösung
- Dublettenerkennung
- PDF-Berichte
- Push-Benachrichtigungen
