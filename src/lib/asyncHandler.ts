export function asyncHandler<
	A extends any[],
	R extends Response | Promise<Response>,
>(handler: (...args: A) => R) {
	return async (...args: A) => {
		try {
			return await handler(...args);
		} catch (error: any) {
			return new Response(
				JSON.stringify({ success: false, message: error.message }),
				{ status: error.statusCode }
			);
		}
	};
}
