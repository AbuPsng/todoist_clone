import {
	CreateTaskInputType,
	GetTaskQueryType,
} from "@/types/services/task.types";
import { ROOT_PROJECT } from "@/const/api/const";
import { Prisma } from "@/generated/prisma";
import ApiError from "@/lib/api/ApiError";
import { prisma } from "@/lib/api/db/db";

export const createTask = async (taskData: CreateTaskInputType) => {
	const { title, description, dueDate, projectId, userId } = taskData;

	// 🔄 Fallback to root project if projectId not provided
	let projectIdToUse = projectId;

	if (!projectIdToUse) {
		const rootProject = await prisma.project.findFirst({
			where: { isRoot: true, title: ROOT_PROJECT.name, ownerId: userId },
			select: { id: true },
		});

		if (!rootProject) {
			throw new ApiError("Root project not found", 500);
		}

		projectIdToUse = rootProject.id;
	}

	// 🧠 Duplicate title check in same project except root
	const existingTask = await prisma.task.findFirst({
		where: { title, projectId: projectIdToUse },
	});

	if (existingTask) {
		throw new ApiError("Task with the same title already exists", 400);
	}

	// ✅ Create task
	const newTask = await prisma.task.create({
		data: {
			userId,
			title,
			projectId: projectIdToUse,
			...(description && { description }),
			...(dueDate && { dueDate }),
		},
	});

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
