import { prisma } from "@/lib/db";

export async function GET(
	req: Request,
	{ params }: { params: { verificationToken: string } }
) {
	const { verificationToken } = params;

	const user = await prisma.user.findUnique({
		where: { verificationToken },
	});

	// Use it
	return new Response(`User ID is ${verificationToken}`);
}
