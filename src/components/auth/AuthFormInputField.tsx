"use client";

import { Input } from "@/components/ui/input";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

type FormFieldProps = {
	id: string;
	type?: string;
	placeholder?: string;
	register: UseFormRegisterReturn;
	error?: FieldError;
};

export const AuthFormInputField = ({
	id,
	type = "text",
	placeholder,
	register,
	error,
}: FormFieldProps) => {
	return (
		<div>
			<Input
				id={id}
				type={type}
				placeholder={placeholder}
				{...register}
				className="py-5"
			/>
			{error && <p className="text-sm text-red-500 mt-1">{error.message}</p>}
		</div>
	);
};
