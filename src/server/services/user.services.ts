import { UserRegistrationInputType } from "@/types/services/user.services.types";
import { prisma } from "@/lib/db/db";

export const createUser = async (userData: UserRegistrationInputType) => {
	// Logic to create a user in the database

	const newUser = await prisma.user.create({
		data: { ...userData },
	});

	return newUser;
};

export const findUserByEmail = async (email: string) => {
	// Logic to find a user by email in the database

	const user = await prisma.user.findUnique({
		where: { email },
	});

	return user;
};

export const findUserById = async (id: string) => {
	// Logic to find a user by ID in the database

	const user = await prisma.user.findUnique({
		where: { id },
	});

	return user;
};

export const updateUser = async (
	id: string,
	userData: Partial<UserRegistrationInputType>
) => {
	// Logic to update a user in the database

	const updatedUser = await prisma.user.update({
		where: { id },
		data: { ...userData },
	});

	return updatedUser;
};
