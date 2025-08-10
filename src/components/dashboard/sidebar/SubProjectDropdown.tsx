import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ProjectDeleteModal from "@/components/modals/projectModals/ConfirmDeleteModal";
import ProjectModal from "@/components/modals/projectModals/ProjectCreateModal";
import { SUB_PROJECT_DROPDOWN_MENU_LIST } from "@/const/client/const";
import React, { useState } from "react";
import { Ellipsis } from "lucide-react";

const SubProjectDropdown = ({ id, title }: { id: string; title: string }) => {
	const [isCreateModalOpen, setCreateModalOpen] = useState(false);
	const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

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
