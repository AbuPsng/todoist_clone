import { getAndValidateProjectId } from "@/lib/api/project/getAndValidateProjectId";
import { batchDeleteProjectInputSchema } from "@/zod/project.schema";
import { asyncHandler } from "@/lib/api/asyncHandler";
import { apiResponse } from "@/lib/api/ApiResponse";
import ApiError from "@/lib/api/ApiError";
import { prisma } from "@/lib/db/db";

export const POST = asyncHandler(async (req: Request) => {
	const body = await req.json();

	const parsed = batchDeleteProjectInputSchema.safeParse(body);

	if (!parsed.success) {
		const errorMessage = parsed.error.errors[0].message;
		throw new ApiError(
			errorMessage || "Either selected project or sub projects are missing",
			400
		);
	}

	const { toBeDeleteProjectIds } = parsed.data;

	const validatedToBeDeleteProjectIds = await prisma.project.findMany({
		where: {
			id: { in: toBeDeleteProjectIds },
		},
		select: {
			id: true,
		},
	});

	if (toBeDeleteProjectIds.length !== validatedToBeDeleteProjectIds.length) {
		throw new ApiError("Please provide valid project id", 400);
	}

	const deleteResult = await prisma.project.deleteMany({
		where: {
			id: { in: toBeDeleteProjectIds },
		},
	});

	if (deleteResult.count !== toBeDeleteProjectIds.length) {
		throw new ApiError("Error while deleting the selected project", 400);
	}

	return apiResponse("Successfully delete the selected projects", 200);
});
