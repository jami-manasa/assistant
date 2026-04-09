# GCP Deployment Direction

- Frontend: Cloud Run or Firebase App Hosting
- API: Cloud Run
- Database: Cloud SQL PostgreSQL
- Cache: Memorystore Redis
- Storage: Cloud Storage
- CDN: Cloud CDN
- Secrets: Secret Manager
- Monitoring: Cloud Logging and Monitoring

Security priorities:

- Private service access for Cloud SQL
- HTTPS load balancing
- Dedicated service accounts
- Secret Manager for runtime secrets
