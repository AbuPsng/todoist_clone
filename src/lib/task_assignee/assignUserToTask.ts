import { ProjectMembership, TaskAssignee } from "@/generated/prisma";

import ApiError from "../ApiError";
import { prisma } from "../db/db";

export const assignUserToTask = async ({
	assigneeId,
	assignerId,
	taskId,
	projectId,
}: {
	assigneeId: string;
	assignerId: string;
	taskId: string;
	projectId: string;
}): Promise<TaskAssignee> => {
	const taskData = await prisma.taskAssignee.create({
		data: {
			assigneeId,
			assignerId,
			taskId,
			projectId,
		},
	});

	if (!taskData) {
		throw new ApiError("Error while creating the task data", 400);
	}
	return taskData;
};
