import { createUser, findUserByEmail } from "@/server/services/user.services";
import { asyncHandler } from "@/lib/asyncHandler";
import { apiResponse } from "@/lib/ApiResponse";
import { sendMail } from "@/lib/sendMail";
import { apiError } from "@/lib/apiError";
import { randomBytes } from "crypto";
import { prisma } from "@/lib/db";

export const POST = asyncHandler(async (req: Request) => {
	const { email, name, password, confirmPassword } = await req.json();

	// "Check if all fields are provided";
	if (!email || !name || !password || !confirmPassword) {
		return apiError("All fields are required", 400);
	}

	// Checking if password and confirmPassword match
	if (password !== confirmPassword) {
		return apiError("Passwords do not match", 400);
	}

	// "Check if email is valid";
	const existingUser = await findUserByEmail(email);

	if (existingUser) {
		return apiError("User already exists", 400);
	}

	const newUser = await createUser({ email, name, password });

	if (!newUser) {
		return apiError("User creation failed", 500);
	}
	const verificationToken = randomBytes(32).toString("hex");

	await prisma.user.update({
		where: { id: newUser.id },
		data: { verificationToken },
	});

	await sendMail({
		to: email,
		subject: "Verify your email",
		token: verificationToken,
	});
	console.log("hero");

	return apiResponse("User created successfully", 201);
});
