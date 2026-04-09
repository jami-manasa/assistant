import argon2 from "argon2";
import type { FastifyInstance } from "fastify";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const demoUser = {
  id: "usr_admin_001",
  email: "admin@unlitimatetranspo.com",
  role: "admin" as const,
  passwordHash:
    "$argon2id$v=19$m=65536,t=3,p=4$M2hUZmtBTXJyQ0w4QWJzMg$q9A7n01Ha3vX5KwZ2kI1dsQe7FpC18JNpDutLCRa14Q",
};

export async function authRoutes(app: FastifyInstance) {
  app.post("/login", async (request, reply) => {
    const body = loginSchema.parse(request.body);

    const isKnownUser = body.email === demoUser.email;
    const validPassword = isKnownUser && (await argon2.verify(demoUser.passwordHash, body.password).catch(() => false));

    if (!validPassword) {
      return reply.unauthorized("Incorrect email or password.");
    }

    const accessToken = await reply.jwtSign({
      sub: demoUser.id,
      email: demoUser.email,
      role: demoUser.role,
    });

    return {
      accessToken,
      user: {
        id: demoUser.id,
        email: demoUser.email,
        role: demoUser.role,
      },
    };
  });
}
