import prisma from "@/prisma/prismaClient";

export async function GET(request: Request) {
	const users = await prisma.user.findMany({ orderBy: [{ name: "asc" }] });
	if (!users) {
		return Response.json({}, { status: 404 });
	}
	return Response.json(users, { status: 200 });
}
