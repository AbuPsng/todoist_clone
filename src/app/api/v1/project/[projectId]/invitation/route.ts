import { checkUserRoleAndGiveAccessAsRequire } from "@/lib/project_membership/checkUserRoleAndGiveAccess";
import { getAndValidateProjectId } from "@/lib/project/getAndValidateProjectId";
import { getAllTheMembers } from "@/lib/project_membership/getAllTheMembers";
import { asyncHandler } from "@/lib/asyncHandler";
import { apiResponse } from "@/lib/ApiResponse";

export const GET = asyncHandler(
	async (
		req: Request,
		{ params }: { params: Promise<{ projectId: string }> }
	) => {
		const { id: projectId } = await getAndValidateProjectId(params);

		await checkUserRoleAndGiveAccessAsRequire({
			roleRequire: "MEMBER",
			projectId,
		});

		const allMembers = await getAllTheMembers(projectId);

		return apiResponse(
			"Successfully fetched all the members ofxs the project",
			200,
			{ members: allMembers }
		);
	}
);
