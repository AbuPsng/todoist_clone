import bcrypt from "bcryptjs";

export const generateHashPassword = async (
	password: string
): Promise<string> => {
	return bcrypt.hash(password, 10);
};

export const comparePassword = async (
	password: string,
	hashedPassword: string
): Promise<boolean> => {
	const bcrypt = await import("bcryptjs");
	return bcrypt.compare(password, hashedPassword);
};
