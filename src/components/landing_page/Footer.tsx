import { CheckIcon } from "@heroicons/react/20/solid";
// components/Footer.tsx
import Link from "next/link";

type NavItem = { name: string; href: string };
type SocialItem = {
	name: string;
	href: string;
	icon: (props: React.ComponentProps<"svg">) => React.ReactNode;
};

const navigation = {
	product: [
		{ name: "Features", href: "#features" },
		{ name: "Pricing", href: "#pricing" },
		{ name: "API", href: "#" },
		{ name: "Integrations", href: "#" },
	] as NavItem[],
	company: [
		{ name: "About", href: "#" },
		{ name: "Blog", href: "#" },
		{ name: "Careers", href: "#" },
		{ name: "Press", href: "#" },
	] as NavItem[],
	resources: [
		{ name: "Documentation", href: "#" },
		{ name: "Help Center", href: "#" },
		{ name: "Contact", href: "#" },
		{ name: "Status", href: "#" },
	] as NavItem[],
	legal: [
		{ name: "Privacy", href: "#" },
		{ name: "Terms", href: "#" },
		{ name: "License", href: "#" },
	] as NavItem[],
	social: [
		{
			name: "X",
			href: "#",
			icon: (props: React.ComponentProps<"svg">) => (
				<svg fill="currentColor" viewBox="0 0 24 24" {...props}>
					<path d="M13.682 10.622 20.239 3h-1.554l-5.693 6.618L8.445 3H3.2l6.877 10.007L3.2 21h1.554l6.012-6.988L15.569 21h5.245l-7.131-10.378ZM11.554 13.096 10.857 12.1 5.314 4.17h2.387l4.474 6.399.697.996 5.815 8.318h-2.387l-5.244-7.788Z" />
				</svg>
			),
		},
		{
			name: "GitHub",
			href: "#",
			icon: (props: React.ComponentProps<"svg">) => (
				<svg fill="currentColor" viewBox="0 0 24 24" {...props}>
					<path
						fillRule="evenodd"
						d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
						clipRule="evenodd"
					/>
				</svg>
			),
		},
		{
			name: "LinkedIn",
			href: "#",
			icon: (props: React.ComponentProps<"svg">) => (
				<svg fill="currentColor" viewBox="0 0 24 24" {...props}>
					<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433C4.193 7.433 3.274 6.507 3.274 5.368c0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
				</svg>
			),
		},
	] as SocialItem[],
};

const Footer: React.FC = () => (
	<footer className="bg-gray-900" aria-labelledby="footer-heading">
		<h2 id="footer-heading" className="sr-only">
			Footer
		</h2>
		<div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
			<div className="xl:grid xl:grid-cols-3 xl:gap-8">
				{/* Brand */}
				<div className="space-y-8">
					<Link href="/" className="flex items-center space-x-2">
						<div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E]">
							<CheckIcon className="h-5 w-5 text-white" />
						</div>
						<span className="text-xl font-bold text-white">TodoApp</span>
					</Link>
					<p className="text-sm leading-6 text-gray-300">
						The most intuitive todo app to help you stay organized and boost
						productivity. Trusted by over 100,000+ users worldwide.
					</p>
					<div className="flex space-x-6">
						{navigation.social.map((item) => (
							<a
								key={item.name}
								href={item.href}
								className="text-gray-400 transition-all duration-200 hover:text-gray-300"
							>
								<span className="sr-only">{item.name}</span>
								<item.icon className="h-6 w-6" aria-hidden="true" />
							</a>
						))}
					</div>
				</div>

				{/* Nav links */}
				<div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
					{(["product", "company", "resources", "legal"] as const).map((section) => (
						<div key={section} className="md:grid md:grid-cols-2 md:gap-8">
							<div>
								<h3 className="text-sm font-semibold leading-6 text-white capitalize">
									{section}
								</h3>
								<ul role="list" className="mt-6 space-y-4">
									{navigation[section].map((item: NavItem) => (
										<li key={item.name}>
											<a
												href={item.href}
												className="text-sm leading-6 text-gray-300 transition-all duration-200 hover:text-white"
											>
												{item.name}
											</a>
										</li>
									))}
								</ul>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Newsletter */}
			<div className="mt-16 border-t border-gray-700 pt-8 sm:mt-20 md:flex md:items-center md:justify-between lg:mt-24">
				<div>
					<h3 className="text-sm font-semibold leading-6 text-white">
						Subscribe to our newsletter
					</h3>
					<p className="mt-2 text-sm leading-6 text-gray-300">
						Get productivity tips and feature updates delivered to your inbox.
					</p>
				</div>
				<form className="mt-6 sm:flex sm:max-w-md md:mt-0">
					<label htmlFor="email-address" className="sr-only">
						Email address
					</label>
					<input
						type="email"
						id="email-address"
						required
						className="w-full rounded-xl border-2 border-gray-400 bg-white px-3 py-2 text-base text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 sm:w-64 sm:text-sm sm:leading-6 xl:w-full"
						placeholder="Enter your email"
					/>
					<div className="mt-4 sm:ml-4 sm:mt-0 sm:flex-shrink-0">
						<button
							type="submit"
							className="flex w-full items-center justify-center rounded-xl bg-gray-900 px-8 py-3 text-base font-bold text-white shadow-lg transition-all duration-200 hover:bg-gray-600 focus-visible:outline  focus-visible:outline-offset-2 focus-visible:outline-gray-900"
						>
							Subscribe
						</button>
					</div>
				</form>
			</div>

			{/* Copyright */}
			<div className="mt-8 border-t border-gray-700 pt-8 md:flex md:items-center md:justify-between">
				<p className="text-xs leading-5 text-gray-400">
					&copy; 2025 TodoApp Inc. All rights reserved.
				</p>
				<p className="mt-4 text-xs leading-5 text-gray-400 md:mt-0">
					Made with ❤️ for productive people everywhere
				</p>
			</div>
		</div>
	</footer>
);

export default Footer;
