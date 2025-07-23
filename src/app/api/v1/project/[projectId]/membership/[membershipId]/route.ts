import { checkUserRoleAndGiveAccessAsRequire } from "@/lib/project_membership/checkUserRoleAndGiveAccess";
import { getAndValidateProjectId } from "@/lib/project/getAndValidateProjectId";
import { getAllTheMembers } from "@/lib/project_membership/getAllTheMembers";
import { asyncHandler } from "@/lib/asyncHandler";
import { apiResponse } from "@/lib/ApiResponse";

export const GET = asyncHandler(
	async (
		req: Request,
		{ params }: { params: Promise<{ projectId: string; membershipId: string }> }
	) => {
		const { projectId, membershipId } = await params;
		await getAndValidateProjectId(projectId);
		return apiResponse("sjdf", 200);
	}
);
