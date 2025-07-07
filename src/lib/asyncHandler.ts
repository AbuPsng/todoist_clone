import { apiError } from "./apiError";

export function asyncHandler<
	A extends any[],
	R extends Response | Promise<Response>
>(handler: (...args: A) => R) {
	return async (...args: A) => {
		try {
			return await handler(...args);
		} catch (error: unknown) {
			if (error instanceof Error) {
				return apiError(error.message, 500);
			} else {
				return apiError("Unknown error occurred", 500);
			}
		}
	};
}
