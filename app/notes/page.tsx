import prisma from "@/prisma/prismaClient";
import { Table, TableTbody, TableTd, TableTh, TableThead, TableTr } from "@mantine/core";
import NotesActions from './notesActions';
import { CustomLink, NoteBadge } from "@/app/components";
import classes from "./list.module.css";

export const dynamic = 'force-dynamic';

const NotesPage = async () => {
	const notes = await prisma.note.findMany();

	const rows = notes.map((element) => (
		<TableTr key={element.id}>
			<TableTd>
				<CustomLink href={`notes/${element.id}`}>{element.title}</CustomLink>
				<div className={classes.smallStatus}><NoteBadge status={element.status}/></div>
			</TableTd>
			<TableTd className={classes.notesList}><NoteBadge status={element.status}/></TableTd>
			<TableTd className={classes.notesList}>{element.description}</TableTd>
		</TableTr>
	));

	return (
		<div>
			<NotesActions/>
			<Table verticalSpacing='md'>
				<TableThead>
					<TableTr>
						<TableTh>Title</TableTh>
						<TableTh className={classes.notesList}>Status</TableTh>
						<TableTh className={classes.notesList}>Description</TableTh>
					</TableTr>
				</TableThead>
				<TableTbody>{rows}</TableTbody>
			</Table>
		</div>
	);
};

export default NotesPage;
