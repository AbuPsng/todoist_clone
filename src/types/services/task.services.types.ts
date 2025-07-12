import { taskInputSchema, taskUpdateInputSchema } from "@/zod/task.schema";
import z from "zod";

export type CreateTaskInputType = z.infer<typeof taskInputSchema> & {
	userId: string;
};

export type UpdateTaskInputType = z.infer<typeof taskUpdateInputSchema>;

export type GetTaskQueryType = {
	userId: string;
	order?: "asc" | "desc";
	projectId?: string;
	title?: string;
	pageNumber?: number;
	pageSize?: number;
	dueDate?: string;
};
