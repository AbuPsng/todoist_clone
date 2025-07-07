export function apiResponse(
	message: string,
	status: number = 200,
	meta?: Record<string, any>
): Response {
	const isSuccess = status >= 200 && status < 300;

	return new Response(
		JSON.stringify({
			success: isSuccess,
			message,
			...(meta && { meta }),
		}),
		{
			status,
		}
	);
}
