// import { Button } from "@radix-ui/themes";
import { Button } from "@mantine/core";
import React from "react";
import  Link from 'next/link';

const NotesPage = () => {
	return (
		<div>
			<Button><Link href="notes/new">New Note</Link></Button>
		</div>
	);
};

export default NotesPage;
