import { checkUserRoleAndGiveAccessAsRequire } from "../project_membership/checkUserRoleAndGiveAccess";
import { getAuthUser } from "../auth/getAuthUser";
import ApiError from "../ApiError";
import { prisma } from "../db/db";

export const getAndValidateInvitationId = async (
	params: Promise<{ invitationId: string }> | string,
	userId?: string
) => {
	let currentUserId = userId ? userId : (await getAuthUser()).id;

	const invitationId =
		typeof params === "string" ? params : (await params).invitationId;

	if (!invitationId || typeof invitationId !== "string") {
		throw new ApiError("Please provide a valid invitation ID", 400);
	}

	const invitation = await prisma.invitation.findUnique({
		where: { id: invitationId },
	});

	if (!invitation) {
		throw new ApiError("invitation not found", 404);
	}

	if (invitation.inviterId !== currentUserId) {
		await checkUserRoleAndGiveAccessAsRequire({
			roleRequire: "ADMIN",
			projectId: invitation.projectId,
			userId: currentUserId,
		});
	}

	return invitation;
};
