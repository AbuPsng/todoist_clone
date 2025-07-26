import { checkUserRoleAndGiveAccessAsRequire } from "@/lib/api/project_membership/checkUserRoleAndGiveAccess";
import { ensureUserIsProjectMember } from "@/lib/api/task_assignee/ensureUserIsProjectMember";
import { zodValidateAndParesData } from "@/lib/api/zodValidateAndParesData";
import { assignUserToTask } from "@/lib/api/task_assignee/assignUserToTask";
import { getAndValidateTaskId } from "@/lib/api/task/getAndValidateTaskId";
import { createTaskAssigneeInputSchema } from "@/zod/task_assignee";
import { asyncHandler } from "@/lib/api/asyncHandler";
import { getAuthUser } from "@/lib/auth/getAuthUser";
import { apiResponse } from "@/lib/api/ApiResponse";
import { prisma } from "@/lib/db/db";

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

//This api will get all the teammate which have been assign this task
export const GET = asyncHandler(
	async (req: Request, { params }: { params: Promise<{ taskId: string }> }) => {
		const currentUser = await getAuthUser();

		const { id: taskId, projectId } = await getAndValidateTaskId(params);

		await ensureUserIsProjectMember({
			userId: currentUser.id,
			projectId,
		});

		const taskAssignees = await prisma.taskAssignee.findMany({
			where: { taskId },
		});
		return apiResponse("Users assigned to this task fetched successfully", 200, {
			taskAssignees,
		});
	}
);
