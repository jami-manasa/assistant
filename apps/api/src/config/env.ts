import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  API_PORT: z.coerce.number().default(4000),
  JWT_ACCESS_SECRET: z.string().min(16),
  JWT_REFRESH_SECRET: z.string().min(16),
  DATABASE_URL: z.string().min(1),
  REDIS_URL: z.string().min(1),
});

const normalizedEnv = {
  ...process.env,
  NODE_ENV: process.env.NODE_ENV?.trim(),
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET?.trim(),
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET?.trim(),
  DATABASE_URL: process.env.DATABASE_URL?.trim(),
  REDIS_URL: process.env.REDIS_URL?.trim(),
};

export const env = envSchema.parse(normalizedEnv);
