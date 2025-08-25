"use client";

import DashboardDisplayComponentHolder from "@/components/dashboard/display/DashboardDisplayComponentHolder";
import EmptyDisplay from "@/components/dashboard/display/EmptyDisplay";

const page = () => {
	return (
		<DashboardDisplayComponentHolder heading="Inbox">
			{/*Case-1: no task */}
			<EmptyDisplay
				componentName="Inbox"
				heading="Capture now, plan later"
				description="Inbox is your go-to spot for quick task entry. Clear your mind now, organize when you’re ready."
				imageSrc="default_inbox.png"
			/>
		</DashboardDisplayComponentHolder>
	);
};

export default page;
