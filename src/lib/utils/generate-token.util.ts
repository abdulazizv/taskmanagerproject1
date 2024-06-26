import jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
import config from '../../config/index.js';

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

function signToken(payload: any, options?: jwt.SignOptions): string {
    let secret = config.jwt.secret;
    return jwt.sign(payload, secret, options);
}

export { verifyToken, decodeToken,signToken };