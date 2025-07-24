import { asyncHandler } from "@/lib/asyncHandler";
import { apiResponse } from "@/lib/ApiResponse";

export const POST = asyncHandler(async (req: Request) => {
	return apiResponse("sjdfh", 200);
});

///check if belong to current project (and is collaborated)
///check if assignee (current user) is admin or above
///take body from request
/// validate them
///check if task exist
///check if assingeTo is teammate
///create task_assignee
