import { Button, Table, TableTbody, TableTd, TableTh, TableThead, TableTr, Text } from "@mantine/core";
import prisma from "@/prisma/prismaClient";
import Link from "next/link";
import classes from "./table.module.css"
import NoteBadge from "../components/NoteBadge/NoteBadge";
import NotesActions from './notesActions';
import delay from "delay";

const NotesPage = async () => {
	const notes = await prisma.note.findMany();
	await delay(1000);

	const rows = notes.map((element) => (
		<TableTr key={element.id}>
			<TableTd>
				<Link href={`notes/${element.id}`}>{element.title}</Link>
				<div className="block md:hidden"><NoteBadge status={element.status}/></div>
			</TableTd>
			<TableTd className="hidden md:table-cell"><NoteBadge status={element.status}/></TableTd>
			<TableTd className="hidden md:table-cell">{element.description}</TableTd>
		</TableTr>
	));

	return (
		<div>
			<NotesActions/>
			<Table>
				<TableThead>
					<TableTr>
						<TableTh>Title</TableTh>
						<TableTh className="hidden md:table-cell">Status</TableTh>
						<TableTh className="hidden md:table-cell">Description</TableTh>
					</TableTr>
				</TableThead>
				<TableTbody>{rows}</TableTbody>
			</Table>
		</div>
	);
};

export default NotesPage;
