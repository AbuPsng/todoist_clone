import AddTaskButton from "@/components/shared/AddTaskButton";
import Image from "next/image";
import React from "react";

const EmptyDisplay = ({
	imageSrc,
	heading,
	description,
	componentName,
}: {
	imageSrc: string;
	heading: string;
	description: string;
	componentName: string;
}) => {
	return (
		<div className="flex flex-col justify-center items-center max-w-xl">
			<Image
				src={`/default_images/${imageSrc}`}
				height={200}
				width={200}
				alt="empty-inbox-image"
			/>
			<div className="flex flex-col justify-center items-center max-w-62 gap-y-3">
				<h3 className="font-bold">{heading}</h3>
				<p className="text-sm text-black/70 text-center">{description}</p>
				<AddTaskButton />
			</div>
		</div>
	);
};

export default EmptyDisplay;
