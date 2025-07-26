import { prisma } from "../db/db";

export const getAllTheMembers = async (projectId: string) => {
	const allMembers = await prisma.projectMembership.findMany({
		where: {
			projectId,
		},
		select: {
			id: true,
			teammateId: true,
			projectId: true,
			role: true,
			inviterId: true,
		},
	});

	return allMembers;
};
