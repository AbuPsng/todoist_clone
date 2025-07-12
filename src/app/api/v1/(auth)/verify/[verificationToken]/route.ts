import { asyncHandler } from "@/lib/asyncHandler";
import { apiResponse } from "@/lib/ApiResponse";
import ApiError from "@/lib/ApiError";
import { prisma } from "@/lib/db/db";

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
			data: { isVerified: true, verificationToken: null },
		});

		if (!verifiedUser) {
			throw new ApiError("Failed to verify user", 500);
		}

		return apiResponse("User verified successfully", 200);
	}
);
