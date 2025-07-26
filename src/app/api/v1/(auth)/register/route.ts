import { createUser, findUserByEmail } from "@/server/services/user.services";
import { generateHashPassword } from "@/lib/api/auth/auth.lib";
import { userRegisterInputSchema } from "@/zod/user.schema";
import { asyncHandler } from "@/lib/api/asyncHandler";
import { apiResponse } from "@/lib/api/ApiResponse";
import { sendMail } from "@/lib/api/mail/sendMail";
import { generateToken } from "@/lib/api/utils";
import ApiError from "@/lib/api/ApiError";
import { prisma } from "@/lib/api/db/db";

export const POST = asyncHandler(async (req: Request) => {
	const body = await req.json();

	// Validate the request body using Zod schema
	const parsed = userRegisterInputSchema.safeParse(body);

	if (!parsed.success) {
		// Zod found issues — return first error
		const errorMessage = parsed.error.errors[0].message;
		throw new ApiError(errorMessage, 400);
	}
	const { email, name, password } = parsed.data;
	const hashedPassword = await generateHashPassword(password);

	// "Check if email is valid";
	const existingUser = await findUserByEmail(email);

	if (existingUser) {
		throw new ApiError("User already exists", 400);
	}

	const newUser = await createUser({ email, name, password: hashedPassword });

	if (!newUser) {
		throw new ApiError("User creation failed", 500);
	}
	const verificationToken = generateToken(32);

	await prisma.user.update({
		where: { id: newUser.id },
		data: { verificationToken },
	});

	const link = `${process.env.BASE_URL}/verify/${verificationToken}`;

	await sendMail({
		to: email,
		subject: "Verify your email",
		link,
		variant: "VERIFICATION",
		username: newUser.name,
	});

	console.log(link, "-----link--------");

	return apiResponse("User created successfully", 201);
});
