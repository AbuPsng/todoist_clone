import { RootProjectAndImmediateProjectAndTask } from "@/types/client/dashboard.types";
import { toast } from "sonner";

import { axiosInstance } from "./axios.config";

export const fetchSubProjectsAndParentId = async (): Promise<
	RootProjectAndImmediateProjectAndTask | undefined
> => {
	try {
		const response = await axiosInstance.get("/project");

		if (!response.data.success) {
			throw new Error("Error while fetching the projects.");
		}

		return response.data.data;
	} catch (error: any) {
		toast.error(error?.message || "Error while fetching the projects.");
		return undefined;
	}
};
