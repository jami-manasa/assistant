# Setup Requirements

Before running Unlitimate Transpo locally, make sure this machine has:

- Node.js 20 or newer
- pnpm 9 or newer
- Docker Desktop

## Current project expectation

- Frontend and backend dependencies are managed with `pnpm`
- PostgreSQL and Redis run through `docker-compose`
- Environment variables are stored in `.env`

## Quick local setup

```powershell
docker-compose up -d
pnpm install
pnpm dev
```
