import { getAndValidateProjectId } from "@/lib/api/project/getAndValidateProjectId";
import { zodValidateAndParesData } from "@/lib/api/zodValidateAndParesData";
import { createInviteTokenInputSchema } from "@/zod/invitation.schema";
import { addHours, generateToken } from "@/lib/api/utils";
import { asyncHandler } from "@/lib/api/asyncHandler";
import { getAuthUser } from "@/lib/auth/getAuthUser";
import { apiResponse } from "@/lib/api/ApiResponse";
import { sendMail } from "@/lib/mail/sendMail";
import { prisma } from "@/lib/db/db";

export const POST = asyncHandler(async (req: Request) => {
	const body = await req.json();
	const currentUser = await getAuthUser();

	const parsedData = zodValidateAndParesData(createInviteTokenInputSchema, body);

	const { email, projectId, expiresDuration } = parsedData.data;

	await getAndValidateProjectId(projectId);

	const token = generateToken(32);

	const expiresAt = expiresDuration
		? addHours(new Date(), expiresDuration)
		: null;

	const invitation = await prisma.invitation.create({
		data: {
			token,
			inviterId: currentUser.id,
			email,
			projectId,
			...(expiresAt && { expiresAt }),
		},
	});

	const urlLink = `${process.env.API_BASE_URL}/invite_token/verify/${token}`;

	await sendMail({
		to: invitation.email,
		subject: "Invitation to join project",
		variant: "INVITATION",
		username: "",
		link: urlLink,
	});

	return apiResponse("Invitation link created successfully", 201, {
		link: urlLink,
	});
});
