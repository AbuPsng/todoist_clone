import z, { SafeParseReturnType, ZodTypeAny } from "zod";

import ApiError from "./ApiError";

export const zodValidateAndParesData = <T extends ZodTypeAny>(
	zodSchema: T,
	dataToBeParsed: unknown
): z.infer<T> => {
	const parsed = zodSchema.safeParse(dataToBeParsed);
	if (!parsed.success) {
		const errorMessage = parsed.error.errors[0].message;
		throw new ApiError(errorMessage || "Error while parsing data", 400);
	}
	return parsed;
};
