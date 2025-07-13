import ApiError from "@/lib/ApiError";
import { prisma } from "@/lib/db/db";


export const assertProjectOwnershipOrThrow = async (
	projectProjectId: string,
	userId: string
) => {
	const parentProject = await prisma.project.findUnique({
		where: {
			id: projectProjectId,
			ownerId: userId,
		},
	});

	if (!parentProject) {
		throw new ApiError("No such project exist", 400);
	}
	return true;
};


export const getAllTheTaskFromNestedProject= async(projectId){
	
}