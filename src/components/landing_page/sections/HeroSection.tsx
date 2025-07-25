"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

const HeroSection = () => {
	return (
		<section className="pt-12 bg-gray-50 sm:pt-16">
			<div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
				{/* Headings */}
				<div className="max-w-2xl mx-auto text-center">
					<h1 className="mt-5 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl lg:text-6xl mb-3">
						<span className="relative inline-flex">
							<span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] blur-lg opacity-30"></span>
							<span className="relative"> Work, without the chaos </span>
						</span>
					</h1>
					<p className="px-6 text-lg text-gray-600">
						{" "}
						Keep your team in sync without adding another complicated tool to your
						stack.
					</p>

					{/* CTA buttons */}
					<div className="mt-12 flex flex-col items-stretch px-8  space-y-4 sm:flex-row sm:space-y-0 sm:space-x-5 sm:px-0 sm:items-center sm:justify-center">
						<Button variant={"primary"}>Start free trial</Button>

						<Link href="#">
							<Button variant={"secondary"}>
								<svg
									className="w-5 h-5 mr-2"
									viewBox="0 0 18 18"
									fill="none"
									stroke="currentColor"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M8.18 13.426c-1.321 0.966-3.18 0.023-3.18-1.614V5.439C5 3.802 6.858 2.858 8.18 3.824l4.36 3.186c1.093 0.799 1.093 2.43 0 3.229l-4.36 3.187z"
										strokeWidth={2}
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
								Watch free demo
							</Button>
						</Link>
					</div>

					<p className="mt-8 text-base text-gray-500">
						60 Days free trial · No credit card required
					</p>
				</div>
			</div>

			{/* Illustration */}
			<div className="pb-12 bg-white">
				<div className="relative">
					<div className="absolute inset-0 h-2/3 bg-gray-50" />
					<div className="relative mx-auto lg:max-w-6xl">
						<img
							className="transform scale-110"
							src="https://cdn.rareblocks.xyz/collection/clarity/images/hero/2/illustration.png"
							alt="Product illustration"
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default HeroSection;
