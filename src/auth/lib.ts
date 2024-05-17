import { JWTPayload, SignJWT, jwtVerify } from 'jose';

type E = Error | undefined;
type V = JWTPayload | undefined;
type VerificationResult = [E, V];
const secret = new TextEncoder().encode(process.env.SESSION_TOKEN);

export async function encryptSessionCookie(
  payload: { id: number; role: string; expiresAt: Date } | JWTPayload,
) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('5 seconds')
    .sign(secret);
}

export async function decryptSessionCookie(token: string): Promise<VerificationResult> {
  try {
    return [
      undefined,
      (await jwtVerify(token, secret, { algorithms: ['HS256'] })).payload,
    ];
  } catch (e) {
    if (e.name === 'JWTExpired') {
      return [new Error('SESSION expired'), undefined];
    }
    return [
      new Error('An unexpected error ocurred while verifying the session'),
      undefined,
    ];
  }
}

export async function updateSessionCookie(token: string) {
  if (!token) return;

  const [e, parsedPayload] = await decryptSessionCookie(token);
  console.log(parsedPayload);
  parsedPayload.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 2);

  return encryptSessionCookie(parsedPayload);
}
