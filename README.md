# Unlitimate Transpo

Unlitimate Transpo is a production-oriented transport management platform for transport business owners and commission agents.

This repository is structured as a startup-style monorepo so the product can grow into a full SaaS platform with secure authentication, role-based access, transport operations, finance workflows, reporting, and cloud deployment on AWS or GCP.

## Tech Stack

- Frontend: Next.js 15, React 19, TypeScript
- Backend: Fastify, TypeScript, Zod, JWT auth
- Database: PostgreSQL with Prisma ORM
- Cache foundation: Redis
- Monorepo tooling: pnpm workspaces + Turbo
- Infra baseline: Docker, AWS/GCP deployment guides

## Folder Structure

```text
Unlitimate Transpo/
|-- apps/
|-- infra/
|-- packages/
|-- .env.example
|-- .gitignore
|-- docker-compose.yml
|-- package.json
|-- pnpm-workspace.yaml
|-- README.md
`-- turbo.json
```

## Security Approach

- HTTP security headers and CORS controls
- JWT access/refresh token strategy
- Password hashing with Argon2
- Zod input validation on API routes
- Role-based authorization hooks
- Environment-based secrets

## Cloud Direction

- AWS: ECS/Fargate, RDS PostgreSQL, ElastiCache Redis, S3, CloudFront, WAF
- GCP: Cloud Run, Cloud SQL PostgreSQL, Memorystore Redis, Cloud Storage, Cloud CDN
