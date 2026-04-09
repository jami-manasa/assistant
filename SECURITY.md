# Security Notes

Unlitimate Transpo is structured for production-minded security from the beginning.

## Application Security

- Fastify Helmet for core HTTP security headers
- CORS configured at the API gateway layer
- JWT-based authenticated API access
- Role-ready authorization middleware
- Zod request validation on API inputs
- Argon2 password hashing for user credentials

## Platform Security

- Secrets stored in environment variables now, then move to AWS Secrets Manager or GCP Secret Manager
- PostgreSQL and Redis should run in private networks
- Public traffic should enter only through a load balancer or CDN
- TLS should be enforced on every public endpoint
- Audit logs should be retained for auth, payments, and booking changes

## Recommended Next Steps

- Add refresh-token rotation
- Add CSRF protection for cookie-based auth
- Add rate limiting on auth and payment endpoints
- Add request logging with PII masking
- Add SSO support for enterprise customers
- Add background job processing for reminders and alerts
- Add backup, restore, and disaster recovery policies
