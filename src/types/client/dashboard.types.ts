import { ElementType } from "react";

import {
	ProjectSetSubProjectInputType,
	StoreProjectType,
} from "./store/project.type";

export type SidebarChildrenType = {
	title: string;
	Icon: ElementType;
};

export type RootProjectAndImmediateProjectAndTask = {
	rootProject: StoreProjectType;
	projects: ProjectSetSubProjectInputType[];
};
