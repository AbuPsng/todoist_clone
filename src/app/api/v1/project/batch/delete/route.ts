import { asyncHandler } from "@/lib/asyncHandler";
import { apiResponse } from "@/lib/ApiResponse";
import { prisma } from "@/lib/db/db";

export const DELETE = asyncHandler(async (req: Request) => {
	await prisma.project.deleteMany();

	return apiResponse("successfully delete all the project", 200);
});
