// src/lib/auth/jwt.ts
import { SignJWT, jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function signJWT(
	payload: Record<string, string>,
	options?: { expiresIn?: string }
) {
	return await new SignJWT(payload)
		.setProtectedHeader({ alg: "HS256" })
		.setIssuedAt()
		.setExpirationTime(options?.expiresIn || "7d")
		.sign(secret);
}

export async function verifyJWT<T>(token: string): Promise<T> {
	const { payload } = await jwtVerify(token, secret);
	return payload as T;
}
