import React from "react";
import prisma from "@/prisma/prismaClient";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import NoteFormSkeleton from '@/app/notes/components/NoteFormSkeleton';

const NoteForm = dynamic(() => import("@/app/notes/components/NoteForm"), {
	ssr: false,
	loading: () => <NoteFormSkeleton />
})

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
