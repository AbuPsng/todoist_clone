import { JwtDecodedTokenType } from "@/types/auth/getAuthUser.types";
import { checkIfUserExist } from "@/server/services/user.services";
import { cookies } from "next/headers";

import { verifyJWT } from "./jose.lib";
import ApiError from "../ApiError";

export const getAuthUser = async (): Promise<JwtDecodedTokenType> => {
	try {
		const cookie = await cookies();

		// Retrieve the JWT token from cookies
		// Note: In Next.js, cookies are accessed via the `cookies` function
		// and you can use `cookie.get("cookieName")` to get a specific
		const jwtToken = cookie.get("jwtToken")?.value;

		if (!jwtToken) {
			throw new ApiError("No JWT token found in cookies", 500);
		}

		const user: JwtDecodedTokenType = await verifyJWT(jwtToken);

		if (!user) {
			throw new ApiError("Unauthorized", 401);
		}

		if (!user.id) {
			throw new ApiError("User ID is missing", 400);
		}

		const isUserExist = await checkIfUserExist(user.id);

		if (!isUserExist) {
			throw new ApiError("Incorrect user id", 404);
		}

		return user;
	} catch (error: any) {
		throw new ApiError(error.message || "Failed to authenticate user", 500);
	}
};
