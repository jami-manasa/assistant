import type { FastifyInstance } from "fastify";
import { z } from "zod";

const bookingSchema = z.object({
  customerName: z.string().min(2),
  vehicleNumber: z.string().min(2),
  driverName: z.string().min(2),
  pickupLocation: z.string().min(2),
  dropLocation: z.string().min(2),
  bookingAmount: z.coerce.number().positive(),
});

const bookings = [
  {
    id: "BK-1042",
    customerName: "Sai Logistics",
    vehicleNumber: "TS09AB2211",
    driverName: "Raju",
    pickupLocation: "Hyderabad",
    dropLocation: "Pune",
    bookingAmount: 38000,
    status: "completed",
  },
];

export async function bookingRoutes(app: FastifyInstance) {
  app.get("/bookings", { preHandler: [app.authenticate] }, async () => {
    return { items: bookings };
  });

  app.post("/bookings", { preHandler: [app.authenticate] }, async (request, reply) => {
    const body = bookingSchema.parse(request.body);
    const booking = {
      id: `BK-${1000 + bookings.length + 1}`,
      ...body,
      status: "booked",
    };
    bookings.unshift(booking);
    return reply.code(201).send(booking);
  });
}
