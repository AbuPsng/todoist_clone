import { getAndValidateInvitationToken } from "@/lib/invitation/genAndValidateInviteToken";
import { createMembership } from "@/lib/project_membership/createMembership";
import { getAndValidateTaskId } from "@/lib/task/getAndValidateTaskId";
import { getAuthUser } from "@/lib/auth/getAuthUser";
import { asyncHandler } from "@/lib/asyncHandler";
import { apiResponse } from "@/lib/ApiResponse";
import { INVITATION_STATUS } from "@/const";
import { prisma } from "@/lib/db/db";

export const GET = asyncHandler(
	async (req: Request, { params }: { params: Promise<{ token: string }> }) => {
		const currentUser = await getAuthUser();
		const invitation = await getAndValidateInvitationToken(
			params,
			currentUser.email
		);

		const { role, projectId, inviterId, token } = invitation;

		await createMembership({
			role,
			projectId,
			inviterId,
			teammateId: currentUser.id,
		});

		await prisma.invitation.delete({
			where: { token },
		});
		return apiResponse(`You have the team successfully`, 200);
	}
);
