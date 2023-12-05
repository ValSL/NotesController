"use client";

import { MultiSelect, Skeleton } from "@mantine/core";
import { User } from "@prisma/client";
import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";

const TagSelect = () => {
    const [value, setValue] = useState<string[]>([]);

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
        console.log(users);
		return <MultiSelect label="Tag a person" placeholder="Pick a user" value={value} onChange={setValue} data={users?.map((item) => item.name!)} />;
	}
};

export default TagSelect;
