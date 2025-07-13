import {
	CreateTaskInputType,
	GetTaskQueryType,
} from "@/types/services/task.services.types";
import { Prisma } from "@/generated/prisma";
import ApiError from "@/lib/ApiError";
import { prisma } from "@/lib/db/db";

export const createTask = async ({
	userId,
	title,
	description,
	dueDate,
	projectId,
}: CreateTaskInputType) => {
	const taskData = {
		userId,
		title,
		...(description && { description }),
		...(dueDate && { dueDate }),
		...(projectId && { projectId }),
	};

	if (projectId) {
		const existingTask = await prisma.task.findFirst({
			where: {
				title,
				projectId,
			},
		});

		if (existingTask) {
			throw new ApiError(
				"Task with the same title already exists in this project",
				400
			);
		}
	}

	const newTask = await prisma.task.create({
		data: { ...taskData },
	});

	if (!newTask) {
		throw new ApiError("Failed to create task", 500);
	}
	return newTask;
};

export const getAllTaskByQuery = async ({
	userId,
	order,
	projectId,
	title,
	pageNumber = 1,
	pageSize = 10,
	dueDate,
}: GetTaskQueryType) => {
	const queryOptions: Prisma.TaskFindManyArgs = {
		where: {
			userId,
			...(projectId && { projectId }),
			...(title && { title: { contains: title, mode: "insensitive" } }),
			...(dueDate && { dueDate: new Date(dueDate) }),
		},
		select: {
			id: true,
			title: true,
			description: true,
			completed: true,
			createdAt: true,
			dueDate: true,
		},
		orderBy: {
			createdAt: order,
		},
		skip: pageNumber && (pageNumber - 1) * pageSize,
		take: pageSize,
	};

	const tasksArray = await prisma.task.findMany(queryOptions);

	if (tasksArray.length === 0) {
		throw new ApiError("No tasks found for this user", 404);
	}

	return tasksArray;
};
