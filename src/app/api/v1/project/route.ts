import { getAllProjectInFlatFormat } from "@/lib/api/project/getAllProjectInFlatFormat";
import { assertProjectOwnershipOrThrow } from "@/server/services/project.services";
import { getRootProjectDetail } from "@/lib/api/project/getRootProjectDetails";
import { getProjectHierarchy } from "@/lib/api/project/getProjectHierarchy";
import { createProjectInputSchema } from "@/zod/project.schema";
import { getAuthUser } from "@/lib/api/auth/getAuthUser";
import { asyncHandler } from "@/lib/api/asyncHandler";
import { apiResponse } from "@/lib/api/ApiResponse";
import ApiError from "@/lib/api/ApiError";
import { prisma } from "@/lib/api/db/db";

export const POST = asyncHandler(async (req: Request) => {
	const body = await req.json();
	const currentUser = await getAuthUser();

	const parsed = createProjectInputSchema.safeParse(body);

	if (!parsed.success) {
		const errorMessage = parsed.error.errors[0].message;
		throw new ApiError(errorMessage, 400);
	}

	const { parentId, ...projectData } = parsed.data;

	let parentProjectId = parentId;

	if (!parentProjectId) {
		const { id: rootProjectId } = await getRootProjectDetail({
			userId: currentUser.id,
		});
		parentProjectId = rootProjectId;

		await assertProjectOwnershipOrThrow(parentProjectId, currentUser.id);
	}

	const newProject = await prisma.project.create({
		data: {
			...projectData,
			parentId: parentProjectId,
			ownerId: currentUser.id,
		},
		select: {
			id: true,
			title: true,
			description: true,
			createdAt: true,
		},
	});

	return apiResponse("Project created successfully", 201, {
		project: newProject,
	});
});

export const GET = asyncHandler(async (req: Request) => {
	const currentUser = await getAuthUser();

	const { id: rootProjectId } = await getRootProjectDetail({
		userId: currentUser.id,
	});

	const allProjectExceptRootProject = await getAllProjectInFlatFormat({
		userId: currentUser.id,
	});

	const rootProjectWithTaskAndNestedSubProject = getProjectHierarchy(
		allProjectExceptRootProject,
		rootProjectId
	);

	if (rootProjectWithTaskAndNestedSubProject.length === 0) {
		return apiResponse("You have no project", 200, {
			projects: rootProjectWithTaskAndNestedSubProject,
		});
	}

	return apiResponse("Fetched all projects successfully", 200, {
		projects: rootProjectWithTaskAndNestedSubProject,
	});
});
