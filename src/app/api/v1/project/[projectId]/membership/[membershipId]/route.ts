import { checkUserRoleAndGiveAccessAsRequire } from "@/lib/api/project_membership/checkUserRoleAndGiveAccess";
import { checkAndValidateMembershipById } from "@/lib/api/project_membership/checkAndValidateMembershipById";
import { updateMembershipRoleInputSchema } from "@/zod/project_membership.schema";
import { zodValidateAndParesData } from "@/lib/api/zodValidateAndParesData";
import { asyncHandler } from "@/lib/api/asyncHandler";
import { getAuthUser } from "@/lib/auth/getAuthUser";
import { apiResponse } from "@/lib/api/ApiResponse";
import { prisma } from "@/lib/db/db";

export const GET = asyncHandler(
	async (
		req: Request,
		{ params }: { params: Promise<{ membershipId: string }> }
	) => {
		const membership = await checkAndValidateMembershipById(params);

		await checkUserRoleAndGiveAccessAsRequire({
			roleRequire: "MEMBER",
			projectId: membership.projectId,
		});

		return apiResponse("Team member fetched successfully", 200, {
			member: membership,
		});
	}
);

export const PATCH = asyncHandler(
	async (
		req: Request,
		{ params }: { params: Promise<{ membershipId: string }> }
	) => {
		const body = await req.json();
		const currentUser = await getAuthUser();

		const { roleToAssign } = zodValidateAndParesData(
			updateMembershipRoleInputSchema,
			body
		);

		const membership = await checkAndValidateMembershipById(params);

		await checkUserRoleAndGiveAccessAsRequire({
			roleRequire: "OWNER",
			projectId: membership.projectId,
		});

		const updatedMembership = await prisma.projectMembership.update({
			where: { id: membership.id },
			data: {
				role: roleToAssign,
			},
		});

		return apiResponse("Team member role updated successfully", 200, {
			member: updatedMembership,
		});
	}
);

export const DELETE = asyncHandler(
	async (
		req: Request,
		{ params }: { params: Promise<{ membershipId: string }> }
	) => {
		const membership = await checkAndValidateMembershipById(params);

		await checkUserRoleAndGiveAccessAsRequire({
			roleRequire: "OWNER",
			projectId: membership.projectId,
		});

		await prisma.projectMembership.delete({
			where: { id: membership.id },
		});

		return apiResponse("Team member deleted successfully", 200);
	}
);
