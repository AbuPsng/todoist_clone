import { createProjectInputSchema } from "@/zod/project.schema";
import z from "zod";

export type CreateProjectInputType = z.infer<typeof createProjectInputSchema>;

type ProjectTreeTaskType = {
	id: string;
	title: string;
};

export type ProjectTreeHierarchyReturnType = {
	id: string;
	title: string;
	parentId: string | null;
	isCollaborated: boolean;
	tasks: ProjectTreeTaskType[];
	subProjects?: ProjectTreeHierarchyType[];
};

export type ProjectTreeHierarchyType = Omit<
	ProjectTreeHierarchyReturnType,
	"subProjects"
>;
