import ApiError from "../ApiError";
import { prisma } from "../db/db";

export const checkAndValidateMembershipById = async (
	params: Promise<{ membershipId: string }>
) => {
	const { membershipId } = await params;

	const membership = await prisma.projectMembership.findUnique({
		where: {
			id: membershipId,
		},
		select: {
			id: true,
			projectId: true,
			role: true,
			createdAt: true,
			teammate: {
				select: {
					id: true,
					name: true,
					imageUrl: true,
				},
			},
			inviter: {
				select: {
					name: true,
					imageUrl: true,
				},
			},
		},
	});

	if (!membership) {
		throw new ApiError("Team member not found", 404);
	}

	return membership;
};
