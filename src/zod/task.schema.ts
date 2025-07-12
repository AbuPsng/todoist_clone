import z from "zod";

export const taskInputSchema = z
	.object({
		title: z.string().min(3, "Title must be at least 3 characters long"),
		description: z.string().optional(),
		projectId: z.string().optional(),
		dueDate: z.coerce.date().optional(),
	})
	.strict();

export const taskUpdateInputSchema = z
	.object({
		title: z.string().optional(),
		description: z.string().optional(),
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
