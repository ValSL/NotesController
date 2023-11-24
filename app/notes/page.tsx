import { Button, Table, TableTbody, TableTd, TableTh, TableThead, TableTr, Text } from "@mantine/core";
import prisma from "@/prisma/prismaClient";
import Link from "next/link";
import classes from "./table.module.css"
import NoteBadge from "../components/NoteBadge/NoteBadge";

const NotesPage = async () => {
	const notes = await prisma.note.findMany();

	const rows = notes.map((element) => (
		<TableTr key={element.id}>
			<TableTd>
				{element.title}
				<div className="block md:hidden"><NoteBadge status={element.status}/></div>
			</TableTd>
			<TableTd className="hidden md:table-cell"><NoteBadge status={element.status}/></TableTd>
			<TableTd className="hidden md:table-cell">{element.description}</TableTd>
		</TableTr>
	));

	return (
		<div>
			<div className="mb-5">
				<Button>
					<Link href="/notes/new">New Note</Link>
				</Button>
			</div>
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
