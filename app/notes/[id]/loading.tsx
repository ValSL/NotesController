import { Flex, Paper, Skeleton, Box, Stack } from "@mantine/core";
import React from "react";

const NoteDetailLoading = () => {
	return (
		<Box className="max-w-xl">
			<Skeleton height={35} />
			<Flex gap={7} my={10}>
				<Skeleton height={15} />
				<Skeleton height={15} />
			</Flex>
			<Paper withBorder p={10} mt="xl">
				<Stack gap={5}>
					<Skeleton height={15} />
					<Skeleton height={15} />
					<Skeleton height={15} />
				</Stack>
			</Paper>
		</Box>
	);
};

export default NoteDetailLoading;
