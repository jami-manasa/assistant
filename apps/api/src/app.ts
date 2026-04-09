import Fastify from "fastify";
import { registerRoutes } from "./routes";
import { registerAuth } from "./plugins/auth";
import { registerSecurity } from "./plugins/security";

export async function buildApp() {
  const app = Fastify({ logger: true });

  await registerSecurity(app);
  await registerAuth(app);

  app.get("/health", async () => ({
    ok: true,
    service: "unlitimate-transpo-api",
  }));

  await registerRoutes(app);

  return app;
}
