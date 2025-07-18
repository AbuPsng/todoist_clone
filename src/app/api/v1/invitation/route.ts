import { getAndValidateProjectId } from "@/lib/project/getAndValidateProjectId";
import { createInviteTokenInputSchema } from "@/zod/invite_token.schema";
import { zodValidateAndParesData } from "@/lib/zodValidateAndParesData";
import { addHours, generateToken } from "@/lib/utils";
import { getAuthUser } from "@/lib/auth/getAuthUser";
import { asyncHandler } from "@/lib/asyncHandler";
import { apiResponse } from "@/lib/ApiResponse";
import { prisma } from "@/lib/db/db";

export const POST = asyncHandler(async (req: Request) => {
	const body = await req.json();
	const currentUser = await getAuthUser();

	const parsedData = zodValidateAndParesData(createInviteTokenInputSchema, body);

	const { email, projectId, expiresDuration } = parsedData;

	await getAndValidateProjectId(projectId);

	const token = generateToken(32);

	const expiresAt = expiresDuration
		? addHours(new Date(), expiresDuration)
		: null;

	await prisma.invitation.create({
		data: {
			token,
			inviterId: currentUser.id,
			email,
			projectId,
			...(expiresAt && { expiresAt }),
		},
	});

	const urlLink = `${process.env.API_BASE_URL}/invite_token/verify/${token}`;

	return apiResponse("Invitation link created successfully", 201, {
		link: urlLink,
	});
});
