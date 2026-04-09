import jwt from "@fastify/jwt";
import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { env } from "../config/env";

declare module "fastify" {
  interface FastifyInstance {
    authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<unknown>;
  }
}

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: {
      sub: string;
      role: "admin" | "operations" | "accounts" | "dispatch";
      email: string;
    };
    user: {
      sub: string;
      role: "admin" | "operations" | "accounts" | "dispatch";
      email: string;
    };
  }
}

export async function registerAuth(app: FastifyInstance) {
  await app.register(jwt, {
    secret: env.JWT_ACCESS_SECRET,
    sign: { expiresIn: "30m" },
  });

  app.decorate("authenticate", async function authenticate(request: FastifyRequest, reply: FastifyReply) {
    try {
      await request.jwtVerify();
    } catch {
      return reply.unauthorized("Invalid or expired session.");
    }
  });
}
