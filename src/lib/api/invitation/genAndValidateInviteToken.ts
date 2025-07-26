import { getAuthUser } from "../auth/getAuthUser";
import ApiError from "../ApiError";
import { prisma } from "../db/db";

export const getAndValidateInvitationToken = async (
	params: Promise<{ token: string }>,
	email?: string
) => {
	const { token } = await params;
	const currentUserEmail = email ? email : (await getAuthUser()).email;

	if (!token || typeof token !== "string") {
		throw new ApiError("Please provide a valid token ", 400);
	}

	const invitation = await prisma.invitation.findUnique({ where: { token } });

	if (!invitation) {
		throw new ApiError("invitation not found", 404);
	}

	const isExpired = invitation?.expiresAt && invitation.expiresAt < new Date();

	if (isExpired) {
		await prisma.invitation.delete({
			where: {
				token,
			},
		});
		throw new ApiError("Token has expired", 403);
	}

	if (invitation.email !== currentUserEmail) {
		throw new ApiError(
			"You do not have permission to access this invitation",
			403
		);
	}

	return invitation;
};
