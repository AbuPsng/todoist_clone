import z from "zod";

export const createInviteTokenInputSchema = z.object({
	email: z.string(),
	projectId: z.string(),
	expiresDuration: z.number().optional(),
});

export const updateInviteTokenInputSchema = z.object({
	email: z.string().optional(),
	expiresDuration: z.number().optional(),
});
