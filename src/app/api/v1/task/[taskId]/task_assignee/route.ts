import { checkUserRoleAndGiveAccessAsRequire } from "@/lib/project_membership/checkUserRoleAndGiveAccess";
import { ensureUserIsProjectMember } from "@/lib/task_assignee/ensureUserIsProjectMember";
import { zodValidateAndParesData } from "@/lib/zodValidateAndParesData";
import { assignUserToTask } from "@/lib/task_assignee/assignUserToTask";
import { getAndValidateTaskId } from "@/lib/task/getAndValidateTaskId";
import { createTaskAssigneeInputSchema } from "@/zod/task_assignee";
import { getAuthUser } from "@/lib/auth/getAuthUser";
import { asyncHandler } from "@/lib/asyncHandler";
import { apiResponse } from "@/lib/ApiResponse";

export const POST = asyncHandler(
	async (req: Request, { params }: { params: Promise<{ taskId: string }> }) => {
		const currentUser = await getAuthUser();

		const body = await req.json();

		const { id: taskId, projectId } = await getAndValidateTaskId(params);

		const { teammateId } = zodValidateAndParesData(
			createTaskAssigneeInputSchema,
			body
		);

		await ensureUserIsProjectMember({
			userId: teammateId,
			projectId,
		});

		await checkUserRoleAndGiveAccessAsRequire({
			roleRequire: "ADMIN",
			projectId,
			userId: currentUser.id,
		});

		await assignUserToTask({
			assigneeId: teammateId,
			assignerId: currentUser.id,
			taskId,
		});
		return apiResponse("User assigned to task successfully", 200);
	}
);
