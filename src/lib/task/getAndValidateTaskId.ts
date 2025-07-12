import { getAuthUser } from "../auth/getAuthUser";
import ApiError from "../ApiError";
import { prisma } from "../db/db";

export const getAndValidateTaskId = async (
	params: Promise<{ taskId: string }>
) => {
	const { taskId } = await params;
	const currentUser = await getAuthUser();

	if (!taskId || typeof taskId !== "string") {
		throw new ApiError("Please provide a valid task ID", 400);
	}

	const task = await prisma.task.findUnique({ where: { id: taskId } });

	if (!task) {
		throw new ApiError("Task not found", 404);
	}
	console.log(currentUser, "current user");
	if (task.userId !== currentUser.id) {
		throw new ApiError("You do not have permission to access this task", 403);
	}

	return taskId;
};
