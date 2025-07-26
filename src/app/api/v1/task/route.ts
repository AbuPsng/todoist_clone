import { createTask, getAllTaskByQuery } from "@/server/services/task.services";
import { createQueryOptions } from "@/lib/api/task/getQuery.lib";
import { GetTaskQueryType } from "@/types/services/task.types";
import { asyncHandler } from "@/lib/api/asyncHandler";
import { getAuthUser } from "@/lib/auth/getAuthUser";
import { taskInputSchema } from "@/zod/task.schema";
import { apiResponse } from "@/lib/api/ApiResponse";
import ApiError from "@/lib/api/ApiError";
import { NextRequest } from "next/server";

export const POST = asyncHandler(async (req: Request) => {
	const body = await req.json();

	const user = await getAuthUser();

	const parsed = taskInputSchema.safeParse(body);

	if (!parsed.success) {
		// Zod found issues — return first error
		const errorMessage = parsed.error.errors[0].message;
		throw new ApiError(errorMessage, 400);
	}

	const { data: taskData } = parsed;

	const newTask = await createTask({ ...taskData, userId: user.id });

	return apiResponse("task created successfully", 201, { newTask });
});

export const GET = asyncHandler(async (req: NextRequest) => {
	const url = req.nextUrl.searchParams;

	const user = await getAuthUser();

	const taskQueryOptions: GetTaskQueryType = {
		userId: user.id,
	};

	createQueryOptions(url, taskQueryOptions);

	const tasks = await getAllTaskByQuery(taskQueryOptions);

	return apiResponse("tasks fetched successfully", 200, { tasks });
});
