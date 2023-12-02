import { Button, Text } from "@mantine/core";
import Link from "next/link";

const NotesActions = () => {
	return (
		<div className="mb-5">
			<Button component={Link} href="/notes/new">
				New Note
			</Button>
		</div>
	);
};

export default NotesActions;
