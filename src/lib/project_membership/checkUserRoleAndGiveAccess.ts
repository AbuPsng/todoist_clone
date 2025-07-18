import { CheckUserRoleAndGiveAccessAsRequire } from "@/types/services/invitation.types";
import { ROLE_TO_INDEX } from "@/const";

import { getAuthUser } from "../auth/getAuthUser";
import ApiError from "../ApiError";
import { prisma } from "../db/db";

const convertRoleToNumber = (role: keyof typeof ROLE_TO_INDEX) => {
	return ROLE_TO_INDEX[role];
};

export const checkUserRoleAndGiveAccessAsRequire = async ({
	roleRequire,
	projectId,
	userId,
}: CheckUserRoleAndGiveAccessAsRequire) => {
	const currentUserId = userId || (await getAuthUser()).id;

	const membership = await prisma.projectMembership.findUnique({
		where: {
			teammateId_projectId: {
				teammateId: currentUserId,
				projectId,
			},
		},
	});

	if (!membership) {
		throw new ApiError("You don't have access to this project", 403);
	}

	const teammateRoleInIndex = convertRoleToNumber(membership.role);
	const minimumRequiredRoleInIndex = convertRoleToNumber(roleRequire);

	if (teammateRoleInIndex < minimumRequiredRoleInIndex) {
		throw new ApiError("You don't have permission to perform this action", 403);
	}

	return membership;
};
