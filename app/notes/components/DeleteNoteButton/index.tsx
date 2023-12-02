"use client";

import { Button, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import axios from "axios";
import { useRouter } from "next/navigation";

const DeleteNoteButton = ({ id }: { id: string }) => {
	const router = useRouter();

	const openDeleteModal = () =>
		modals.openConfirmModal({
			title: "Delete note",
			centered: true,
			children: <Text size="sm">Are you sure you want to delete note?</Text>,
			labels: { confirm: "Delete note", cancel: "Cancel" },
			confirmProps: { color: "red" },
			onCancel: () => {},
			onConfirm: async () => {
				await axios.delete(`/api/notes/${id}`);
				router.push("/notes");
				router.refresh();
			},
		});

	return (
		<Button onClick={openDeleteModal} color="red">
			Delete note
		</Button>
	);
};

export default DeleteNoteButton;
