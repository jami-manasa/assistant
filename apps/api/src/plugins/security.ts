import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import sensible from "@fastify/sensible";
import type { FastifyInstance } from "fastify";

export async function registerSecurity(app: FastifyInstance) {
  await app.register(sensible);
  await app.register(helmet, {
    contentSecurityPolicy: false,
  });
  await app.register(cors, {
    origin: true,
    credentials: true,
  });
}
