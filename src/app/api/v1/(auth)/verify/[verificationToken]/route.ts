import { asyncHandler } from "@/lib/api/asyncHandler";
import { apiResponse } from "@/lib/api/ApiResponse";
import { ROOT_PROJECT } from "@/const/api/const";
import ApiError from "@/lib/api/ApiError";
import { prisma } from "@/lib/api/db/db";

export const GET = asyncHandler(
	async (req: Request, context: { params: { verificationToken: string } }) => {
		const { verificationToken } = context.params;

		if (!verificationToken) {
			throw new ApiError("Verification token is required", 400);
		}
		const user = await prisma.user.findFirst({
			where: { verificationToken },
		});

		if (!user) {
			throw new ApiError("Invalid verification token", 400);
		}

		const verifiedUser = await prisma.user.update({
			where: { id: user.id },
			data: {
				isVerified: true,
				verificationToken: null,
				projects: {
					create: {
						title: ROOT_PROJECT.name,
						isRoot: true,
						parentId: null,
					},
				},
			},
		});

		if (!verifiedUser) {
			throw new ApiError("Failed to verify user", 500);
		}

		return apiResponse("User verified successfully", 200);
	}
);
