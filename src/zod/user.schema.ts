import z from "zod";

export const userRegisterInputSchema = z
	.object({
		email: z.string().trim().email("Invalid email address"),
		name: z
			.string()
			.trim()
			.min(5, "Name must be at least 3 characters long")
			.max(15, "Name must be at most 50 characters long"),
		password: z
			.string()
			.trim()
			.min(8, "Password must be at least 8 characters long"),
		confirmPassword: z
			.string()
			.trim()
			.min(8, "Confirm password must be at least 8 characters long"),
	})
	.strict()
	.superRefine((data, ctx) => {
		if (data.password !== data.confirmPassword) {
			ctx.addIssue({
				path: ["confirmPassword"], // 👈 attaches error to the field
				code: "custom",
				message: "Passwords do not match",
			});
		}
	});

export const userLoginInputSchema = z
	.object({
		email: z.string().trim().email("Invalid email address"),
		password: z
			.string()
			.trim()
			.min(8, "Password must be at least 8 characters long"),
	})
	.strict();
