export interface User {
	id: number;
	email: string;
    role: UserRole;
}

export interface Tokens {
    accessToken: string | null;
    refreshToken?: string | null;
}

export enum UserRole {
    Super = '1',
    Admin = '2',
    Other = '3',
}
