import * as crypto from 'crypto';

export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
}

export function comparePassword(password: string, storedPassword: string): boolean {
  const [salt, hash] = storedPassword.split(':');
  const newHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return hash === newHash;
}

export function generateToken(payload: object, secret: string, expiresIn: number): string {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + expiresIn;
  const payloadWithExp = { ...payload, iat, exp };
  const payloadBase = Buffer.from(JSON.stringify(payloadWithExp)).toString('base64url');
  const signature = crypto.createHmac('sha256', secret)
    .update(`${header}.${payloadBase}`)
    .digest('base64url');
  return `${header}.${payloadBase}.${signature}`;
}

export interface TokenPayload {
  sub: string;
  email?: string;
  role?: string;
  type?: string;
  iat?: number;
  exp?: number;
}

export function verifyToken(token: string, secret: string): TokenPayload | null {
  try {
    const [header, payload, signature] = token.split('.');
    const expectedSignature = crypto.createHmac('sha256', secret)
      .update(`${header}.${payload}`)
      .digest('base64url');
    if (signature !== expectedSignature) return null;
    const decoded = JSON.parse(Buffer.from(payload, 'base64url').toString());
    if (decoded.exp && decoded.exp < Math.floor(Date.now() / 1000)) return null;
    return decoded;
  } catch {
    return null;
  }
}

export function generateUuid(): string {
  return crypto.randomUUID();
}