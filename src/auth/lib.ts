import { JWTPayload, SignJWT, jwtVerify } from 'jose';
//                    Error              Value
type Result<T> = [Error, undefined] | [undefined, T];

const secret = new TextEncoder().encode(process.env.SESSION_TOKEN);

export async function encryptSessionCookie(
  payload: { id: number; role: string; expiresAt: Date } | JWTPayload,
) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('2 hours')
    .sign(secret);
}
// [E, T] -> Error or undefined, T or undefined
export async function decryptSessionCookie(
  token: string,
): Promise<Result<JWTPayload>> {
  try {
    return [
      undefined,
      (await jwtVerify(token, secret, { algorithms: ['HS256'] })).payload,
    ];
  } catch (e) {
    if (e.name === 'JWTExpired') {
      return [new Error('Session expired'), undefined];
    }
    return [
      new Error('An unexpected error ocurred while verifying the session'),
      undefined,
    ];
  }
}

export async function updateSessionCookie(
  token: string,
): Promise<Result<string>> {
  if (!token) return;

  const [e, parsedPayload] = await decryptSessionCookie(token);

  if (e) return [e, undefined];
  parsedPayload.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 2);

  return [undefined, await encryptSessionCookie(parsedPayload)];
}
