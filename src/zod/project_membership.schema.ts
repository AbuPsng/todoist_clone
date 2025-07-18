import { PROJECT_MEMBERSHIPS_ROLES_VALUES } from "@/const";
import z from "zod";

export const createProjectMembershipInputSchema = z.object({
	teammateId: z.string(),
	projectId: z.string(),
	inviterId: z.string().optional(),
	role: z.enum(PROJECT_MEMBERSHIPS_ROLES_VALUES).default("MEMBER"),
});
