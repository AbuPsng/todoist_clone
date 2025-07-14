import { getAndValidateProjectId } from "@/lib/project/getAndValidateProjectId";
import { updateProjectInputSchema } from "@/zod/project.schema";
import { getAuthUser } from "@/lib/auth/getAuthUser";
import { asyncHandler } from "@/lib/asyncHandler";
import { apiResponse } from "@/lib/ApiResponse";
import ApiError from "@/lib/ApiError";
import { prisma } from "@/lib/db/db";

//This query only fetch the its sub-project and direct task (and not the task of sub-project)
export const GET = asyncHandler(
	async (
		req: Request,
		{ params }: { params: Promise<{ projectId: string }> }
	) => {
		const { id: projectId } = await getAndValidateProjectId(params);

		const projects = await prisma.project.findUnique({
			where: { id: projectId },
			select: {
				id: true,
				title: true,
				description: true,
				createdAt: true,
				subProjects: {
					select: {
						id: true,
						title: true,
						description: true,
						createdAt: true,
					},
				},
				tasks: {
					select: {
						id: true,
						title: true,
						description: true,
						completed: true,
						createdAt: true,
						dueDate: true,
					},
				},
			},
		});

		if (!projects) {
			throw new ApiError("No project found or access denied", 404);
		}

		return apiResponse("Project fetched successfully", 200, { projects });
	}
);

export const PATCH = asyncHandler(
	async (
		req: Request,
		{ params }: { params: Promise<{ projectId: string }> }
	) => {
		const { id: projectId } = await getAndValidateProjectId(params);

		const body = await req.json();

		const parsed = updateProjectInputSchema.safeParse(body);

		if (!parsed.success) {
			const errorMessage = parsed.error.errors[0].message;
			throw new ApiError(errorMessage, 400);
		}

		const updatedProject = await prisma.project.update({
			where: { id: projectId },
			data: parsed.data,
		});

		if (!updatedProject) {
			throw new ApiError("Project not found or access denied", 403);
		}

		return apiResponse("Project update successfully", 200, {
			project: updatedProject,
		});
	}
);

export const DELETE = asyncHandler(
	async (
		req: Request,
		{ params }: { params: Promise<{ projectId: string }> }
	) => {
		const { id: projectId } = await getAndValidateProjectId(params);

		await prisma.project.delete({
			where: { id: projectId },
		});

		return apiResponse("Project delete successfully", 200);
	}
);
