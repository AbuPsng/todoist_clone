import ApiError from "../ApiError";
import { prisma } from "../db/db";

export const getImmediateSubProjectsAndTasks = async (projectId: string) => {
	const subProjects = await prisma.project.findMany({
		where: { parentId: projectId },
		select: {
			parentId: true,
			subProjects: {
				select: {
					id: true,
					title: true,
				},
			},
			tasks: {
				select: {
					id: true,
					title: true,
					projectId: true,
				},
			},
		},
	});

	if (!subProjects.length) {
		throw new ApiError("No projects found or access denied", 404);
	}
	return subProjects;
};
