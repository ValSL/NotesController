import { noteSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/prismaClient";

interface UpdateNoteProps {
	params: {
		id: string;
	};
}

export async function PATCH(request: Request, { params }: UpdateNoteProps) {
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
            description: body.description
        }
	});

    return Response.json(updatedNote)
}
