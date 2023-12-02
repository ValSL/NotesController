'use client'

import { Button, Text } from "@mantine/core";
import { modals } from "@mantine/modals";

const DeleteNoteButton = () => {
    const test = () => {
        console.log("Confirmed")
    }
	const openDeleteModal = () =>
		modals.openConfirmModal({
			title: "Delete note",
			centered: true,
			children: (
				<Text size="sm">
					Are you sure you want to delete note?
				</Text>
			),
			labels: { confirm: "Delete note", cancel: "Cancel" },
			confirmProps: { color: "red" },
			onCancel: () => console.log("Cancel"),
			onConfirm: () => console.log("Confirmed"),
		});

	return (
		<Button onClick={openDeleteModal} color="red">
			Delete note
		</Button>
	);
};

export default DeleteNoteButton;
