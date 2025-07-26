"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { cn } from "@/lib/api/utils";
import { LuLoaderCircle } from "react-icons/lu";

type FormWrapperProps = {
	pageName: "LOGIN" | "REGISTER";
	onSubmit: () => void;
	children: React.ReactNode;
	className?: string;
	isSubmitting: boolean;
	isValid: boolean;
};

export const AuthFormWrapper = ({
	pageName,
	onSubmit,
	children,
	className = "space-y-4",
	isSubmitting,
	isValid,
}: FormWrapperProps) => {
	return (
		<div className="border-1 p-4 py-7 rounded-xl shadow-2xl">
			<h1 className="mt-5 text-lg font-bold leading-tight  text-gray-800 sm:text-5xl lg:text-4xl mb-3">
				<span className="relative inline-flex w-full">
					<span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] blur-lg opacity-30"></span>
					<span className="relative text-center w-full">
						{pageName === "REGISTER" ? "Sign Up" : "Log In "}
					</span>
				</span>
			</h1>

			<form
				onSubmit={onSubmit}
				className={cn("flex flex-col gap-y-3 mt-10", className)}
			>
				{children}

				<Button
					type="submit"
					className="w-full mt-7 cursor-pointer"
					disabled={isSubmitting || !isValid}
				>
					{" "}
					{isSubmitting ? (
						<LuLoaderCircle className="w-4 aspect-square animate-spin" />
					) : pageName === "REGISTER" ? (
						"Sign Up"
					) : (
						"Log In"
					)}
				</Button>
			</form>
			<p className="mt-8 text-center">
				{pageName === "REGISTER"
					? "Already have an account?"
					: "Don't have an account?"}{" "}
				<Link
					href={pageName === "REGISTER" ? "/login" : "/register"}
					className="text-red-400 underline hover:text-red-500"
				>
					{pageName === "REGISTER" ? "Log In" : "Sign Up"}
				</Link>
			</p>
		</div>
	);
};
