import { taskInputSchema } from "@/zod/task.schema";
import z from "zod";

export type CreateTaskInput = z.infer<typeof taskInputSchema> & {
	userId: string;
};
