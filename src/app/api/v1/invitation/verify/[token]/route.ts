import { getAndValidateInvitationToken } from "@/lib/api/invitation/genAndValidateInviteToken";
import { createMembership } from "@/lib/api/project_membership/createMembership";
import { getAuthUser } from "@/lib/api/auth/getAuthUser";
import { asyncHandler } from "@/lib/api/asyncHandler";
import { apiResponse } from "@/lib/api/ApiResponse";
import { prisma } from "@/lib/api/db/db";

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
