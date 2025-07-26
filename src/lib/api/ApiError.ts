// ✅ Make sure it's named correctly
export default class ApiError extends Error {
	constructor(
		public message: string,
		public status: number,
		public errors: string[] = [],
		stack?: string
	) {
		super(message);
		this.status = status;
		this.errors = errors;

		if (stack) {
			this.stack = stack;
		} else {
			Error.captureStackTrace(this, this.constructor);
		}
	}
}
