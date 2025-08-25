import { getImmediateSubProjectsAndTasks } from "@/lib/api/project/getImmediateSubProjectsAndTasks";
import { getAndValidateProjectId } from "@/lib/api/project/getAndValidateProjectId";
import { asyncHandler } from "@/lib/api/asyncHandler";
import { apiResponse } from "@/lib/api/ApiResponse";

export const GET = asyncHandler(
	async (
		req: Request,
		{ params }: { params: Promise<{ projectId: string }> }
	) => {
		const { id: projectId } = await getAndValidateProjectId(params);

		const subProjects = await getImmediateSubProjectsAndTasks(projectId);

		return apiResponse("Project fetched successfully", 200, {
			subProjects,
		});
	}
);
