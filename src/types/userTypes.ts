interface createCode {
    email: string;
    password: string;
    code: {
        id: string;
        used: boolean;
        userId: string;
        createdAt: Date;
        expiresAt: Date;
    } | null;
    id: string;
}