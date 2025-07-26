// app/verify/[token]/page.tsx
"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { axiosInstance } from "@/lib/client/axios.config";
import { LuLoaderCircle } from "react-icons/lu";

export default function VerifyPage() {
	const router = useRouter();
	const { verificationToken } = useParams();

	useEffect(() => {
		const verifyEmail = async () => {
			try {
				const { data } = await axiosInstance.get(`/verify/${verificationToken}`);

				if (data.success) {
					toast.success("Email verified successfully!");
					router.push("/login");
				} else {
					toast.error(data.message || "Verification failed");
				}
			} catch (err) {
				toast.error("Verification error. Try again.");
			}
		};

		verifyEmail();
	}, [verificationToken, router]);

	return (
		<div className="flex items-center justify-center min-h-screen">
			<LuLoaderCircle className="w-12 aspect-square animate-spin" />
			<p className="text-lg">Verifying your email...</p>
		</div>
	);
}
