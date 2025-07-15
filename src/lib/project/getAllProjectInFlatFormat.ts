import ApiError from "../ApiError";
import { prisma } from "../db/db";

export const getAllProjectInFlatFormat = async ({
	userId,
}: {
	userId: string;
}) => {
	try {
		const allProjectExceptRoot = await prisma.project.findMany({
			where: {
				isRoot: false,
				ownerId: userId,
			},
			select: {
				id: true,
				createdAt: true,
				title: true,
				description: true,
				parentId: true,
				tasks: {
					select: {
						id: true,
						title: true,
						createdAt: true,
					},
				},
				subProjects: true,
			},
		});
		return allProjectExceptRoot;
	} catch (error: any) {
		throw new ApiError(
			error.message || "Error while fetching all project except root project",
			400
		);
	}
};
