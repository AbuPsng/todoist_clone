"use client";

import { Button } from "@/components/ui/button";
import { fetchSubProjectsAndParentId } from "@/lib/client/axiosApi";
import { useProjectStore } from "@/stores/useProjectStore";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";

import ProjectCreateModal from "@/components/modals/projectModals/ProjectModal";
import SubProject from "./SubProject";

const Projects = () => {
	const {
		rootProject: mainProject,
		subProjectsMap,
		setRootProject,
		setSubProject,
		isRootProjectExpanded,
		toggleRootProject,
	} = useProjectStore();

	const handleFetch = async () => {
		const data = await fetchSubProjectsAndParentId();

		if (!data) return;

		const { rootProject, projects } = data;

		setRootProject(rootProject);
		// console.log(projects, "projects");
		projects.forEach((project) => {
			setSubProject(project);
		});
	};

	useEffect(() => {
		handleFetch();
	}, []);

	return (
		<div className="ml-1 h-fit ">
			<div className="flex w-full items-center justify-between hover:bg-gray-100 cursor-pointer px-1 ">
				<h2 className="text-sm font-semibold py-2">
					{mainProject && "title" in mainProject ? (
						mainProject.title
					) : (
						<Loader className="animate-spin h-4 aspect-square" />
					)}
				</h2>
				<div className="flex">
					<div className="p-1.5 px-2  flex items-center rounded-md cursor-pointer hover:bg-gray-300/60 ">
						{mainProject && "title" in mainProject ? (
							<>
								<ProjectCreateModal mode="CREATE" />
							</>
						) : (
							""
						)}
					</div>
					<Button variant={"ghost"} onClick={toggleRootProject}>
						{mainProject && "title" in mainProject ? (
							<IoIosArrowDown
								className={`transition-transform duration-200 ${
									isRootProjectExpanded ? "rotate-0" : "-rotate-90"
								}`}
							/>
						) : (
							""
						)}
					</Button>
				</div>
			</div>
			<div className="mt-1 flex flex-col gap-y-1 relative">
				{isRootProjectExpanded &&
					mainProject &&
					"title" in mainProject &&
					subProjectsMap[mainProject.id]?.subProjects?.map((subProjectId) => {
						const { id, title } = subProjectsMap[subProjectId];

						return (
							<div key={id} className="cursor-pointer w-full py-0 px-1 ">
								<SubProject id={id} title={title} />
							</div>
						);
					})}
			</div>
		</div>
	);
};

export default Projects;
