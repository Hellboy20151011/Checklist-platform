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