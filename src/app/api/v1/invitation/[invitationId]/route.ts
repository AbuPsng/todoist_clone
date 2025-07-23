import { getAndValidateInvitationId } from "@/lib/invitation/getAndValidateInvitationId";
import { updateInviteTokenInputSchema } from "@/zod/invitation.schema";
import { asyncHandler } from "@/lib/asyncHandler";
import { apiResponse } from "@/lib/ApiResponse";
import { addHours } from "@/lib/utils";
import ApiError from "@/lib/ApiError";
import { prisma } from "@/lib/db/db";

export const PATCH = asyncHandler(
	async (
		req: Request,
		{ params }: { params: Promise<{ invitationId: string }> }
	) => {
		const { id: invitationId } = await getAndValidateInvitationId(params);

		const body = await req.json();

		const parsed = updateInviteTokenInputSchema.safeParse(body);

		if (!parsed.success) {
			const errorMessage = parsed.error.errors[0].message;
			throw new ApiError(errorMessage, 400);
		}

		const { email, expiresDuration } = parsed.data;

		const expiresAt = expiresDuration
			? addHours(new Date(), expiresDuration)
			: null;

		const updateInvitation = await prisma.invitation.update({
			where: { id: invitationId },
			data: {
				email,
				...(expiresAt && { expiresAt }),
			},
		});

		return apiResponse("Invitation updated successfully", 200, {
			invitation: updateInvitation,
		});
	}
);

export const DELETE = asyncHandler(
	async (
		req: Request,
		{ params }: { params: Promise<{ invitationId: string }> }
	) => {
		const { id: invitationId } = await getAndValidateInvitationId(params);

		await prisma.invitation.delete({
			where: { id: invitationId },
		});

		return apiResponse("Invitation deleted successfully", 200);
	}
);
