import { checkUserRoleAndGiveAccessAsRequire } from "@/lib/project_membership/checkUserRoleAndGiveAccess";
import { ensureUserIsProjectMember } from "@/lib/task_assignee/ensureUserIsProjectMember";
import { zodValidateAndParesData } from "@/lib/zodValidateAndParesData";
import { assignUserToTask } from "@/lib/task_assignee/assignUserToTask";
import { getAndValidateTaskId } from "@/lib/task/getAndValidateTaskId";
import { createTaskAssigneeInputSchema } from "@/zod/task_assignee";
import { getAuthUser } from "@/lib/auth/getAuthUser";
import { asyncHandler } from "@/lib/asyncHandler";
import { apiResponse } from "@/lib/ApiResponse";
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
