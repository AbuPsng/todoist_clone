import { getAuthUser } from "../auth/getAuthUser";
import ApiError from "../ApiError";
import { prisma } from "../db/db";

export const getAndValidateProjectId = async (
	params: Promise<{ projectId: string }> | string,
	userId?: string
) => {
	let currentUserId = userId ? userId : (await getAuthUser()).id;

	const projectId =
		typeof params === "string" ? params : (await params).projectId;

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
			memberships: {
				select: {
					id: true,
				},
			},
		},
	});

	if (!project) {
		throw new ApiError("project not found", 404);
	}

	if (project.ownerId !== currentUserId) {
		throw new ApiError("You do not have permission to access this project", 403);
	}

	return project;
};
