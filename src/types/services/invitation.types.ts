import { ROLE_TO_INDEX } from "@/const/api/const";

export type CheckUserRoleAndGiveAccessAsRequire = {
	roleRequire: keyof typeof ROLE_TO_INDEX;
	projectId: string;
	userId?: string;
};
