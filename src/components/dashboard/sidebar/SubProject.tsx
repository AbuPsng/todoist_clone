import { StoreProjectType } from "@/types/client/store/project.type";
import { useProjectStore } from "@/stores/useProjectStore";
import { axiosInstance } from "@/lib/client/axios.config";
import { IoIosArrowDown } from "react-icons/io";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";

import SubProjectDropdown from "./SubProjectDropdown";

const SubProject = ({ id, title }: StoreProjectType) => {
	const { isExpanded, subProjectsMap, toggleExpanded, setSubProject } =
		useProjectStore();
	const isSubProjectExpanded = isExpanded(id);

	const handleFetchSubProjects = async (projectId: string) => {
		if (
			subProjectsMap[projectId] &&
			Object.keys(subProjectsMap[projectId]).length > 0
		) {
			return;
		}

		try {
			const { data } = await axiosInstance.get(`/project/${id}`);
			if (!data.success) {
				throw new Error("Error while fetching sub projects");
			}

			data.data.subProjects.forEach((project: StoreProjectType) =>
				setSubProject(project)
			);
		} catch (error: any) {
			toast.error(error.message || "error while fetching sub projects");
		}
	};

	const handleToggle = async (id: string) => {
		await handleFetchSubProjects(id);
		toggleExpanded(id);
	};

	useEffect(() => {
		const fetchSubProjectIfExpanded = async (id: string) => {
			if (!isSubProjectExpanded) return;

			const subProjects = subProjectsMap[id]?.subProjects || [];
			if (subProjects.length > 0) {
				for (const projectId of subProjects) {
					if (!subProjectsMap[projectId]) {
						await handleFetchSubProjects(projectId);
					}
				}
			}
		};

		fetchSubProjectIfExpanded(id);
	}, [id]);

	return (
		<div className="pl-2  w-full cursor-pointer rounded-md">
			<div className=" flex items-center h-8">
				<div className="flex w-full  items-center justify-between hover:bg-gray-100 ">
					<h3 className="text-sm">
						{title ? (
							<span className="text-sm"> # {title.slice(0, 16)}</span>
						) : (
							<Loader className="animate-spin h-4 aspect-square" />
						)}
					</h3>
					<div className="flex justify-center items-center px-1.5">
						<div className="p-2  ">
							{title && <SubProjectDropdown id={id} title={title} />}
						</div>

						<div className="p-1.5 hover:bg-gray-300/60 rounded-sm">
							<IoIosArrowDown
								type="button"
								className={` aspect-square transition-all ease-in rounded-sm ${isSubProjectExpanded ? "rotate-0" : "-rotate-90"} `}
								onClick={() => handleToggle(id)}
							/>
						</div>
					</div>
				</div>
			</div>

			{isSubProjectExpanded &&
				subProjectsMap[id] &&
				subProjectsMap[id]?.subProjects.length > 0 &&
				subProjectsMap[id]?.subProjects?.map((projectId) => {
					if (!subProjectsMap[projectId]) {
						return null;
					}

					const { id, title } = subProjectsMap[projectId];
					return <SubProject id={id} title={title} key={id} />;
				})}
		</div>
	);
};

export default SubProject;
