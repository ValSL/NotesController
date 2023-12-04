"use client";

import { Button, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { notifications } from "@mantine/notifications";

const DeleteNoteButton = ({ id }: { id: string }) => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState<boolean>();

	const deleteNote = async () => {
		try {
			setIsLoading(true);
			await axios.delete(`/api/notes/${id}`).finally(() => setIsLoading(false));
			router.push("/notes/list");
			router.refresh();

			notifications.show({
				title: "Success!",
				message: "Note has been deleted!",
				autoClose: 5000,
				color: "green",
			});
		} catch (error) {
			setIsLoading(false)
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
		<Button onClick={openDeleteModal} loading={isLoading} color="red">
			Delete note
		</Button>
	);
};

export default DeleteNoteButton;
