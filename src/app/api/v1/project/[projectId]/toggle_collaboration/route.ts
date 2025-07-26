import { checkUserRoleAndGiveAccessAsRequire } from "@/lib/api/project_membership/checkUserRoleAndGiveAccess";
import { getAndValidateProjectId } from "@/lib/api/project/getAndValidateProjectId";
import { createMembership } from "@/lib/api/project_membership/createMembership";
import { zodValidateAndParesData } from "@/lib/api/zodValidateAndParesData";
import { toggleStatusChangeInputSchema } from "@/zod/project.schema";
import { asyncHandler } from "@/lib/api/asyncHandler";
import { getAuthUser } from "@/lib/auth/getAuthUser";
import { apiResponse } from "@/lib/api/ApiResponse";
import { prisma } from "@/lib/db/db";

export const POST = asyncHandler(
	async (
		req: Request,
		{ params }: { params: Promise<{ projectId: string }> }
	) => {
		const body = await req.json();
		const currentUser = await getAuthUser();

		const { toggleStatus } = zodValidateAndParesData(
			toggleStatusChangeInputSchema,
			body
		);

		const { id: projectId } = await getAndValidateProjectId(params);

		await createMembership({
			teammateId: currentUser.id,
			role: "OWNER",
			projectId,
			inviterId: currentUser.id,
		});

		await prisma.project.update({
			where: {
				id: projectId,
				ownerId: currentUser.id,
			},
			data: {
				isCollaborated: toggleStatus,
			},
		});

		return apiResponse(
			"Successfully change the project collaborated status",
			200
		);
	}
);
