import z from "zod";

export const taskInputSchema = z
	.object({
		title: z.string().trim().min(3, "Title must be at least 3 characters long"),
		description: z.string().trim().optional(),
		projectId: z.string().optional(),
		dueDate: z.coerce.date().optional(),
	})
	.strict();

export const taskUpdateInputSchema = z
	.object({
		title: z.string().trim().optional(),
		description: z.string().trim().optional(),
		completed: z.boolean().optional(),
		dueDate: z.coerce.date().optional(),
	})
	.strict();

// export const getTaskQuerySchema = z.object({
// 	title: z.string().optional(),
// 	userId: z.string(),
// 	projectId: z.string().optional(),
// 	dueDate: z.coerce.date().optional(),
// 	pageSize: z.number().optional(),
// 	pageNumber: z.number().optional(),
// 	order: z.string().optional(),
// });
