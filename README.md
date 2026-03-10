# Checklist Platform

Interne Firmenlösung für digitale Checklisten, Offline-Bearbeitung, Synchronisation und Freigabe-Workflows.

## Ziel

Die Plattform soll es ermöglichen:

- Checklisten-Vorlagen zentral durch Admins zu erstellen
- Checklisten mobil durch Techniker auszufüllen
- offline zu arbeiten
- später zu synchronisieren
- Workflows wie Einreichen, Prüfen, Freigeben und Zurückweisen abzubilden
- perspektivisch parallele Bearbeitung mit Konflikterkennung zu unterstützen

## Architektur

Dieses Repository ist als Monorepo aufgebaut.

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
