import { ROLE_TO_INDEX } from "@/const";

export type CreateMembershipInputType = {
	teammateId: string;
	projectId: string;
	role: keyof typeof ROLE_TO_INDEX;
	inviterId: string;
};
