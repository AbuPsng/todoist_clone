export const ROOT_PROJECT = { name: "My Projects" };

export const PROJECT_MEMBERSHIPS_ROLES_OBJECT = {
	OWNER: "OWNER",
	ADMIN: "ADMIN",
	MEMBER: "MEMBER",
};

export const PROJECT_MEMBERSHIPS_ROLES_VALUES = [
	"OWNER",
	"ADMIN",
	"MEMBER",
] as const;

export const INVITATION_STATUS = {
	PENDING: "PENDING",
	SUCCESS: "SUCCESS",
	REJECTED: "REJECTED",
};

export const ROLE_TO_INDEX = {
	OWNER: 2,
	ADMIN: 1,
	MEMBER: 0,
} as const;
