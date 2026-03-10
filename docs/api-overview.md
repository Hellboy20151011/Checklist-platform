# API Überblick

## Auth
- POST /auth/login
- POST /auth/refresh
- GET /auth/me

## Templates
- GET /templates
- POST /templates
- GET /templates/:id
- PATCH /templates/:id
- POST /templates/:id/publish

## Checklist Instances
- GET /checklists
- POST /checklists
- GET /checklists/:id
- PATCH /checklists/:id
- POST /checklists/:id/submit

## Workflow
- POST /workflow/:id/approve
- POST /workflow/:id/reject
- POST /workflow/:id/rework

## Sync
- POST /sync/push
- POST /sync/pull
