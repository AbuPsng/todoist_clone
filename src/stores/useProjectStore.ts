import { create } from "zustand";

type Task = {
	id: string;
	title: string;
};

type SubProject = {
	id: string;
	title: string;
};

type ProjectStoreType = {
	subProjectsMap: Record<string, SubProject[]>;
	tasksMap: Record<string, Task[]>;
	expandedIds: Set<string>;

	setSubProjects: (parentId: string, subProjects: SubProject[]) => void;
	setTasks: (projectId: string, tasks: Task[]) => void;
	toggleExpanded: (parentId: string) => void;
	isExpanded: (parentId: string) => boolean;
};

const useProjectStore = create<ProjectStoreType>((set, get) => ({
	subProjectsMap: {},
	tasksMap: {},
	expandedIds: new Set(),

	setSubProjects: (parentId, subProjects) => {
		set((state) => ({
			subProjectsMap: {
				...state.subProjectsMap,
				[parentId]: subProjects,
			},
		}));
	},

	setTasks: (projectId, tasks) => {
		set((state) => ({
			tasksMap: {
				...state.tasksMap,
				[projectId]: tasks,
			},
		}));
	},

	toggleExpanded: (projectId) => {
		const current = new Set(get().expandedIds);
		if (current.has(projectId)) current.delete(projectId);
		else current.add(projectId);
		set({ expandedIds: current });
	},

	isExpanded: (projectId) => get().expandedIds.has(projectId),
}));
