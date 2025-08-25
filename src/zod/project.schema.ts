import z from "zod";

export const createProjectInputSchema = z
	.object({
		title: z
			.string()
			.trim()
			.min(1, "Project name should at least contain 4 letter"),
		description: z.string().trim().optional(),
		parentId: z.string().optional(),
	})
	.strict();

export const updateProjectInputSchema = z
	.object({
		title: z.string().trim().optional(),
		description: z.string().trim().optional(),
	})
	.strict();

export const batchMoveProjectInputSchema = z.object({
	parentProjectId: z.string(),
	toBeMoveProjectIds: z.array(z.string().trim()),
});

export const batchDeleteProjectInputSchema = z.object({
	toBeDeleteProjectIds: z.array(z.string().trim()),
});

export const toggleStatusChangeInputSchema = z.object({
	toggleStatus: z.boolean(),
});
