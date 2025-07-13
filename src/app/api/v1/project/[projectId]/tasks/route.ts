import { getAndValidateProjectId } from "@/lib/project/getAndValidateProjectId";
import { asyncHandler } from "@/lib/asyncHandler";
import { apiResponse } from "@/lib/ApiResponse";

export const GET = asyncHandler(
	async (
		req: Request,
		{ params }: { params: Promise<{ projectId: string }> }
	) => {
		const { id: projectId, subProjects: subProjectIds } =
			await getAndValidateProjectId(params);

		return apiResponse(`Successfully fetch all the tasks of `, 200);
	}
);
