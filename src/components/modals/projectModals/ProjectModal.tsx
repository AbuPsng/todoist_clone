import {
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	useDisclosure,
} from "@heroui/react";
import { ProjectSetSubProjectInputType } from "@/types/client/store/project.type";
import { createProjectInputSchema } from "@/zod/project.schema";
import { fetchSubProjectById } from "@/lib/client/axiosApi";
import { useProjectStore } from "@/stores/useProjectStore";
import { axiosInstance } from "@/lib/client/axios.config";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import z from "zod";

import { Button } from "../../ui/button";
import { Input } from "../../ui/input";

type FormData = z.infer<typeof createProjectInputSchema>;

export default function ProjectModal({
	title,
	mode,
	classname,
	parentId,
	isOpen: controlledIsOpen,
	onClose: controlledOnClose,
}: {
	title?: string;
	mode: "CREATE" | "EDIT";
	classname?: string;
	parentId?: string; // CREATE → parentId, EDIT → projectId
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

	const { setSubProject, rootProject } = useProjectStore();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting, isValid },
	} = useForm<FormData>({
		resolver: zodResolver(createProjectInputSchema),
		mode: "onChange",
	});

	// Fetch project data in EDIT mode
	useEffect(() => {
		if (mode === "EDIT" && parentId) {
			(async () => {
				try {
					const data = await fetchSubProjectById(parentId);
					if (data) {
						setEditProject(data);
						const { title, description } = data;
						reset({ title, description }); // Prefill form
					}
				} catch (err) {
					console.error(err);
					toast.error("Failed to fetch project details");
				}
			})();
		}
	}, [mode, parentId, reset]);

	// Handle submit
	const onSubmit = async (formData: FormData) => {
		try {
			let response;
			if (mode === "EDIT") {
				if (!parentId) throw new Error("Project ID missing for edit");
				response = await axiosInstance.patch(`/project/${parentId}`, formData);
			} else {
				const payload = { ...formData, parentId: parentId || rootProject?.id };
				response = await axiosInstance.post("/project", payload);
			}

			const { data, success } = response.data;
			if (!success) throw new Error("Request failed");

			const { id, title } = data.project;
			if (!rootProject) throw new Error("Root project is not set");

			setSubProject({ parentId, id, title });
			toast.success(mode === "CREATE" ? "Project created" : "Project updated");

			reset();
			onClose();
		} catch (error) {
			console.error(error);
			toast.error(
				mode === "CREATE" ? "Failed to create project" : "Failed to edit project"
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
								{mode === "CREATE" ? "Add Project" : `Edit ${title || "Project"}`}
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
