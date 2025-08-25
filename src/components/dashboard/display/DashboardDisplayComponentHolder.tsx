import Image from "next/image";
import React from "react";

const DashboardDisplayComponentHolder = ({
	heading,
	children,
}: {
	heading: string;
	children: React.ReactNode;
}) => {
	return (
		<main className="w-5/7 h-6/7 flex flex-col gap-y-10">
			<h2 className="text-3xl font-bold ">{heading}</h2>
			<div className="flex flex-col justify-center items-center">{children}</div>
		</main>
	);
};

export default DashboardDisplayComponentHolder;
