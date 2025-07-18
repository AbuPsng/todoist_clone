import z from "zod";

export const createInviteTokenInputSchema = z.object({
	email: z.string().optional(),
	projectId: z.string(),
	expiresDuration: z.number().optional(),
});
