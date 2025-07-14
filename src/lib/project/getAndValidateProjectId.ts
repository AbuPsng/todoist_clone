import { getAuthUser } from "../auth/getAuthUser";
import ApiError from "../ApiError";
import { prisma } from "../db/db";

export const getAndValidateProjectId = async (
	params: Promise<{ projectId: string }>
) => {
	const { projectId } = await params;
	const currentUser = await getAuthUser();

	if (!projectId || typeof projectId !== "string") {
		throw new ApiError("Please provide a valid project ID", 400);
	}

	const project = await prisma.project.findUnique({
		where: { id: projectId },
		select: {
			id: true,
			ownerId: true,
			subProjects: {
				select: {
					id: true,
				},
			},
			tasks: true,
		},
	});

	if (!project) {
		throw new ApiError("project not found", 404);
	}

	if (project.ownerId !== currentUser.id) {
		throw new ApiError("You do not have permission to access this project", 403);
	}

	return project;
};
