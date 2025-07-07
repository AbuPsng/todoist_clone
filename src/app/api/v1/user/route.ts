import { prisma } from "@/lib/db";

export async function POST() {
	const user = await prisma.user.create({
		data: {
			email: "hero@gmail.com",
			name: "Hero",
		},
	});

	return new Response(
		JSON.stringify({
			message: "User created successfully",
			data: { user },
		}),
		{
			status: 200,
			headers: {
				"Content-Type": "application/json",
			},
		}
	);
}
