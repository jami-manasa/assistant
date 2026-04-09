import type { FastifyInstance } from "fastify";
import { authRoutes } from "./auth";
import { bookingRoutes } from "./bookings";
import { dashboardRoutes } from "./dashboard";

export async function registerRoutes(app: FastifyInstance) {
  await app.register(authRoutes, { prefix: "/auth" });
  await app.register(dashboardRoutes, { prefix: "/v1" });
  await app.register(bookingRoutes, { prefix: "/v1" });
}
