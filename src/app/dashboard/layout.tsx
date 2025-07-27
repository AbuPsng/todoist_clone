import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/dashboard/sidebar/AppSidebar";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<section className="w-full h-screen bg-red-50 flex ">
			<SidebarProvider>
				<main>
					<AppSidebar />
					<SidebarTrigger />
					{children}
				</main>
			</SidebarProvider>
		</section>
	);
};

export default DashboardLayout;
