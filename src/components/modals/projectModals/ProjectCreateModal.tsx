import {
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	useDisclosure,
} from "@heroui/react";
import { createProjectInputSchema } from "@/zod/project.schema";
import { useProjectStore } from "@/stores/useProjectStore";
import { axiosInstance } from "@/lib/client/axios.config";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { Plus } from "lucide-react";
import React from "react";
import z from "zod";

import { Button } from "../../ui/button";
import { Input } from "../../ui/input";

type FormData = z.infer<typeof createProjectInputSchema>;

export default function ProjectCreateModal({
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
	parentId?: string;
	isOpen?: boolean;
	onClose?: () => void;
}) {
	const disclosure = useDisclosure();

	const isControlled =
		controlledIsOpen !== undefined && controlledOnClose !== undefined;
	const isOpen = isControlled ? controlledIsOpen : disclosure.isOpen;
	const onClose = isControlled ? controlledOnClose : disclosure.onClose;
	const onOpen = isControlled ? () => {} : disclosure.onOpen;

	const { setSubProject, subProjectsMap, rootProject } = useProjectStore();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting, isValid },
	} = useForm<FormData>({
		resolver: zodResolver(createProjectInputSchema),
		mode: "onChange",
	});

	const onSubmit = async (formData: FormData) => {
		try {
			let responseData = null;
			if (mode === "EDIT") {
				const editProjectId = mode === "EDIT" ? parentId : null;
				responseData = await axiosInstance.patch(
					`/project/${editProjectId}`,
					formData
				);
			} else {
				formData.parentId = parentId || rootProject?.id;
				responseData = await axiosInstance.post("/project", formData);
			}
			const { data, success } = responseData.data;
			if (!success) {
				throw new Error("Failed to create project");
			}
			const { id, title } = data.project;

			const newProject = { parentId: formData.parentId, id, title };
			if (!rootProject) {
				throw new Error("Root project is not set");
			}

			setSubProject(newProject);
			reset();
			onClose();
		} catch (error) {
			console.error("Submission failed", error);
		}
	};

	return (
		<div className={classname} onClick={onOpen}>
			<div className="flex  gap-3">
				<Plus
					className="h-4 aspect-square cursor-pointer text-black"
					type="button"
				/>
				{title && <span className="text-sm text-black/80">{title}</span>}
			</div>
			<Modal isOpen={isOpen} onClose={onClose} className="rounded-md">
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex text-md flex-col gap-1 border-b py-2 mb-4">
								Add Project
							</ModalHeader>
							<ModalBody>
								<form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
									<div className="flex flex-col gap-2">
										<Label htmlFor="project_name">Name</Label>
										<Input id="project_name" type="text" {...register("title")} />
										{errors.title && (
											<p className="text-sm text-red-500">{errors.title.message}</p>
										)}
									</div>
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
									<ModalFooter className="mt-4 flex justify-end gap-2">
										<Button variant="destructive" type="button" onClick={onClose}>
											Close
										</Button>
										<Button
											variant="secondary"
											type="submit"
											disabled={!isValid || isSubmitting}
										>
											{isSubmitting ? "Creating..." : "Create"}
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
