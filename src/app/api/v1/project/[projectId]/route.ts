import { getAndValidateProjectId } from "@/lib/api/project/getAndValidateProjectId";
import { getRootProjectDetail } from "@/lib/api/project/getRootProjectDetails";
import { zodValidateAndParesData } from "@/lib/api/zodValidateAndParesData";
import { updateProjectInputSchema } from "@/zod/project.schema";
import { getAuthUser } from "@/lib/api/auth/getAuthUser";
import { asyncHandler } from "@/lib/api/asyncHandler";
import { apiResponse } from "@/lib/api/ApiResponse";
import ApiError from "@/lib/api/ApiError";
import { prisma } from "@/lib/api/db/db";

//This query only fetch the its sub-project and direct task (and not the task of sub-project)
export const GET = asyncHandler(
	async (
		req: Request,
		{ params }: { params: Promise<{ projectId?: string }> }
	) => {
		const currentUser = await getAuthUser();
		const projectId =
			(await params).projectId ??
			(await getRootProjectDetail({ userId: currentUser.id })).id;

		await getAndValidateProjectId(projectId, currentUser.id);

		const subProjects = await prisma.project.findMany({
			where: { parentId: projectId },
			select: {
				subProjects: {
					select: {
						id: true,
						title: true,
					},
				},
				tasks: {
					select: {
						id: true,
						title: true,
					},
				},
			},
		});

		if (!subProjects.length) {
			throw new ApiError("No projects found or access denied", 404);
		}

		return apiResponse("Project fetched successfully", 200, { subProjects });
	}
);

export const PATCH = asyncHandler(
	async (
		req: Request,
		{ params }: { params: Promise<{ projectId: string }> }
	) => {
		const { id: projectId } = await getAndValidateProjectId(params);

		const body = await req.json();

		const data = zodValidateAndParesData(updateProjectInputSchema, body);

		const updatedProject = await prisma.project.update({
			where: { id: projectId },
			data: data,
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
