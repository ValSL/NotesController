import prisma from "@/prisma/prismaClient";
import { Box, Button, SimpleGrid } from "@mantine/core";
import { Note } from "@prisma/client";
import { Pencil2Icon } from "@radix-ui/react-icons";
import Link from "next/link";
import { notFound } from "next/navigation";
import NoteDetails from "../components/NoteDetails";

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
				<NoteDetails note={note} />
			</Box>
			<Box>
				<Button leftSection={<Pencil2Icon />} component={Link} href={`/notes/${params.id}/edit`}>
					Edit note
				</Button>
			</Box>
		</SimpleGrid>
	);
};

export default NoteDetailPage;
