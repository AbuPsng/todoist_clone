import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarHeader,
	SidebarMenuButton,
	SidebarSeparator,
} from "@/components/ui/sidebar";
import { SidebarChildrenType } from "@/types/client/dashboard.types";
import { SIDEBAR_LINK } from "@/const/client/const";

import Projects from "./Projects";
import Navbar from "./Navbar";

const AppSidebar = () => {
	return (
		<Sidebar className="bg-red-400">
			<SidebarHeader className="bg-gray-200">
				<Navbar />
			</SidebarHeader>
			<SidebarContent>
				<SidebarSeparator className="w-full" />
				{/* Navigation */}
				<SidebarGroup className="w-full px-0">
					{SIDEBAR_LINK.map((item: SidebarChildrenType) => {
						const { title, Icon } = item;
						return (
							<SidebarMenuButton
								key={item.title}
								asChild
								className="cursor-pointer my-1 "
							>
								<button className="flex items-center gap-4 px-3 py-2">
									<Icon className="" /> {/* 👈 Icon size here */}
									<span className=" ">{item.title}</span>
								</button>
							</SidebarMenuButton>
						);
					})}
				</SidebarGroup>

				<SidebarSeparator />
				{/* Projects */}

				<SidebarGroup className="w-full px-0">
					<Projects />
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter />
		</Sidebar>
	);
};

export default AppSidebar;
