import ApiError from "../ApiError";
import { prisma } from "../db/db";

export const getAllProjectInFlatFormat = async ({
	userId,
}: {
	userId: string;
}) => {
	try {
		const ownedProjects = await prisma.project.findMany({
			where: {
				isRoot: false,
				ownerId: userId,
			},
			select: {
				id: true,
				title: true,
				parentId: true,
				isCollaborated: true,
				tasks: {
					select: {
						id: true,
						title: true,
					},
				},
			},
		});

		const membership = await prisma.projectMembership.findMany({
			where: {
				teammateId: userId,
			},
			select: {
				projectId: true,
			},
		});

		const collaboratedProjectIds = membership.map((m) => m.projectId);

		const collaboratedProjects = await prisma.project.findMany({
			where: {
				id: { in: collaboratedProjectIds },
			},
			select: {
				id: true,
				title: true,
				parentId: true,
				isCollaborated: true,
				tasks: {
					select: {
						id: true,
						title: true,
					},
				},
			},
		});

		const userAccessibleProjects = Array.from(
			new Map(
				[...ownedProjects, ...collaboratedProjects].map((project) => [
					project.id,
					project,
				])
			).values()
		);

		return userAccessibleProjects;
	} catch (error: any) {
		throw new ApiError(
			error.message || "Error while fetching all project except root project",
			400
		);
	}
};
