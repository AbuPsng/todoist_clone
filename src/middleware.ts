// middleware.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { asyncHandler } from "./lib/api/asyncHandler";
import { verifyJWT } from "./lib/api/auth/jose.lib";
import ApiError from "./lib/api/ApiError";

export const middleware = asyncHandler(async (req: Request) => {
	const url = new URL(req.url);
	const pathname = url.pathname;

	const cookie = await cookies();
	const jwtToken = cookie.get("jwtToken");

	// 🔒 Protect API routes
	if (pathname.startsWith("/api/v1")) {
		if (!jwtToken) throw new ApiError("Unauthorized", 401);
		verifyJWT(jwtToken.value);
		console.log("✅ Authenticated API call");
		return NextResponse.next();
	}

	// 🚦 Redirect if user is logged in and trying to access "/"
	if (
		(pathname === "/" ||
			pathname === "/register" ||
			pathname === "/login" ||
			pathname === "/verify" ||
			pathname === "/email_sent") &&
		jwtToken
	) {
		return NextResponse.redirect(new URL("/dashboard", req.url));
	}

	return NextResponse.next();
});

export const config = {
	matcher: [
		"/",
		"/login",
		"/register",
		"/verify/:path*", // Covers /verify and /verify/:token
		"/email_sent",
		"/api/v1/(user|task|project)/:path*",
	],
};
