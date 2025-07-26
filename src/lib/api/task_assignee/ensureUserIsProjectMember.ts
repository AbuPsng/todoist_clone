import { ProjectMembership } from "@/generated/prisma";

import ApiError from "../ApiError";
import { prisma } from "../db/db";

export const ensureUserIsProjectMember = async ({
	userId,
	projectId,
}: {
	userId: string;
	projectId: string;
}): Promise<ProjectMembership> => {
	const teammate = await prisma.projectMembership.findUnique({
		where: {
			teammateId_projectId: {
				teammateId: userId,
				projectId,
			},
		},
	});

	if (!teammate) {
		throw new ApiError("User dosen't belong to  this project", 400);
	}
	return teammate;
};
