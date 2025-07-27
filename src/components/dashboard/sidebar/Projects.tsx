"use client";

import { SidebarMenuButton } from "@/components/ui/sidebar";
import { axiosInstance } from "@/lib/client/axios.config";
import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { Project } from "@/generated/prisma";
import { Plus } from "lucide-react";

// type Project = {
// 	projectId?: string;
// 	taskId?: string;
// };

type SidebarProjectGroup = {
	heading: string;
	projectsArray: Project[];
};

const Projects = () => {
	const [projects, setProject] = useState();

	const handleFetch = async () => {
		const response = await axiosInstance.get("/project");
		console.log(response);
	};

	useEffect(() => {
		handleFetch();
	}, []);

	return (
		<div className="ml-1">
			<div className="flex w-full items-center justify-between hover:bg-gray-100 cursor-pointer px-1 ">
				<h2 className="text-sm font-semibold py-2">My Projects</h2>
				<div>
					<Button variant={"ghost"}>
						<Plus />
					</Button>
					<Button variant={"ghost"}>
						<IoIosArrowDown />
					</Button>
				</div>
			</div>
			<div className="mt-1">
				<SidebarMenuButton>
					<h3># Wish and Keys</h3>
				</SidebarMenuButton>
				<SidebarMenuButton>
					<h3># Todoist</h3>
				</SidebarMenuButton>
				<SidebarMenuButton>
					<h3># Amazon clone</h3>
				</SidebarMenuButton>
				<SidebarMenuButton>
					<h3># Youtube clone</h3>
				</SidebarMenuButton>
			</div>
		</div>
	);
};

export default Projects;
