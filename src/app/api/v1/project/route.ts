import { assertProjectOwnershipOrThrow } from "@/server/services/project.services";
import { getRootProjectDetail } from "@/lib/project/getRootProjectDetails";
import { createProjectInputSchema } from "@/zod/project.schema";
import { getAuthUser } from "@/lib/auth/getAuthUser";
import { asyncHandler } from "@/lib/asyncHandler";
import { apiResponse } from "@/lib/ApiResponse";
import ApiError from "@/lib/ApiError";
import { prisma } from "@/lib/db/db";

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
	});

	return apiResponse("Project created successfully", 201, {
		project: newProject,
	});
});

export const GET = asyncHandler(async (req: Request) => {
	const currentUser = await getAuthUser();

	const projects = await prisma.project.findMany({
		where: { ownerId: currentUser.id, isRoot: false },
		select: {
			id: true,
			title: true,
			description: true,
			createdAt: true,
			subProjects: {
				select: {
					id: true,
					title: true,
				},
			},
		},
	});

	if (projects.length === 0) {
		return apiResponse("You have no project", 200, { projects });
	}

	return apiResponse("Fetched all projects successfully", 200, { projects });
});
