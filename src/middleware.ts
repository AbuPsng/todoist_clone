import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

import { asyncHandler } from "./lib/asyncHandler";
import { apiError } from "./lib/apiError";

export const middleware = asyncHandler(async (req: Request) => {
	const cookie = await cookies();

	const jwtToken = cookie.get("jwtToken");
	if (!jwtToken) {
		return apiError("Unauthorized", 401);
	}
	jwt.verify(jwtToken.value, process.env.JWT_SECRET!);
	return NextResponse.next();
});

export const config = {
	matcher: ["/api/v1/(user|task|project)/:path*"],
};
