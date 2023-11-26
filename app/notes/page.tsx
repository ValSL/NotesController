import prisma from "@/prisma/prismaClient";
import { Table, TableTbody, TableTd, TableTh, TableThead, TableTr } from "@mantine/core";
import NotesActions from './notesActions';
import { CustomLink, NoteBadge } from "@/app/components";

const NotesPage = async () => {
	const notes = await prisma.note.findMany();

	const rows = notes.map((element) => (
		<TableTr key={element.id}>
			<TableTd>
				<CustomLink href={`notes/${element.id}`}>{element.title}</CustomLink>
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
