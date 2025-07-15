import { createProjectInputSchema } from "@/zod/project.schema";
import z from "zod";

export type CreateProjectInputType = z.infer<typeof createProjectInputSchema>;

type ProjectTreeTaskType = {
	id: string;
	title: string;
	createdAt: string;
};

export type ProjectTreeHierarchyType = {
	id: string;
	title: string;
	description: string | null;
	createdAt: Date;
	parentId: string;
	tasks: ProjectTreeTaskType[];
	subProjects: ProjectTreeHierarchyType[];
};
