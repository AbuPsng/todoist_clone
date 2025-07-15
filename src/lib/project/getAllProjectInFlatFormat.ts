import { id } from "zod/v4/locales";

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
				title: true,
				parentId: true,
				tasks: {
					select: {
						id: true,
						title: true,
					},
				},
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
