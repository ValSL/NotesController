'use client';

import { Combobox, Input, InputBase, Text, useCombobox } from "@mantine/core";
import { Status } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useState } from 'react';



const StatusFilter = () => {
	const statuses: { label: string, status?: Status; }[] = [
		{ label: 'Open', status: 'OPEN' },
		{ label: 'Closed', status: 'CLOSED' },
		{ label: 'In progress', status: 'IN_PROGRESS' },
		{ label: 'All' },
	];

	const router = useRouter();
	const [value, setValue] = useState<string | null>(null);
	const selectedOption = findStatus(statuses, value);
	const combobox = useCombobox({
		onDropdownClose: () => combobox.resetSelectedOption(),
	});

	const options = statuses.map((item) => (
		<Combobox.Option value={item.status || ''} key={item.label}>
			<SelectOption {...item} />
		</Combobox.Option>
	));
		
	return (
		<Combobox
			store={combobox}
			withinPortal={false}
			onOptionSubmit={(val) => {
				setValue(val);
				router.push(`/notes/list?status=${val}`)
				combobox.closeDropdown();
			}}
		>
			<Combobox.Target>
				<InputBase
					component="button"
					type="button"
					pointer
					w={120}
					rightSection={<Combobox.Chevron />}
					onClick={() => combobox.toggleDropdown()}
					rightSectionPointerEvents="none"
					multiline
				>
					{selectedOption ? (
						<SelectOption {...selectedOption} />
					) : (
						<Input.Placeholder>Pick value</Input.Placeholder>
					)}
				</InputBase>
			</Combobox.Target>
			<Combobox.Dropdown>
				<Combobox.Options>{options}</Combobox.Options>
			</Combobox.Dropdown>
		</Combobox>
	);
};

function SelectOption({ label }: { label?: string | null; }) {
	return (
		<Text fz="sm" fw={500}>
			{label}
		</Text>
	);
}

const findStatus = (statuses: { label: string, status?: Status; }[], value: string | null) => {
	if(value === ''){
		return statuses.find(item => item.label === 'All')
	}
	return statuses.find(item => item.status === value);
}

export default StatusFilter;