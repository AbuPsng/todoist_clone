import { CreateMembershipInputType } from "@/types/services/project_membership.types";

import { prisma } from "../db/db";

export const createMembership = async ({
	teammateId,
	projectId,
	role,
	inviterId,
}: CreateMembershipInputType) => {
	const existingMembership = await prisma.projectMembership.findUnique({
		where: {
			teammateId_projectId: {
				teammateId,
				projectId,
			},
		},
	});

	if (existingMembership) {
		// Already a member, just return it or do nothing
		return existingMembership;
	}

	return await prisma.projectMembership.create({
		data: {
			teammateId,
			role,
			projectId,
			inviterId,
		},
	});
};
