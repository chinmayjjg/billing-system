export interface IUser {
    email: string;
    name: string;
    passwordHash: string;
    role: 'admin' | 'user';
    organizationId?: string;
    createdAt: Date;
    updatedAt: Date;
}

export type CreateUserDTO = Omit<IUser, 'createdAt' | 'updatedAt' | 'organizationId'>;
