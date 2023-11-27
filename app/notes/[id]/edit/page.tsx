import React from "react";
import NoteForm from "../../components/NoteForm";
import prisma from "@/prisma/prismaClient";
import { notFound } from "next/navigation";

const NoteEditPage = async ({ params }: { params: { id: string } }) => {
	const note = await prisma.note.findUnique({
		where: {
			id: parseInt(params.id),
		},
	});

    if(!note){
        notFound();
    }

	return <NoteForm note={note}/>;
};

export default NoteEditPage;
