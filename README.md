# Checklist Platform

Interne Firmenlösung für digitale Checklisten mit Offline-Bearbeitung, Synchronisation und Freigabe-Workflow.

## Ziel

Die Plattform soll es ermöglichen:

- Checklisten-Vorlagen zentral durch Admins zu erstellen
- Checklisten mobil durch Techniker auszufüllen
- offline zu arbeiten
- Änderungen später zu synchronisieren
- Workflows wie Einreichen, Prüfen, Freigeben und Zurückweisen abzubilden
- perspektivisch parallele Bearbeitung mit Konflikterkennung zu unterstützen

## Geplante Hauptkomponenten

### Admin-Web
Verwaltung von:
- Checklisten-Vorlagen
- Rollen und Benutzern
- Workflow-Regeln
- Auswertungen

### Techniker-App
Funktionen:
- Login
- Checkliste auswählen
- offline bearbeiten
- Fotos, Kommentare, Unterschrift
- Synchronisieren
- Einreichen

### Backend API
Verantwortlich für:
- Authentifizierung
- Benutzer und Rollen
- Vorlagen
- Checklisten-Instanzen
- Workflow
- Synchronisation
- Reporting

## Architektur

Dieses Repository ist als Monorepo aufgebaut.

```text
apps/
  api/             Backend API
  admin-web/       Admin-Oberfläche
  technician-app/  Mobile Techniker-App

packages/
  shared-types/       Gemeinsame Typen
  shared-validation/  Gemeinsame Validierung
```

### Apps

- `apps/admin-web`  
  Admin-Oberfläche für Vorlagen, Benutzer, Workflows und Auswertungen

- `apps/technician-app`  
  Mobile App für Techniker zur Bearbeitung von Checklisten, auch offline

- `apps/api`  
  Backend-API für Auth, Checklisten, Workflow, Synchronisation und Reporting

### Packages

- `packages/shared-types`  
  Gemeinsame Typdefinitionen

- `packages/shared-validation`  
  Gemeinsame Validierungsregeln und DTO-Schemata

## Kernfunktionen

### Admin
- Vorlagen erstellen und versionieren
- Felder und Pflichtfelder definieren
- Workflow-Regeln konfigurieren
- Benutzer und Rollen verwalten

### Techniker
- Checkliste auswählen
- offline ausfüllen
- Fotos, Kommentare, Unterschrift hinzufügen
- Checkliste einreichen

### Workflow
- Entwurf
- In Bearbeitung
- Eingereicht
- In Prüfung
- Freigegeben
- Abgelehnt
- Zur Nacharbeit zurückgegeben

### Synchronisation
- lokale Änderungen puffern
- Server-Änderungen abrufen
- automatische Zusammenführung
- Konflikte kennzeichnen
- perspektivisch Dublettenerkennung bei parallel ergänzten Punkten

## Technologiestack

- Flutter
- NestJS
- PostgreSQL
- React / Next.js
- Docker

## Projektstatus

Initiale Architektur- und MVP-Phase.

## MVP-Ziele

1. Login mit Rollen
2. Admin kann Vorlagen anlegen
3. Techniker kann Checkliste starten
4. Checkliste offline bearbeiten
5. Synchronisieren bei Verbindung
6. Checkliste einreichen
7. Prüfer kann freigeben oder zurückweisen

## Nächste Schritte

- Datenmodell definieren
- API-Struktur aufsetzen
- Flutter-App initialisieren
- Admin-Frontend initialisieren
- Auth und Rollen umsetzen
- erstes Sync-Konzept implementieren
