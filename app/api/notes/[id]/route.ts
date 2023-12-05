import { AuthOpts } from "@/app/shared/auth/AuthOptions";
import { noteSchema, patchNoteSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/prismaClient";
import { getServerSession } from "next-auth";

interface NoteProps {
	params: {
		id: string;
	};
}

export async function PATCH(request: Request, { params }: NoteProps) {
	const session = await getServerSession(AuthOpts);
	const body = await request.json();
	const existingNote = await prisma.note.findUnique({
		where: {
			id: parseInt(params.id),
		},
	});

	if(!session){
		return Response.json({}, {status: 404})
	}

	if (!existingNote) {
		return Response.json("Invalid note", { status: 404 });
	}

	const validationResult = patchNoteSchema.safeParse(body);
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
			tagUserId: body.tagUserId
		},
	});

	return Response.json(updatedNote);
}

export async function DELETE(request: Request, { params }: NoteProps) {
	const session = await getServerSession(AuthOpts);
	const note = await prisma.note.findUnique({ where: { id: parseInt(params.id) } });

	if(!session){
		return Response.json({}, {status: 401})
	}

	if (!note) {
		return Response.json({ data: "Invalid note" }, { status: 404 });
	}

	await prisma.note.delete({
		where: {
			id: parseInt(params.id),
		},
	});

	return Response.json({});
}


