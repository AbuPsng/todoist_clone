import { findUserByEmail } from "@/server/services/user.services";
import { comparePassword } from "@/lib/api/auth/auth.lib";
import { userLoginInputSchema } from "@/zod/user.schema";
import { asyncHandler } from "@/lib/api/asyncHandler";
import { apiResponse } from "@/lib/api/ApiResponse";
import { signJWT } from "@/lib/api/auth/jose.lib";
import ApiError from "@/lib/api/ApiError";
import { cookies } from "next/headers";

export const POST = asyncHandler(async (req: Request, res: Response) => {
	const body = await req.json();

	// Validate the request body using Zod schema
	const parsed = userLoginInputSchema.safeParse(body);

	if (!parsed.success) {
		// Zod found issues — return first error
		const errorMessage = parsed.error.errors[0].message;
		throw new ApiError(errorMessage, 400);
	}
	const { email, password } = parsed.data;

	// "Check if email is valid";
	const existingUser = await findUserByEmail(email);

	if (!existingUser) {
		throw new ApiError("User does not exists", 400);
	}
	// "Check if user is verified";
	if (!existingUser.isVerified) {
		throw new ApiError("User is not verified", 400);
	}

	// "Check if password is correct";
	const isPasswordValid = await comparePassword(password, existingUser.password);

	if (!isPasswordValid) {
		throw new ApiError("Invalid password", 400);
	}

	const jwtToken = await signJWT(
		{ id: existingUser.id, email: existingUser.email },
		{ expiresIn: "7d" }
	);

	const cookieStore = await cookies();

	cookieStore.set("jwtToken", jwtToken, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "strict",
		path: "/",
		maxAge: 60 * 60 * 24 * 7, // 7 days
	});

	const user = {
		id: existingUser.id,
		email: existingUser.email,
		imageUrl: existingUser.imageUrl,
		name: existingUser.name,
	};

	return apiResponse("User logged in successfully", 200, {
		user,
	});
});
