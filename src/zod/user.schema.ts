import z from "zod";

export const userRegisterInputSchema = z
	.object({
		email: z.string().email("Invalid email address"),
		name: z
			.string()
			.min(5, "Name must be at least 3 characters long")
			.max(15, "Name must be at most 50 characters long"),
		password: z.string().min(8, "Password must be at least 8 characters long"),
		confirmPassword: z
			.string()
			.min(8, "Confirm password must be at least 8 characters long"),
	})
	.strict()
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
	});

export const userLoginInputSchema = z
	.object({
		email: z.string().email("Invalid email address"),
		password: z.string().min(8, "Password must be at least 8 characters long"),
	})
	.strict();
