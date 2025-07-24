import { checkUserRoleAndGiveAccessAsRequire } from "@/lib/project_membership/checkUserRoleAndGiveAccess";
import { ensureUserIsProjectMember } from "@/lib/task_assignee/ensureUserIsProjectMember";
import { zodValidateAndParesData } from "@/lib/zodValidateAndParesData";
import { assignUserToTask } from "@/lib/task_assignee/assignUserToTask";
import { getAndValidateTaskId } from "@/lib/task/getAndValidateTaskId";
import { createTaskAssigneeInputSchema } from "@/zod/task_assignee";
import { getAuthUser } from "@/lib/auth/getAuthUser";
import { asyncHandler } from "@/lib/asyncHandler";
import { apiResponse } from "@/lib/ApiResponse";

export const GET = asyncHandler(
	async (
		req: Request,
		{ params }: { params: Promise<{ assignId: string }> }
	) => {
		const currentUser = await getAuthUser();

		const body = await req.json();

		return apiResponse("User assigned to task successfully", 200);
	}
);
