import { prisma } from "../db/db";

export const getImmediateSubProjectsAndTasks = async (projectId: string) => {
	const subProjects = await prisma.project.findMany({
		where: { parentId: projectId },
		select: {
			parentId: true,
			id: true,
			title: true,
			tasks: {
				select: {
					id: true,
					title: true,
				},
			},
			subProjects: {
				select: {
					id: true,
				},
			},
		},
	});

	if (!subProjects.length) {
		return [];
	}
	return subProjects;
};
