import { ROOT_PROJECT } from "@/const/api/const";

import ApiError from "../ApiError";
import { prisma } from "../db/db";

export const getRootProjectDetail = async ({ userId }: { userId: string }) => {
	try {
		const rootProject = await prisma.project.findFirst({
			where: { isRoot: true, ownerId: userId, title: ROOT_PROJECT.name },
			select: { id: true, ownerId: true, title: true },
		});
		if (!rootProject) {
			throw new ApiError("Error while fetching root project data", 400);
		}

		return rootProject;
	} catch (error: any) {
		console.log(error, "Error while fetching root project data");
		throw new ApiError(
			error.message || "Error while fetching root project data",
			error.status
		);
	}
};
