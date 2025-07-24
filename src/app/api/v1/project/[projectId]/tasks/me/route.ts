import { ensureUserIsProjectMember } from "@/lib/task_assignee/ensureUserIsProjectMember";
import { getAndValidateProjectId } from "@/lib/project/getAndValidateProjectId";
import { getAndValidateTaskId } from "@/lib/task/getAndValidateTaskId";
import { getAuthUser } from "@/lib/auth/getAuthUser";
import { asyncHandler } from "@/lib/asyncHandler";
import { apiResponse } from "@/lib/ApiResponse";
import { prisma } from "@/lib/db/db";

export const GET = asyncHandler(
	async (
		req: Request,
		{ params }: { params: Promise<{ projectId: string }> }
	) => {
		const currentUser = await getAuthUser();

		const { id: projectId } = await getAndValidateProjectId(params);

		await ensureUserIsProjectMember({
			userId: currentUser.id,
			projectId,
		});

		const taskAssignees = await prisma.taskAssignee.findMany({
			where: { projectId, assigneeId: currentUser.id },
		});
		return apiResponse("All task assigned to me  fetched successfully", 200, {
			taskAssignees,
		});
	}
);
