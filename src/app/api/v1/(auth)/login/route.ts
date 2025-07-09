import { findUserByEmail } from "@/server/services/user.services";
import { userLoginInputSchema } from "@/zod/user.schema";
import { comparePassword } from "@/lib/auth/auth.lib";
import { asyncHandler } from "@/lib/asyncHandler";
import { apiResponse } from "@/lib/ApiResponse";
import { apiError } from "@/lib/apiError";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export const POST = asyncHandler(async (req: Request, res: Response) => {
	const body = await req.json();

	// Validate the request body using Zod schema
	const parsed = userLoginInputSchema.safeParse(body);

	if (!parsed.success) {
		// Zod found issues — return first error
		const errorMessage = parsed.error.errors[0].message;
		return apiError(errorMessage, 400);
	}
	const { email, password } = parsed.data;

	// "Check if email is valid";
	const existingUser = await findUserByEmail(email);

	if (!existingUser) {
		return apiError("User does not exists", 400);
	}
	// "Check if user is verified";
	if (!existingUser.isVerified) {
		return apiError("User is not verified", 400);
	}

	// "Check if password is correct";
	const isPasswordValid = await comparePassword(password, existingUser.password);

	if (!isPasswordValid) {
		return apiError("Invalid password", 400);
	}

	const jwtToken = jwt.sign(
		{ id: existingUser.id, email: existingUser.email },
		process.env.JWT_SECRET!,
		{ expiresIn: "24h" }
	);

	const cookieStore = await cookies();

	cookieStore.set("jwtToken", jwtToken, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "strict",
		path: "/",
		maxAge: 60 * 60 * 24 * 7, // 7 days
	});

	return apiResponse("User logged in successfully", 200);
});
