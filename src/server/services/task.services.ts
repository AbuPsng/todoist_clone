import { CreateTaskInput } from "@/types/services/task.services.types";
import { apiError } from "@/lib/apiError";
import { prisma } from "@/lib/db/db";

export const createTask = async ({
	userId,
	title,
	description,
	dueDate,
	projectId,
}: CreateTaskInput) => {
	const taskObject: CreateTaskInput = {
		userId,
		title,
	};

	if (description) {
		taskObject.description = description;
	}

	if (dueDate) {
		taskObject.dueDate = dueDate;
	}
	if (projectId) {
		const project = await prisma.task.findFirst({
			where: { projectId, title },
		});

		if (project) {
			throw apiError(
				"Task with the same title already exists in this project",
				400
			);
		}

		taskObject.projectId = projectId;
	}

	const newTask = await prisma.task.create({
		data: { ...taskObject },
	});

	if (!newTask) {
		throw apiError("Failed to create task", 500);
	}
	return newTask;
};
