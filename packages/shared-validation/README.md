# shared-validation

Gemeinsame Validierungsregeln und DTO-Schemata für die Checklist Platform.

## Enthält
- `isValidEmail(email)` – E-Mail-Format prüfen
- `isValidPassword(password)` – Passwort-Mindestanforderungen prüfen
- `isValidUuid(value)` – UUID v4 validieren
- `isValidTemplateTitle(title, maxLength?)` – Vorlagentitel validieren
- `isValidSortOrder(sortOrder)` – Sortierreihenfolge validieren

## Verwendung

```typescript
import { isValidEmail, isValidPassword } from '@checklist-platform/shared-validation';
```
