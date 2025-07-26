import { getAndValidateProjectId } from "@/lib/api/project/getAndValidateProjectId";
import { getAllNestedProjectIds } from "@/lib/api/project/getAllNestedProjectIds";
import { asyncHandler } from "@/lib/api/asyncHandler";
import { apiResponse } from "@/lib/api/ApiResponse";
import { prisma } from "@/lib/db/db";

// This function fetch all the task (even nested one) of project
export const GET = asyncHandler(
	async (
		req: Request,
		{ params }: { params: Promise<{ projectId: string }> }
	) => {
		const {
			id: projectId,
			tasks: projectTasks,
			subProjects,
		} = await getAndValidateProjectId(params);

		const subProjectIds: string[] = subProjects.map((project) => project.id);

		const allTheNestedProjectId = await getAllNestedProjectIds(subProjectIds);

		// before
		// const allSubProjectTasksArray = await Promise.all(
		// 	allTheNestedProjectId.map((subProjectId) =>
		// 		prisma.task.findMany({ where: { projectId: subProjectId } })
		// 	)
		// );

		// const allSubProjectTasks = [
		// 	...allSubProjectTasksArray.flat(),
		// 	...projectTasks,
		// ];

		// after
		const allSubProjectTasks = await prisma.task.findMany({
			where: {
				projectId: {
					in: [projectId, ...allTheNestedProjectId],
				},
			},
			select: {
				id: true,
				title: true,
				description: true,
				completed: true,
				createdAt: true,
				dueDate: true,
			},
		});

		return apiResponse("Successfully fetched all tasks", 200, {
			tasks: allSubProjectTasks,
		});
	}
);

// This function delete all the task (even nested one) of project
export const DELETE = asyncHandler(
	async (
		req: Request,
		{ params }: { params: Promise<{ projectId: string }> }
	) => {
		const {
			id: projectId,
			tasks: projectTasks,
			subProjects,
		} = await getAndValidateProjectId(params);

		const subProjectIds: string[] = subProjects.map((project) => project.id);

		const allTheNestedProjectId = await getAllNestedProjectIds(subProjectIds);
		await prisma.task.deleteMany({
			where: {
				projectId: {
					in: [projectId, ...allTheNestedProjectId],
				},
			},
		});

		return apiResponse("Successfully deleted all tasks", 200);
	}
);
