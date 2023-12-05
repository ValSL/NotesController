"use client";

import {
	Combobox,
	ComboboxDropdown,
	ComboboxOption,
	ComboboxOptions,
	ComboboxTarget,
	Group,
	InputBase,
	InputPlaceholder,
	Skeleton,
	Text,
	useCombobox,
} from "@mantine/core";
import { Note, User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useQuery } from "react-query";

function SelectOption({ name }: {name?: string | null}) {
	return (
		<Text fz="sm" fw={500}>
			{name}
		</Text>
	);
}

const TagSelect = ({ note }: { note: Note }) => {
	const combobox = useCombobox({
		onDropdownClose: () => combobox.resetSelectedOption(),
	});
	const router = useRouter();

	const [value, setValue] = useState<string | null>(note.tagUserId);

	const {
		isLoading,
		data: users,
		error,
		isSuccess,
	} = useQuery<User[]>({
		queryKey: ["users"],
		queryFn: async () => {
			const res = await axios.get("/api/users");
			return res.data;
		},
		staleTime: 6000,
		retry: 3,
	});

	if (isLoading) return <Skeleton height={38} width={200} />;
	if (error) return null;
	if (isSuccess) {
		const selectedOption = users.find((user) => user.id === value);

		const options = users.map((item) => (
			<ComboboxOption value={item.id} key={item.id}>
				<SelectOption name={item.name} />
			</ComboboxOption>
		));

		

		return (
			<Combobox
				store={combobox}
				withinPortal={false}
				onOptionSubmit={(tagUserId) => {
					setValue(tagUserId);
					const id = tagUserId === '' ? null : tagUserId;
					axios.patch(`/api/notes/${note.id}`, { tagUserId: id });
					router.refresh();
					combobox.closeDropdown();
				}}
			>
				<ComboboxTarget>
					<InputBase
						component="button"
						type="button"
						pointer
						rightSection={<Combobox.Chevron />}
						onClick={() => combobox.toggleDropdown()}
						rightSectionPointerEvents="none"
						multiline
					>
						{selectedOption ? (
							<SelectOption {...selectedOption} />
						) : (
							<InputPlaceholder>Pick value</InputPlaceholder>
						)}
					</InputBase>
				</ComboboxTarget>

				<ComboboxDropdown>
					<ComboboxOptions>
						<ComboboxOption value={""}>
							<SelectOption name="Unasigned" />
						</ComboboxOption>
						{options}
					</ComboboxOptions>
				</ComboboxDropdown>
			</Combobox>
		);
	}
};

export default TagSelect;
