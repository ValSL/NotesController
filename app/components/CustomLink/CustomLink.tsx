import { Anchor } from "@mantine/core";
import Link from "next/link";
import React from "react";

interface CustomLinkProps {
	href: string;
	children: string;
}

const CustomLink = ({ href, children }: CustomLinkProps) => {
	return (
		<Anchor component={Link} href={href}>
			{children}
		</Anchor>
	);
};

export default CustomLink;
