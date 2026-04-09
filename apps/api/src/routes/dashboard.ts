import type { FastifyInstance } from "fastify";

export async function dashboardRoutes(app: FastifyInstance) {
  app.get("/dashboard", { preHandler: [app.authenticate] }, async () => {
    return {
      metrics: [
        { label: "Daily Revenue", value: 148500, unit: "INR" },
        { label: "Pending Collections", value: 472000, unit: "INR" },
        { label: "Active Trips", value: 42, unit: "count" },
        { label: "Expiring Documents", value: 7, unit: "count" },
      ],
      alerts: [
        "3 vehicles need insurance renewal this week.",
        "2 drivers have pending payout approvals.",
        "Fuel spend crossed threshold for Vehicle AP09TX2211.",
      ],
    };
  });
}
