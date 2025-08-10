import {
	ProjectSetSubProjectInputType,
	StoreProjectType,
	StoreSubProjectType,
	StoreTaskType,
} from "@/types/client/store/project.type";
import { persist } from "zustand/middleware";
import { create } from "zustand";

type ProjectStoreType = {
	isRootProjectExpanded: boolean;
	rootProject: StoreProjectType | null;
	subProjectsMap: Record<string, StoreSubProjectType>;
	tasksMap: Record<string, StoreTaskType[]>;
	expandedIds: Set<string>;

	setRootProject: (project: StoreProjectType) => void;
	setSubProject: (subProject: ProjectSetSubProjectInputType) => void;
	deleteProject: (projectId: string, parentId: string) => void;
	setManySubProjects: (
		parentId: string,
		subProjects: StoreSubProjectType[]
	) => void;
	setTasks: (projectId: string, tasks: StoreTaskType[]) => void;
	toggleExpanded: (parentId: string) => void;
	toggleRootProject: () => void;
	isExpanded: (parentId: string) => boolean;
};

type PersistedProjectStore = {
	rootProject: StoreProjectType | null;
	isRootProjectExpanded: boolean;
	expandedIds: string[];
};

export const useProjectStore = create<ProjectStoreType>()(
	persist(
		(set, get) => ({
			isRootProjectExpanded: false,
			rootProject: null,
			subProjectsMap: {},
			tasksMap: {},
			expandedIds: new Set(),

			setRootProject: (project) => {
				set({ rootProject: project });
			},

			setSubProject: (newSubProject) => {
				set((state) => {
					const cloneSubProjectsMap = { ...state.subProjectsMap };

					const updatedSubProject = {
						...newSubProject,
						subProjects: newSubProject.subProjects
							? newSubProject.subProjects.map((subProject) => subProject.id)
							: [],
					};

					cloneSubProjectsMap[newSubProject.id] = {
						...cloneSubProjectsMap[newSubProject.id],
						...updatedSubProject,
					};

					const parentId = newSubProject.parentId || state.rootProject?.id;
					if (!parentId) return { subProjectsMap: cloneSubProjectsMap };

					const parent = cloneSubProjectsMap[parentId] || {
						id: parentId,
						subProjects: [],
					};

					if (!parent.subProjects.includes(newSubProject.id)) {
						parent.subProjects = [...parent.subProjects, newSubProject.id];
					}

					cloneSubProjectsMap[parentId] = parent;

					return { subProjectsMap: { ...cloneSubProjectsMap } };
				});
			},

			deleteProject: (projectId, parentId) => {
				const clonedCurrentStateSubProjects = { ...get().subProjectsMap };

				if (!clonedCurrentStateSubProjects[projectId]) return;

				const parentProject = clonedCurrentStateSubProjects[parentId];

				// Remove project reference from parent
				if (parentProject) {
					parentProject.subProjects = parentProject.subProjects.filter(
						(subProjectId) => subProjectId !== projectId
					);
				}

				// Recursive deletion function
				const deleteRecursively = (id: string) => {
					const project = clonedCurrentStateSubProjects[id];
					if (!project) return;

					// First delete all children
					project.subProjects.forEach((childId) => {
						deleteRecursively(childId);
					});

					// Then delete the project itself
					delete clonedCurrentStateSubProjects[id];
				};

				// Start recursive deletion from this project
				deleteRecursively(projectId);

				// Save updated state
				set({ subProjectsMap: clonedCurrentStateSubProjects });
			},

			setManySubProjects: () => {},

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
				if (current.has(projectId)) {
					current.delete(projectId);
				} else {
					current.add(projectId);
				}
				set({ expandedIds: current });
			},

			toggleRootProject: () => {
				set((state) => ({
					isRootProjectExpanded: !state.isRootProjectExpanded,
				}));
			},

			isExpanded: (projectId) => get().expandedIds.has(projectId),
		}),
		{
			name: "project-store",
			partialize: (state): PersistedProjectStore => ({
				rootProject: state.rootProject,
				isRootProjectExpanded: state.isRootProjectExpanded,
				expandedIds: Array.from(state.expandedIds),
			}),
			merge: (persisted, current) => {
				const persistedData = persisted as PersistedProjectStore | null;

				if (!persistedData) {
					return current;
				}

				return {
					...current,
					...persistedData,
					expandedIds: new Set(persistedData.expandedIds ?? []),
				};
			},
		}
	)
);
