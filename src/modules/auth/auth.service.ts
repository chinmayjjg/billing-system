import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserModel } from './auth.model';
import { RegisterDTO, LoginDTO } from './auth.types';
import { AppError } from '../../utils/AppError';
import { env } from '../../config/env';

export class AuthService {
    async register(data: RegisterDTO) {
        const existing = await UserModel.findOne({ email: data.email });
        if (existing) {
            throw new AppError('Email already registered', 409);
        }

        const passwordHash = await bcrypt.hash(data.password, 12);

        const user = await UserModel.create({
            email: data.email,
            name: data.name,
            passwordHash,
            role: data.role,
        });

        const { passwordHash: _, ...userWithoutPassword } = user.toObject();
        return userWithoutPassword;
    }

    async login(email: string, password: string) {
        const user = await UserModel.findOne({ email });
        if (!user) {
            throw new AppError('Invalid email or password', 401);
        }

        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            throw new AppError('Invalid email or password', 401);
        }

        const token = jwt.sign(
            { id: user._id.toString(), email: user.email, role: user.role },
            env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        const { passwordHash: _, ...userWithoutPassword } = user.toObject();
        return { token, user: userWithoutPassword };
    }
}
