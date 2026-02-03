import { z } from 'zod';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    PORT: z.coerce.number().default(3000),
    MONGO_URI: z.string().min(1, "MONGO_URI is required"),
    JWT_SECRET: z.string().min(1, "JWT_SECRET is required"),
});

export const env = envSchema.parse(process.env);
