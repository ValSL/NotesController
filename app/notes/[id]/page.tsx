import prisma from "@/prisma/prismaClient";
import { Box, Button, Flex, SimpleGrid } from "@mantine/core";
import { Note } from "@prisma/client";
import { Pencil2Icon } from "@radix-ui/react-icons";
import Link from "next/link";
import { notFound } from "next/navigation";
import NoteDetails from "../components/NoteDetails";
import classes from "./edit.module.css";
import DeleteNoteButton from "../components/DeleteNoteButton";

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
		<SimpleGrid cols={{ base: 1, md: 5 }} spacing="md">
			<Box className={classes.mainContent}>
				<NoteDetails note={note} />
			</Box>
			<Flex direction='column' gap="1rem">
				<Button leftSection={<Pencil2Icon />} component={Link} href={`/notes/${params.id}/edit`}>
					Edit note
				</Button>
				<DeleteNoteButton/>
			</Flex>
		</SimpleGrid>
	);
};

export default NoteDetailPage;
