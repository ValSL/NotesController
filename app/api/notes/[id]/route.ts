import { noteSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/prismaClient";

interface NoteProps {
	params: {
		id: string;
	};
}

export async function PATCH(request: Request, { params }: NoteProps) {
	const body = await request.json();
	const existingNote = await prisma.note.findUnique({
		where: {
			id: parseInt(params.id),
		},
	});
	if (!existingNote) {
		return Response.json("Invalid note", { status: 404 });
	}

	const validationResult = noteSchema.safeParse(body);
	if (!validationResult.success) {
		return Response.json(validationResult.error.format(), { status: 400 });
	}

	const updatedNote = await prisma.note.update({
		where: {
			id: existingNote.id,
		},
		data: {
			title: body.title,
			description: body.description,
		},
	});

	return Response.json(updatedNote);
}

export async function DELETE(request: Request, { params }: NoteProps) {
	const note = await prisma.note.findUnique({ where: { id: parseInt(params.id) } });

	if (!note) {
		return Response.json({ data: 'Invalid note' }, { status: 404 });
	}

	await prisma.note.delete({
		where: {
			id: parseInt(params.id),
		},
	});

	return Response.json({});
}
