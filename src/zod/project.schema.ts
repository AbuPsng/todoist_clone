import z from "zod";

export const createProjectInputSchema = z
	.object({
		title: z.string().min(4, "Project name should at least contain 4 letter"),
		description: z.string().optional(),
		parentId: z.string().optional(),
	})
	.strict();

export const updateProjectInputSchema = z
	.object({
		title: z.string().optional(),
		description: z.string().optional(),
	})
	.strict();
