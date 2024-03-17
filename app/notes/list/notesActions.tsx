import { Button, Flex } from "@mantine/core";
import Link from "next/link";
import StatusFilter from "./statusFilter";
const NotesActions = () => {
	return (
		<Flex className="mb-5" justify='space-between'>
			<StatusFilter/>
			<Button component={Link} href="/notes/new">
				New Note
			</Button>
		</Flex>
	);
};

export default NotesActions;
