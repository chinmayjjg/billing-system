import { UserModel } from './auth.model';
import { CreateUserDTO } from './auth.types';

export class AuthService {
    async register(data: CreateUserDTO) {
        // TODO: Hash password
        // TODO: Create user
        // TODO: Return user sans password
        throw new Error('Not implemented');
    }

    async login(email: string, password: string) {
        // TODO: Find user by email
        // TODO: Compare password
        // TODO: Generate JWT
        // TODO: Return token and user info
        throw new Error('Not implemented');
    }
}
