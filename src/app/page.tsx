import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
	return (
		<div className="flex min-h-screen flex-col items-center justify-between p-24">
			<h1 className="text-4xl font-bold">Welcome to Todoist</h1>
			<p className="mt-4 text-lg">Your task management solution</p>
			<Button className="mt-6" variant="default">
				Get Started
			</Button>
		</div>
	);
}
