import {
	ProjectTreeHierarchyReturnType,
	ProjectTreeHierarchyType,
} from "@/types/services/project.services.types";

export function getProjectHierarchy(
	allProjects: ProjectTreeHierarchyType[],
	parentProjectId: string
): ProjectTreeHierarchyReturnType[] {
	const hierarchyTree = allProjects
		.filter((project) => project.parentId === parentProjectId)
		.map((parentProject) => {
			return {
				...parentProject,
				subProjects: getProjectHierarchy(allProjects, parentProject.id),
			};
		});

	return hierarchyTree;
}
