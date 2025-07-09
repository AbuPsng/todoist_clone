import z from "zod";

export const taskInputSchema = z.object({
	title: z.string().min(3, "Title must be at least 3 characters long"),
	description: z.string().optional(),
	projectId: z.string().optional(),
	dueDate: z.date().optional(),
});
