"use client";

import { Container, Flex } from "@mantine/core";
import AuthButton from "./components/AuthButton";
import Navigation from "./components/Navigation";

const NavBar = () => {
	return (
		<nav className="border-b mb-5">
			<Container size="lg">
				<Flex justify="space-between">
					<Flex gap="1.25rem" p="0.75rem">
						<Navigation />
					</Flex>
					<Flex align="center">
						<AuthButton />
					</Flex>
				</Flex>
			</Container>
		</nav>
	);
};

export default NavBar;
