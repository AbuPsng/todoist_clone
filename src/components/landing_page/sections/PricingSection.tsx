// components/Pricing.tsx
"use client";
import { CheckIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

type Plan = {
	name: string;
	id: string;
	price: { monthly: number; annually: number };
	description: string;
	features: string[];
	mostPopular: boolean;
};

const plans: Plan[] = [
	{
		name: "Free",
		id: "free",
		price: { monthly: 0, annually: 0 },
		description: "Perfect for personal use and small projects.",
		features: [
			"Up to 50 tasks",
			"Basic task organization",
			"Mobile and web access",
			"Email notifications",
			"24/7 community support",
		],
		mostPopular: false,
	},
	{
		name: "Pro",
		id: "pro",
		price: { monthly: 12, annually: 120 },
		description: "Advanced features for power users and small teams.",
		features: [
			"Unlimited tasks and projects",
			"Advanced filtering and search",
			"Time tracking and analytics",
			"Calendar integrations",
			"Priority support",
			"Custom themes",
			"Offline access",
		],
		mostPopular: true,
	},
	{
		name: "Team",
		id: "team",
		price: { monthly: 25, annually: 250 },
		description: "Collaboration tools for teams and organizations.",
		features: [
			"Everything in Pro",
			"Team collaboration",
			"Advanced permissions",
			"Team analytics dashboard",
			"Admin controls",
			"API access",
			"Custom integrations",
			"Dedicated account manager",
		],
		mostPopular: false,
	},
];

const PricingSection: React.FC = () => {
	const [frequency, setFrequency] = useState<"monthly" | "annually">("monthly");

	return (
		<section id="pricing" className="bg-gray-50 py-24">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				{/* Header */}
				<div className="mx-auto max-w-4xl text-center">
					<h2 className="mt-2 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl lg:text-6xl">
						Choose the perfect{" "}
						<span className="relative inline-flex">
							<span className="absolute inset-0 h-full w-full bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] blur-lg opacity-30"></span>
							<span className="relative">plan</span>
						</span>
					</h2>
					<p className="mt-3 text-base text-gray-500">
						60 Days free trial · No credit card required
					</p>
				</div>

				{/* Billing Toggle */}
				<div className="mt-16 flex justify-center">
					<fieldset className="grid grid-cols-2 gap-x-1 rounded-full p-1 text-center text-xs font-semibold leading-5 ring-1 ring-inset ring-gray-400">
						<legend className="sr-only">Payment frequency</legend>
						{(["monthly", "annually"] as const).map((freq) => (
							<label
								key={freq}
								className={`cursor-pointer rounded-full px-2.5 py-1 transition-all duration-200 ${
									frequency === freq
										? "bg-gray-900 text-white"
										: "text-gray-600 hover:text-gray-900"
								}`}
							>
								<input
									type="radio"
									name="frequency"
									value={freq}
									className="sr-only"
									checked={frequency === freq}
									onChange={() => setFrequency(freq)}
								/>
								{freq === "monthly" ? "Monthly" : "Annually"}
							</label>
						))}
					</fieldset>
				</div>

				{/* Plans */}
				<div className="mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
					{plans.map((plan) => (
						<div
							key={plan.id}
							className={`rounded-3xl p-8 ring-1 xl:p-10 ${
								plan.mostPopular
									? "bg-gray-900 ring-gray-900"
									: "bg-white ring-gray-300"
							}`}
						>
							<div className="flex items-center justify-between gap-x-4">
								<h3
									className={`text-lg font-semibold leading-8 ${
										plan.mostPopular ? "text-white" : "text-gray-900"
									}`}
								>
									{plan.name}
								</h3>
								{plan.mostPopular && (
									<p className="rounded-full bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] px-2.5 py-1 text-xs font-semibold leading-5 text-white">
										Most popular
									</p>
								)}
							</div>
							<p
								className={`mt-4 text-sm leading-6 ${
									plan.mostPopular ? "text-gray-300" : "text-gray-600"
								}`}
							>
								{plan.description}
							</p>
							<p className="mt-6 flex items-baseline gap-x-1">
								<span
									className={`text-4xl font-bold tracking-tight ${
										plan.mostPopular ? "text-white" : "text-gray-900"
									}`}
								>
									${plan.price[frequency]}
								</span>
								<span
									className={`text-sm font-semibold leading-6 ${
										plan.mostPopular ? "text-gray-300" : "text-gray-600"
									}`}
								>
									{frequency === "monthly" ? "/month" : "/year"}
								</span>
							</p>
							<a
								href="#"
								className={`mt-6 block rounded-xl px-8 py-3 text-center text-lg font-bold leading-6 transition-all duration-200 focus-visible:outline focus-visible:outline-offset-2 ${
									plan.mostPopular
										? "bg-white text-gray-900 hover:bg-gray-100 focus-visible:outline-white"
										: "bg-gray-900 text-white hover:bg-gray-600 focus-visible:outline-gray-900"
								}`}
							>
								{plan.name === "Free" ? "Get started" : "Start free trial"}
							</a>
							<ul
								role="list"
								className={`mt-8 space-y-3 text-sm leading-6 ${
									plan.mostPopular ? "text-gray-300" : "text-gray-600"
								}`}
							>
								{plan.features.map((feature) => (
									<li key={feature} className="flex gap-x-3">
										<CheckIcon
											className={`h-6 w-5 flex-none ${
												plan.mostPopular ? "text-white" : "text-gray-900"
											}`}
											aria-hidden="true"
										/>
										{feature}
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default PricingSection;
