export type StoreTaskType = {
	id: string;
	title: string;
};

export type StoreProjectType = {
	id: string;
	title: string;
};

export type StoreSubProjectType = {
	id: string;
	title: string;
	parentId?: string;
	task?: StoreTaskType[];
	subProjects: string[];
};

export type ProjectSetSubProjectInputType = {
	id: string;
	title: string;
	parentId?: string;
	task?: StoreTaskType[];
	subProjects?: Record<string, string>[];
};
