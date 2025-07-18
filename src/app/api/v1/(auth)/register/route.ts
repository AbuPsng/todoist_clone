import { createUser, findUserByEmail } from "@/server/services/user.services";
import { userRegisterInputSchema } from "@/zod/user.schema";
import { generateHashPassword } from "@/lib/auth/auth.lib";
import { asyncHandler } from "@/lib/asyncHandler";
import { apiResponse } from "@/lib/ApiResponse";
import { sendMail } from "@/lib/mail/sendMail";
import { generateToken } from "@/lib/utils";
import ApiError from "@/lib/ApiError";
import { prisma } from "@/lib/db/db";

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

	await sendMail({
		to: email,
		subject: "Verify your email",
		verificationToken,
		username: newUser.name,
	});

	return apiResponse("User created successfully", 201);
});
