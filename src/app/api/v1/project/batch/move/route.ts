import { asyncHandler } from "@/lib/asyncHandler";
import { apiResponse } from "@/lib/ApiResponse";

export const POST = asyncHandler(async (req: Request) => {
	return apiResponse("Successfully move the projects", 200);
});
