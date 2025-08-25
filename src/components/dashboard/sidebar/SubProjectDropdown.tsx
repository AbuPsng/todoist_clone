import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ProjectModal from "@/components/modals/projectModals/ProjectModal";
import ProjectDeleteModal from "@/components/modals/ConfirmDeleteModal";
import { SUB_PROJECT_DROPDOWN_MENU_LIST } from "@/const/client/const";
import TaskModal from "@/components/modals/taskModals/TaskModal";
import React, { useState } from "react";
import { Ellipsis } from "lucide-react";

const SubProjectDropdown = ({ id, title }: { id: string; title: string }) => {
	const [isCreateModalOpen, setCreateModalOpen] = useState<boolean>(false);
	const [isEditModalOpen, setEditModalOpen] = useState<boolean>(false);
	const [isTaskModalOpen, setTaskModalOpen] = useState<boolean>(false);
	const [isDeleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger
					asChild
					className="cursor-pointer hover:bg-gray-300/60 h-full rounded-sm py-1.5 w-full px-0.5"
				>
					<Ellipsis className={`aspect-square w-1 max-w-7`} />
				</DropdownMenuTrigger>

				<DropdownMenuContent className="w-56" align="start">
					<DropdownMenuGroup>
						{SUB_PROJECT_DROPDOWN_MENU_LIST.map((item) => {
							const { Icon, title } = item;

							return (
								<DropdownMenuItem
									key={title}
									className="text-black/80 flex gap-x-3 cursor-pointer"
									onSelect={(e) => {
										if (title === "Add Project") {
											setCreateModalOpen(true);
										} else if (title === "Edit Project") {
											setEditModalOpen(true);
										} else if (title === "Add Task") {
											setTaskModalOpen(true);
										} else if (title === "Delete Project") {
											setDeleteModalOpen(true);
										}
									}}
								>
									<Icon className="text-black" />
									{title}
								</DropdownMenuItem>
							);
						})}
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
			{isCreateModalOpen && (
				<ProjectModal
					mode="CREATE"
					isOpen={isCreateModalOpen}
					onClose={() => setCreateModalOpen(false)}
					classname="text-black"
					title="Add Project"
					parentId={id}
				/>
			)}

			{isEditModalOpen && (
				<ProjectModal
					mode="EDIT"
					isOpen={isEditModalOpen}
					onClose={() => setEditModalOpen(false)}
					classname="text-black"
					title={title}
					parentId={id}
				/>
			)}

			{isTaskModalOpen && (
				<TaskModal
					mode="CREATE"
					isOpen={isTaskModalOpen}
					onClose={() => setTaskModalOpen(false)}
					classname="text-black"
					title={"Add Task"}
					projectId={id}
				/>
			)}

			{isDeleteModalOpen && (
				<ProjectDeleteModal
					modalType="PROJECT"
					isOpen={isDeleteModalOpen}
					onClose={() => setDeleteModalOpen(false)}
					projectId={id}
					title={title}
				/>
			)}
		</>
	);
};

export default SubProjectDropdown;
