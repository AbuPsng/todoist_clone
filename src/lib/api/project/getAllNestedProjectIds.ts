import ApiError from "../ApiError";
import { prisma } from "../db/db";

export const getAllNestedProjectIds = async (directSubProjectIds: string[]) => {
	try {
		const allSubProjectIds = [...directSubProjectIds];

		let index = 0;

		const projectRecursive = async () => {
			while (index < allSubProjectIds.length) {
				const project = await prisma.project.findUnique({
					where: {
						id: allSubProjectIds[index],
					},
					select: {
						subProjects: {
							select: {
								id: true,
							},
						},
					},
				});

				if (project) {
					const { subProjects } = project;

					for (const subProject of subProjects) {
						allSubProjectIds.push(subProject.id);
					}
				}
				index++;
			}
		};
		await projectRecursive();
		return allSubProjectIds;
	} catch (error) {
		throw new ApiError("Error while fetching all the nested project's id", 400);
	}
};
