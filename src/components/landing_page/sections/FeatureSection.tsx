// components/Features.tsx
import {
	BellIcon,
	CalendarDaysIcon,
	CheckCircleIcon,
	ClockIcon,
	DevicePhoneMobileIcon,
	ShareIcon,
} from "@heroicons/react/24/outline";

type Feature = {
	name: string;
	description: string;
	icon: (props: React.ComponentProps<"svg">) => React.ReactNode;
};

const features: Feature[] = [
	{
		name: "Smart Task Management",
		description:
			"Organize tasks with priorities, categories, and due dates. Never miss an important deadline.",
		icon: CheckCircleIcon,
	},
	{
		name: "Time Tracking",
		description:
			"Built-in timer and productivity analytics help you understand how you spend your time.",
		icon: ClockIcon,
	},
	{
		name: "Cross-Platform Sync",
		description:
			"Access your tasks anywhere. Seamless sync across desktop, mobile, and web platforms.",
		icon: DevicePhoneMobileIcon,
	},
	{
		name: "Smart Notifications",
		description:
			"Intelligent reminders that adapt to your schedule and help you stay on track.",
		icon: BellIcon,
	},
	{
		name: "Calendar Integration",
		description:
			"View tasks in calendar format and integrate with Google Calendar, Outlook, and more.",
		icon: CalendarDaysIcon,
	},
	{
		name: "Team Collaboration",
		description:
			"Share projects, assign tasks to team members, and track progress together.",
		icon: ShareIcon,
	},
];

const FeatureSection: React.FC = () => (
	<section id="features" className="bg-white py-24">
		<div className="mx-auto max-w-7xl px-6 lg:px-8">
			{/* Header */}
			<div className="mx-auto max-w-2xl text-center">
				<h2 className="mt-5 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl lg:text-6xl">
					Powerful features to{" "}
					<span className="relative inline-flex">
						<span className="absolute inset-0 h-full w-full bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] blur-lg opacity-30"></span>
						<span className="relative">boost productivity</span>
					</span>
				</h2>
				<p className="mt-8 text-base text-gray-500">
					From simple task lists to advanced project management, our todo app grows
					with your needs.
				</p>
			</div>

			{/* Feature Grid */}
			<div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
				<dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
					{features.map(({ name, description, icon: Icon }) => (
						<div
							key={name}
							className="flex flex-col border-1 border-black/20 p-3 rounded-md hover:bg-gray-100/40"
						>
							<dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
								<div className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-900">
									<Icon className="h-5 w-5 text-white" aria-hidden="true" />
								</div>
								{name}
							</dt>
							<dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
								<p className="flex-auto">{description}</p>
							</dd>
						</div>
					))}
				</dl>
			</div>
		</div>
	</section>
);

export default FeatureSection;
