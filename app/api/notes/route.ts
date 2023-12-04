import { AuthOpts } from "@/app/shared/auth/AuthOptions";
import { noteSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/prismaClient";
import { getServerSession } from "next-auth";
import { z } from "zod";

type NoteRequest = z.infer<typeof noteSchema>;

export async function POST(request: Request) {
	const session = await getServerSession(AuthOpts);
	const requestData: NoteRequest = await request.json();
	const validationResult = noteSchema.safeParse(requestData);

	if(!session){
		return Response.json({}, {status: 401})
	}

	if (!validationResult.success) {
		return Response.json(validationResult.error.errors, { status: 400 });
	}

	const newNote = await prisma.note.create({
		data: {
			title: requestData.title,
			description: requestData.description,
		},
	});

	return Response.json(newNote, { status: 201 });
}

export async function GET(request: Request) {
	try {
		const notes = await prisma.note.findMany();
		return Response.json(notes, { status: 200 });
	} catch (error) {
		return Response.json("An error was occured", { status: 400 });
	}
}
