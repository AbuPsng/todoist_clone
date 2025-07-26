"use client";

import { AuthFormInputField } from "@/components/auth/AuthFormInputField";
import { AuthFormWrapper } from "@/components/auth/AuthFormWrapper";
import { axiosInstance } from "@/lib/client/axios.config";
import { userRegisterInputSchema } from "@/zod/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type FormData = z.infer<typeof userRegisterInputSchema>;

export default function RegisterForm() {
	const router = useRouter();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting, isValid },
	} = useForm<FormData>({
		resolver: zodResolver(userRegisterInputSchema),
		mode: "onChange",
	});

	const onSubmit = async (formData: FormData) => {
		try {
			const { data } = await axiosInstance.post("/register", formData);
			console.log(data);
			if (!data.success) {
				throw new Error(data.message || "Registration failed");
			}

			reset();
			toast.message("User has been created", {
				description: "Please check your email for to log in.",
			});
			router.push("/email_sent");
			return;
		} catch (error: any) {
			toast.error(error?.message || "Something went wrong.");
		}
	};

	return (
		<AuthFormWrapper
			pageName="REGISTER"
			onSubmit={handleSubmit(onSubmit)}
			isSubmitting={isSubmitting}
			isValid={isValid}
		>
			<AuthFormInputField
				id="name"
				type="text"
				placeholder="Name"
				register={register("name")}
				error={errors.name}
			/>
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
			<AuthFormInputField
				id="confirmPassword"
				type="password"
				placeholder="Confirm Password"
				register={register("confirmPassword")}
				error={errors.confirmPassword}
			/>
		</AuthFormWrapper>
	);
}
