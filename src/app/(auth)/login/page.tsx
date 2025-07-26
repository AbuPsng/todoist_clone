"use client";

import { AuthFormInputField } from "@/components/auth/AuthFormInputField";
import { AuthFormWrapper } from "@/components/auth/AuthFormWrapper";
import { axiosInstance } from "@/lib/client/axios.config";
import { useUserStore } from "@/stores/useUserStore";
import { userLoginInputSchema } from "@/zod/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type FormData = z.infer<typeof userLoginInputSchema>;

export default function LoginForm() {
	const router = useRouter();
	const { setUser, user } = useUserStore();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting, isValid },
	} = useForm<FormData>({
		resolver: zodResolver(userLoginInputSchema),
		mode: "onChange",
	});

	const onSubmit = async (formData: FormData) => {
		try {
			const { data } = await axiosInstance.post("/login", formData);

			if (!data.success || !data.data.user) {
				throw new Error(data.message || "Login failed");
			}

			setUser(data.data.user);

			reset();
			toast.success("Login successful");
			router.push("/");
			return;
		} catch (error: any) {
			toast.error(error?.message || "Something went wrong .");
		}
	};

	return (
		<AuthFormWrapper
			pageName="LOGIN"
			onSubmit={handleSubmit(onSubmit)}
			isSubmitting={isSubmitting}
			isValid={isValid}
		>
			<AuthFormInputField
				id="email"
				type="email"
				placeholder="Email"
				register={register("email")}
				error={errors.email}
			/>

			<AuthFormInputField
				id="password"
				type="password"
				placeholder="Password"
				register={register("password")}
				error={errors.password}
			/>
		</AuthFormWrapper>
	);
}
