import { z } from 'zod';

export interface IUser {
    email: string;
    name: string;
    passwordHash: string;
    role: 'admin' | 'user';
    organizationId?: string;
    createdAt: Date;
    updatedAt: Date;
}

// Zod validation schemas
export const RegisterSchema = z.object({
    email: z.string().email(),
    name: z.string().min(2),
    password: z.string().min(8),
    role: z.enum(['admin', 'user']).optional().default('user'),
});

export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
});

export type RegisterDTO = z.infer<typeof RegisterSchema>;
export type LoginDTO = z.infer<typeof LoginSchema>;

export type CreateUserDTO = Omit<IUser, 'createdAt' | 'updatedAt' | 'organizationId'>;
