import ApiError from "../ApiError";
import { prisma } from "../db/db";

export const getAndValidateTaskAssigneeId = async (
	params: Promise<{ taskAssignId: string }>
) => {
	const { taskAssignId } = await params;

	const taskAssignee = await prisma.taskAssignee.findUnique({
		where: { id: taskAssignId },
	});

	if (!taskAssignee) {
		throw new ApiError("Error while finding this assignee data", 400);
	}

	return taskAssignee;
};
