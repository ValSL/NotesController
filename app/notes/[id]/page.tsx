import prisma from "@/prisma/prismaClient";
import React from "react";
import { notFound } from "next/navigation";
import { Note } from "@prisma/client";
import { Flex, Paper, Title } from "@mantine/core";
import NoteBadge from "@/app/components/NoteBadge/NoteBadge";
import Markdown from "react-markdown";

interface NoteDetailProps {
	params: {
		id: string;
	};
}

const NoteDetailPage = async ({ params }: NoteDetailProps) => {
	const note: Note | null = await prisma.note.findUnique({
		where: {
			id: parseInt(params.id),
		},
	});

	if (!note) {
		notFound();
	}

	return (
		<div>
			<Title>{note.title}</Title>
			<Flex gap={7} my={10}>
				<NoteBadge status={note.status} />
				<p>{note.createdAt.toDateString()}</p>
			</Flex>
			<Paper withBorder p={10} className="prose" mt="xl">
				<Markdown>{note.description}</Markdown>
			</Paper>
		</div>
	);
};

export default NoteDetailPage;
