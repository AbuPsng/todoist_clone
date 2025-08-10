import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	useDisclosure,
} from "@heroui/modal";
import { useProjectStore } from "@/stores/useProjectStore";
import { axiosInstance } from "@/lib/client/axios.config";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const ConfirmDeleteModal = ({
	title,
	modalType = "PROJECT",
	classname,
	projectId,
	isOpen: controlledIsOpen,
	onClose: controlledOnClose,
}: {
	title: string;
	modalType: "PROJECT" | "TASK";
	classname?: string;
	projectId: string;
	isOpen?: boolean;
	onClose?: () => void;
}) => {
	const [isDeleting, setIsDeleting] = useState<boolean>(false);
	const disclosure = useDisclosure();
	const { deleteProject, subProjectsMap, rootProject } = useProjectStore();

	const isControlled =
		controlledIsOpen !== undefined && controlledOnClose !== undefined;
	const isOpen = isControlled ? controlledIsOpen : disclosure.isOpen;
	const onClose = isControlled ? controlledOnClose : disclosure.onClose;
	const onOpen = isControlled ? () => {} : disclosure.onOpen;

	const handleDelete = async () => {
		setIsDeleting(true);
		try {
			await axiosInstance.delete(`/project/${projectId}`);

			const parentProjectId =
				subProjectsMap[projectId]?.parentId || rootProject?.id;

			deleteProject(projectId, parentProjectId!);
			toast.success("Project deleted successfully");
			onClose();
		} catch (error: any) {
			console.error("Error deleting project:", error);
			toast.error(error.message || "Error deleting project");
		} finally {
			setIsDeleting(false);
		}
	};
	return (
		<Modal isOpen={isOpen} onClose={onClose} className={classname}>
			<ModalContent>
				<ModalHeader>Delete Project</ModalHeader>
				<ModalBody>
					<p className="text-gray-600">
						Are you sure you want to delete{" "}
						<span className="text-red-700 font-medium">{title}?</span> This action
						cannot be undone.
					</p>
				</ModalBody>
				<ModalFooter>
					<Button variant="ghost" onClick={onClose}>
						Cancel
					</Button>
					<Button
						className="bg-red-400 hover:bg-red-500"
						onClick={handleDelete}
						disabled={isDeleting}
					>
						{isDeleting ? <Loader className="animate-spinner-ease-spin" /> : "Delete"}
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default ConfirmDeleteModal;
