import { Button } from "@heroui/react";
import { Plus } from "lucide-react";
import React from "react";

const AddTaskButton = () => {
	return (
		<Button className="bg-[#dc4c3e] rounded-sm text-sm py-0 flex gap-2 text-white max-w-[100px] justify-center px-2 hover:bg-red-800">
			<Plus className="bg-transparent text-white h-4.5 w-4.5 " />
			Add Task
		</Button>
	);
};

export default AddTaskButton;
