import ApiError from "@/lib/ApiError";
import { prisma } from "@/lib/db/db";

export const assertProjectOwnershipOrThrow = async (
	parentProjectId: string,
	userId: string
) => {
	const parentProject = await prisma.project.findUnique({
		where: {
			id: parentProjectId,
			ownerId: userId,
		},
	});

	if (!parentProject) {
		throw new ApiError("You do not have access to this project", 403);
	}
	return true;
};
