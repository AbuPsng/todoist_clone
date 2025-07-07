export function apiError(
	message: string,
	status: number = 500,
	meta?: Record<string, any>
): Response {
	return new Response(
		JSON.stringify({
			success: false,
			message,
			...(meta && { meta }),
		}),
		{
			status,
		}
	);
}
