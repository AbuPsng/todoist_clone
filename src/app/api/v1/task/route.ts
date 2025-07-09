import { CreateTaskInput } from "@/types/services/task.services.types";
import { asyncHandler } from "@/lib/asyncHandler";
import { apiError } from "@/lib/apiError";

export const POST = asyncHandler(async (req: Request) => {
	console.log(req);
	const body = await req.json();
	const { title }: CreateTaskInput = body;

	if (!title) {
		return apiError("User ID and title are required", 400);
	}
	return apiError("This endpoint is not implemented yet", 501);
});
