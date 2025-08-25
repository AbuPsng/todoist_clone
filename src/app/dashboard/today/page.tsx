"use client";

import DashboardDisplayComponentHolder from "@/components/dashboard/display/DashboardDisplayComponentHolder";
import EmptyDisplay from "@/components/dashboard/display/EmptyDisplay";
import React from "react";

const page = () => {
	return (
		<DashboardDisplayComponentHolder heading="Today">
			<EmptyDisplay
				componentName="Inbox"
				heading="Capture now, plan later"
				description="Inbox is your go-to spot for quick task entry. Clear your mind now, organize when you’re ready."
				imageSrc="default_today_task.png"
			/>
			;
		</DashboardDisplayComponentHolder>
	);
};

export default page;
