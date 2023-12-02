"use client";

import { Button, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { notifications } from "@mantine/notifications";

const DeleteNoteButton = ({ id }: { id: string }) => {
	const router = useRouter();
	const [successNotify, setSuccessNotify] = useState(false);

	const deleteNote = async () => {
		try {
			const result = await axios.delete(`/api/notes/${id}`);
			console.log(result);
			router.push("/notes");
			router.refresh();

			notifications.show({
				title: "Success!",
				message: "Note has been deleted!",
				autoClose: 5000,
				color: "green",
			});
		} catch (error) {
			notifications.show({
				title: "Error",
				message: "Failed to delete note",
				autoClose: 5000,
				color: "red",
			});
		}
	};

	const openDeleteModal = () =>
		modals.openConfirmModal({
			title: "Delete note",
			centered: true,
			children: <Text size="sm">Are you sure you want to delete note?</Text>,
			labels: { confirm: "Delete note", cancel: "Cancel" },
			confirmProps: { color: "red" },
			onCancel: () => {},
			onConfirm: () => {
				deleteNote();
			},
		});

	return (
		<Button onClick={openDeleteModal} color="red">
			Delete note
		</Button>
	);
};

export default DeleteNoteButton;
