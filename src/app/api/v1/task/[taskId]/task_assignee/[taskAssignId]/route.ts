import { checkUserRoleAndGiveAccessAsRequire } from "@/lib/project_membership/checkUserRoleAndGiveAccess";
import { getAndValidateTaskAssigneeId } from "@/lib/task_assignee/getAndValidateTaskAssigneeId";
import { getAuthUser } from "@/lib/auth/getAuthUser";
import { asyncHandler } from "@/lib/asyncHandler";
import { apiResponse } from "@/lib/ApiResponse";
import { prisma } from "@/lib/db/db";

export const DELETE = asyncHandler(
	async (
		req: Request,
		{ params }: { params: Promise<{ taskAssignId: string }> }
	) => {
		const currentUser = await getAuthUser();

		const { id, projectId } = await getAndValidateTaskAssigneeId(params);

		await checkUserRoleAndGiveAccessAsRequire({
			roleRequire: "ADMIN",
			projectId,
			userId: currentUser.id,
		});

		await prisma.taskAssignee.delete({
			where: { id },
		});

		return apiResponse("User unassigned to task successfully", 200);
	}
);
