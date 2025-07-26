"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/button";

const Navbar = () => {
	const [expanded, setExpanded] = useState(false);
	return (
		<header className="py-2 md:py-6 ">
			<div className="container px-4 mx-auto sm:px-6 lg:px-8">
				<div className="flex items-center justify-between">
					{/* Logo */}
					<Link
						href="/"
						title="Home"
						className="flex rounded focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
					>
						<img
							src="/logo.png"
							alt="Logo"
							className="w-12 aspect-square rounded-full"
						/>
					</Link>

					{/* Mobile hamburger */}
					<Button
						onClick={() => setExpanded(!expanded)}
						aria-expanded={expanded}
						aria-label="Toggle navigation"
						className="lg:hidden"
					>
						{expanded ? (
							<svg
								className="w-7 h-7"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						) : (
							<svg
								className="w-7 h-7"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={1.5}
									d="M4 6h16M4 12h16M4 18h16"
								/>
							</svg>
						)}
					</Button>

					{/* Desktop links */}
					<nav className="hidden lg:flex lg:items-center lg:justify-center lg:space-x-10 xl:space-x-16">
						{[
							{ title: "Features", id: "features" },
							{ title: "Pricing", id: "pricing" },
						].map((text) => (
							<Link
								key={text.title}
								href={`#${text.id}`}
								className="text-base font-medium text-gray-900 transition-all duration-200 rounded-xl hover:underline "
							>
								{text.title}
							</Link>
						))}
					</nav>

					{/* Desktop CTA */}
					<div className="hidden lg:flex">
						<Link href={"/login"}>
							<Button variant={"primary"}>Log In</Button>
						</Link>
					</div>
				</div>

				{/* Mobile menu */}
				{expanded && (
					<div className="px-1 py-8 lg:hidden" onClick={() => setExpanded(false)}>
						<div className="grid gap-y-7">
							{["Features", "Pricing", "Automation", "Customer Login"].map((text) => (
								<Link
									key={text}
									href="#"
									className="flex items-center p-3 -m-3 text-base  font-medium text-gray-900 transition-all duration-200 rounded-xl"
								>
									{text}
								</Link>
							))}

							<Link
								href="/login"
								className="inline-flex items-center justify-center px-6 py-3 text-base font-bold leading-7 text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-xl hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
							>
								Log In
							</Link>
						</div>
					</div>
				)}
			</div>
		</header>
	);
};

export default Navbar;
