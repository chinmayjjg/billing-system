import mongoose from 'mongoose';
import { IUser } from './auth.types';

const userSchema = new mongoose.Schema<IUser>(
    {
        email: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        passwordHash: { type: String, required: true },
        role: { type: String, enum: ['admin', 'user'], default: 'user' },
        organizationId: { type: mongoose.Schema.Types.ObjectId as any, ref: 'Organization' },
    },
    { timestamps: true }
);

export const UserModel = mongoose.model<IUser>('User', userSchema);
