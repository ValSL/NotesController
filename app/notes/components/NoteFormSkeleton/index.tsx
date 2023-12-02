import { Box, Skeleton } from "@mantine/core";
import React from "react";

const NoteFormSkeleton = () => {
	return (
		<Box className="max-w-xl flex flex-col gap-3">
			<Skeleton height={35} />
			<Skeleton height={160} />
		</Box>
	);
};

export default NoteFormSkeleton;
