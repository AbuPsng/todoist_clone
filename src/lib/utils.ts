import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { randomBytes } from "crypto";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const generateToken = (length: number = 6): string => {
	return randomBytes(length).toString("hex");
};

export const addHours = (date: Date = new Date(), hourToAdd: number): Date => {
	const newDate = new Date(date);
	newDate.setHours(newDate.getHours() + hourToAdd);
	return newDate;
};
