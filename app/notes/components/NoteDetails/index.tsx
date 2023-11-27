import { NoteBadge } from "@/app/components";
import { Title, Flex, Paper } from "@mantine/core";
import { Note } from "@prisma/client";
import React from "react";
import Markdown from "react-markdown";

interface NoteDetailsProps {
	note: Note;
}

const NoteDetails = ({ note }: NoteDetailsProps) => {
	return (
		<>
			<Title>{note.title}</Title>
			<Flex gap={7} my={10}>
				<NoteBadge status={note.status} />
				<p>{note.createdAt.toDateString()}</p>
			</Flex>
			<Paper withBorder p={10} className="prose" mt="xl">
				<Markdown>{note.description}</Markdown>
			</Paper>
		</>
	);
};

export default NoteDetails;
