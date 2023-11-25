import { Button, Table, TableThead, TableTr, TableTh, TableTbody, TableTd, Skeleton } from "@mantine/core";
import Link from "next/link";
import React from "react";
import NotesActions from "./notesActions";

const NotesLoading = () => {

    const rows = [1, 2, 3, 4].map((element) => (
		<TableTr key={element}>
			<TableTd>
                <Skeleton height={22}/>
				<div className="block md:hidden"><Skeleton height={22}/></div>
			</TableTd>
			<TableTd className="hidden md:table-cell"><Skeleton height={22}/></TableTd>
			<TableTd className="hidden md:table-cell"><Skeleton height={22}/></TableTd>
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

export default NotesLoading;
