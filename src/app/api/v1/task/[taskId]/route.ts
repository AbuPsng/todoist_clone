import { taskInputSchema, taskUpdateInputSchema } from "@/zod/task.schema";
import { getAndValidateTaskId } from "@/lib/api/task/getAndValidateTaskId";
import { UpdateTaskInputType } from "@/types/services/task.types";
import { asyncHandler } from "@/lib/api/asyncHandler";
import { apiResponse } from "@/lib/api/ApiResponse";
import ApiError from "@/lib/api/ApiError";
import { prisma } from "@/lib/db/db";

export const GET = asyncHandler(
	async (req: Request, { params }: { params: Promise<{ taskId: string }> }) => {
		const taskId = await getAndValidateTaskId(params);

		const task = await prisma.task.findUnique({
			where: { id: taskId },
		});

		return apiResponse("Task fetched successfully", 200, { task });
	}
);

export const PATCH = asyncHandler(
	async (req: Request, { params }: { params: Promise<{ taskId: string }> }) => {
		const taskId = await getAndValidateTaskId(params);

		const body: UpdateTaskInputType = await req.json();

		const parsed = taskUpdateInputSchema.safeParse(body);

		if (!parsed.success) {
			const errorMessage = parsed.error.errors[0].message;
			throw new ApiError(errorMessage, 400);
		}

		const updatedTask = await prisma.task.update({
			where: { id: taskId },
			data: parsed.data,
		});

		if (!updatedTask) {
			throw new ApiError("Error while updating task", 400);
		}

		return apiResponse("Task delete successfully", 200, { task: updatedTask });
	}
);

export const DELETE = asyncHandler(
	async (req: Request, { params }: { params: Promise<{ taskId: string }> }) => {
		const taskId = await getAndValidateTaskId(params);

		await prisma.task.delete({
			where: { id: taskId },
		});

		return apiResponse("Task delete successfully", 200);
	}
);
