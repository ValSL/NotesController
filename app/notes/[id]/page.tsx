import prisma from "@/prisma/prismaClient";
import React from "react";
import { notFound } from "next/navigation";
import { Note } from "@prisma/client";
import { Flex, Paper, Title, Box, Button, SimpleGrid } from "@mantine/core";
import NoteBadge from "@/app/components/NoteBadge";
import Markdown from "react-markdown";
import Link from "next/link";
import { Pencil2Icon } from "@radix-ui/react-icons";

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
		<SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
			<Box>
				<Title>{note.title}</Title>
				<Flex gap={7} my={10}>
					<NoteBadge status={note.status} />
					<p>{note.createdAt.toDateString()}</p>
				</Flex>
				<Paper withBorder p={10} className="prose" mt="xl">
					<Markdown>{note.description}</Markdown>
				</Paper>
			</Box>
			<Box>
				<Button leftSection={<Pencil2Icon/>} component={Link} href={`/notes/${params.id}/edit`}>
					Edit note
				</Button>
			</Box>
		</SimpleGrid>
	);
};

export default NoteDetailPage;
