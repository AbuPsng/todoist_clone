"use client";

import Link from "next/link";

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-100 px-4 relative">
			{/* Logo */}
			<div className="absolute top-5 left-[30%]">
				<Link href="/" title="Home" className="mb-8 ">
					<img src={"/logo.png"} alt="Logo" className="h-12 w-12 rounded-full" />
				</Link>
			</div>

			{/* Form Section */}
			<div className="w-full max-w-md">{children}</div>
		</section>
	);
}
