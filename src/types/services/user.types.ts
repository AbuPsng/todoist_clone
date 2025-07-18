// types/user.ts
import {
	userLoginInputSchema,
	userRegisterInputSchema,
} from "@/zod/user.schema";
import z from "zod";

export type UserRegistrationInputType = Omit<
	z.infer<typeof userRegisterInputSchema>,
	"confirmPassword"
>;
export type UserLoginInputType = z.infer<typeof userLoginInputSchema>;
