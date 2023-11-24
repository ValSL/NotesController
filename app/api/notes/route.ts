import { createNoteSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/prismaClient";
import { z } from "zod";

type NoteRequest = z.infer<typeof createNoteSchema>

export async function POST(request: Request) {
	const requestData: NoteRequest = await request.json();
	const validationResult = createNoteSchema.safeParse(requestData);

	if (!validationResult.success) {
		return Response.json(validationResult.error.errors, { status: 400 });
	}

	const newNote = await prisma.note.create({
		data: {
			title: requestData.title,
			description: requestData.description,
		},
	});

	return Response.json(newNote, {status: 201});
}
