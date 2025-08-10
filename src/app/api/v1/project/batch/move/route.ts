import { getAndValidateProjectId } from "@/lib/api/project/getAndValidateProjectId";
import { batchMoveProjectInputSchema } from "@/zod/project.schema";
import { asyncHandler } from "@/lib/api/asyncHandler";
import { apiResponse } from "@/lib/api/ApiResponse";
import ApiError from "@/lib/api/ApiError";
import { prisma } from "@/lib/api/db/db";

export const POST = asyncHandler(async (req: Request) => {
	const body = await req.json();

	const parsed = batchMoveProjectInputSchema.safeParse(body);

	if (!parsed.success) {
		const errorMessage = parsed.error.errors[0].message;
		throw new ApiError(
			errorMessage || "Either selected project or sub projects are missing",
			400
		);
	}

	const { parentProjectId, toBeMoveProjectIds } = parsed.data;

	await getAndValidateProjectId(parentProjectId);

	const validatedToBeMoveProjectIds = await prisma.project.findMany({
		where: {
			id: { in: toBeMoveProjectIds },
		},
		select: {
			id: true,
		},
	});

	if (toBeMoveProjectIds.length !== validatedToBeMoveProjectIds.length) {
		throw new ApiError("Please provide valid project id", 400);
	}

	const updateResult = await prisma.project.updateMany({
		where: {
			id: { in: toBeMoveProjectIds },
		},
		data: {
			parentId: parentProjectId,
		},
	});

	if (updateResult.count !== toBeMoveProjectIds.length) {
		throw new ApiError("Error while moving project  different project", 400);
	}

	return apiResponse("Successfully move the selected projects", 200);
});
