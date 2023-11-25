import { Button } from "@mantine/core";
import Link from "next/link";
import React from "react";

const NotesActions = () => {
	return (
		<div className="mb-5">
			<Button>
				<Link href="/notes/new">New Note</Link>
			</Button>
		</div>
	);
};

export default NotesActions;
