import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { asyncHandler } from "./lib/asyncHandler";
import { verifyJWT } from "./lib/auth/jose.lib";
import ApiError from "./lib/ApiError";

export const middleware = asyncHandler(async (req: Request) => {
	const cookie = await cookies();

	const jwtToken = cookie.get("jwtToken");
	if (!jwtToken) {
		throw new ApiError("Unauthorized", 401);
	}
	verifyJWT(jwtToken.value);
	console.log("perfect");
	return NextResponse.next();
});

export const config = {
	matcher: ["/api/v1/(user|task|project)/:path*"],
};
