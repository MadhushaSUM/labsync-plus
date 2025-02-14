export interface UserType {
    id: number;
    name: string;
    email: string;
    role: string;
    branch: number;
    emailVerified?: string;
    image?: string;
    version: number;
}