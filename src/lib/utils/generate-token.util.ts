import jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';

function verifyToken(token: string,secret: string) {
    try {
        const data = jwt.verify(token, secret);
        return data;
    } catch (error) {
        return false;
    }
}

function decodeToken(token: string): JwtPayload | null {
    try {
        const decoded = jwt.decode(token);
        if (decoded && typeof decoded !== 'string') {
            return decoded as JwtPayload;
        }
        return null;
    } catch (error) {
        return null;
    }
}

function signToken(payload: any, secret: string, options?: jwt.SignOptions): string {
    return jwt.sign(payload, secret, options);
}

export { verifyToken, decodeToken,signToken };