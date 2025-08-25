import {
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	useDisclosure,
} from "@heroui/react";
import { ProjectSetSubProjectInputType } from "@/types/client/store/project.type";
import { useProjectStore } from "@/stores/useProjectStore";
import { axiosInstance } from "@/lib/client/axios.config";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskInputSchema } from "@/zod/task.schema";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import z from "zod";

import { Button } from "../../ui/button";
import { Input } from "../../ui/input";

type FormData = z.input<typeof taskInputSchema>;

export default function TaskModal({
	title,
	mode,
	classname,
	projectId,
	isOpen: controlledIsOpen,
	onClose: controlledOnClose,
}: {
	title?: string;
	mode: "CREATE" | "EDIT";
	classname?: string;
	projectId: string;
	isOpen?: boolean;
	onClose?: () => void;
}) {
	const disclosure = useDisclosure();
	const [editProject, setEditProject] =
		useState<ProjectSetSubProjectInputType>();

	// Controlled vs uncontrolled mode
	const isControlled =
		controlledIsOpen !== undefined && controlledOnClose !== undefined;
	const isOpen = isControlled ? controlledIsOpen : disclosure.isOpen;
	const onClose = isControlled ? controlledOnClose! : disclosure.onClose;
	const onOpen = isControlled ? () => {} : disclosure.onOpen;

	const { rootProject } = useProjectStore();

	const {
		register,
		handleSubmit,
		reset,
		control,
		formState: { errors, isSubmitting, isValid },
	} = useForm<FormData>({
		resolver: zodResolver(taskInputSchema),
		mode: "onChange",
	});

	// Fetch project data in EDIT mode
	// useEffect(() => {
	// 	if (mode === "EDIT" && projectId) {
	// 		(async () => {
	// 			try {
	// 				const data = await fetchSubProjectById(projectId);
	// 				if (data) {
	// 					setEditProject(data);
	// 					const { title, description } = data;
	// 					reset({ title, description }); // Prefill form
	// 				}
	// 			} catch (err) {
	// 				console.error(err);
	// 				toast.error("Failed to fetch project details");
	// 			}
	// 		})();
	// 	}
	// }, [mode, projectId, reset]);

	// Handle submit
	const onSubmit = async (formData: FormData) => {
		try {
			let response;
			if (mode === "EDIT") {
				if (!projectId) throw new Error("Project ID missing for edit");
				response = await axiosInstance.patch(`/task/${projectId}`, formData);
			} else {
				const payload = { ...formData, projectId: projectId || rootProject?.id };
				response = await axiosInstance.post("/task", payload);
			}

			const { data, success } = response.data;
			if (!success) throw new Error("Request failed");
			console.log(data, "---data---");
			// const { id, title } = data.project;
			// if (!rootProject) throw new Error("Root project is not set");

			// setSubProject({ projectId, id, title });
			// toast.success(mode === "CREATE" ? "Project created" : "Project updated");

			reset();
			onClose();
		} catch (error) {
			console.error(error);
			toast.error(
				mode === "CREATE" ? "Failed to create Task" : "Failed to edit Task"
			);
		}
	};

	return (
		<div className={classname}>
			{/* Trigger */}
			<div className="flex gap-3 items-center cursor-pointer" onClick={onOpen}>
				<Plus className="h-4 aspect-square text-black" />
				{title && <span className="text-sm text-black/80">{title}</span>}
			</div>

			{/* Modal */}
			<Modal isOpen={isOpen} onClose={onClose} className="rounded-md">
				<ModalContent>
					{() => (
						<>
							<ModalHeader className="flex text-md flex-col gap-1 border-b py-2 mb-4">
								{mode === "CREATE" ? "Add Task" : `Edit ${title || "Project"}`}
							</ModalHeader>
							<ModalBody>
								<form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
									{/* Name */}
									<div className="flex flex-col gap-2">
										<Label htmlFor="project_name">Name</Label>
										<Input id="project_name" type="text" {...register("title")} />
										{errors.title && (
											<p className="text-sm text-red-500">{errors.title.message}</p>
										)}
									</div>

									{/* Description */}
									<div className="flex flex-col gap-2">
										<Label htmlFor="project_description">Description</Label>
										<Input
											id="project_description"
											type="text"
											{...register("description")}
										/>
										{errors.description && (
											<p className="text-sm text-red-500">{errors.description.message}</p>
										)}
									</div>
									<div className="flex flex-col gap-2"></div>

									{/* Footer */}
									<ModalFooter className="mt-4 flex justify-end gap-2">
										<Button variant="destructive" type="button" onClick={onClose}>
											Close
										</Button>
										<Button
											variant="secondary"
											type="submit"
											disabled={!isValid || isSubmitting}
										>
											{isSubmitting
												? mode === "CREATE"
													? "Creating..."
													: "Updating..."
												: mode === "CREATE"
													? "Create"
													: "Update"}
										</Button>
									</ModalFooter>
								</form>
							</ModalBody>
						</>
					)}
				</ModalContent>
			</Modal>
		</div>
	);
}
