import { asyncHandler } from "@/lib/api/asyncHandler";
import { apiResponse } from "@/lib/api/ApiResponse";
import { cookies } from "next/headers";

export const GET = asyncHandler(async (req: Request, res: Response) => {
	const cookieStore = await cookies();

	cookieStore.set("jwtToken", "", {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "strict",
		path: "/",
		maxAge: 50,
	});

	return apiResponse("User logged out successfully", 200);
});
