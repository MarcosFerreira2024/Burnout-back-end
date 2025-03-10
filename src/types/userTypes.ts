interface handleCode {
    email: string;
    name?: string;
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

interface JWT {
    email: string,
    id: string

}

interface CompareJWT extends JWT {
    password: string,


}

interface JWTPayloadToken {
    email: string,
    id: string
}