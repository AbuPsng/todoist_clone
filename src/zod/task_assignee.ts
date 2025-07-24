import z from "zod";

export const createTaskAssigneeInputSchema = z.object({
	teammateId: z.string(),
});
