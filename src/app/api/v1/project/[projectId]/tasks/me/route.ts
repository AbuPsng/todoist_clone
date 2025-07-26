import { ensureUserIsProjectMember } from "@/lib/api/task_assignee/ensureUserIsProjectMember";
import { getAndValidateProjectId } from "@/lib/api/project/getAndValidateProjectId";
import { asyncHandler } from "@/lib/api/asyncHandler";
import { getAuthUser } from "@/lib/auth/getAuthUser";
import { apiResponse } from "@/lib/api/ApiResponse";
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
