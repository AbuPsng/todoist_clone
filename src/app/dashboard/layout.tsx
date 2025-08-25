import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/dashboard/sidebar/AppSidebar";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<section className="w-full h-screen flex">
			<SidebarProvider>
				<AppSidebar />
				<main className="w-full h-full  flex justify-center items-center">
					{children}
				</main>
			</SidebarProvider>
		</section>
	);
};

export default DashboardLayout;
