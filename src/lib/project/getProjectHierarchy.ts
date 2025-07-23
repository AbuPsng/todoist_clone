import {
	ProjectTreeHierarchyReturnType,
	ProjectTreeHierarchyType,
} from "@/types/services/project.types";

export function getProjectHierarchy(
	allProjects: ProjectTreeHierarchyType[],
	parentProjectId: string
): ProjectTreeHierarchyReturnType[] {
	const hierarchyTreeOfOwnedProjects = allProjects
		.filter((project) => project.parentId === parentProjectId)
		.map((parentProject) => {
			return {
				...parentProject,
				subProjects: getProjectHierarchy(allProjects, parentProject.id),
			};
		});

	const allCollaboratedProjects = allProjects.filter(
		(project) => project.isCollaborated
	);

	const allProjectsHierarchyTree = [
		...hierarchyTreeOfOwnedProjects,
		...allCollaboratedProjects,
	];

	return allProjectsHierarchyTree;
}
