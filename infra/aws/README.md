# AWS Deployment Direction

- Frontend: Next.js on ECS/Fargate or Amplify
- API: Fastify on ECS/Fargate
- Database: Amazon RDS PostgreSQL
- Cache: ElastiCache Redis
- Storage: S3
- CDN: CloudFront
- Secrets: AWS Secrets Manager
- Edge protection: AWS WAF
- Monitoring: CloudWatch

Security priorities:

- Private subnets for API and database
- Public load balancer only
- TLS via ACM
- Separate IAM roles for each workload
