import { BranchType } from "./branch";

export interface UserType {
    id: number;
    name: string;
    email: string;
    role: string;
    branch: BranchType;
    emailVerified?: string;
    image?: string;
    version: number;
}