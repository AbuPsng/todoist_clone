import { getAndValidateInvitationToken } from "@/lib/invite_token/genAndValidateInviteToken";
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

		const projectMembership = await prisma.projectMembership.create({
			data: {
				teammateId: currentUser.id,
				role,
				projectId,
				inviterId,
			},
			select: {
				project: {
					select: {
						title: true,
					},
				},
			},
		});

		await prisma.invitation.delete({
			where: { token },
		});
		return apiResponse(
			`You are now a member of project ${projectMembership.project.title}`,
			200
		);
	}
);
