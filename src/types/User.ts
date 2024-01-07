export interface User {
    id?: number;
    email: string;
    password: string;
    role?: UserRole;
    firstName: string;
    lastName: string;
}

export enum UserRole {
    USER = "USER",
    MANAGER = "MANAGER",
    ADMIN = "ADMIN"
}