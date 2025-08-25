import { StoreTaskType } from "./task.types";

export type StoreProjectType = {
	id: string;
	title: string;
};

export type StoreSubProjectType = {
	id: string;
	title: string;
	parentId?: string;
	tasks?: StoreTaskType[];
	subProjects: string[];
};

export type ProjectSetSubProjectInputType = {
	id: string;
	title: string;
	description?: string;
	parentId?: string;
	task?: StoreTaskType[];
	subProjects?: Record<string, string>[];
};
