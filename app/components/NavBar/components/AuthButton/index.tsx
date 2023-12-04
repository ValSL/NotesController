import { Menu, MenuTarget, Avatar, MenuDropdown, MenuLabel, MenuItem, Text, Skeleton } from "@mantine/core";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const AuthButton = () => {
	const { data: session, status } = useSession();

	return (
		<>
			{status === "loading" && <Skeleton height={18} width={45}/>}
			{status === "authenticated" && (
				<Menu>
					<MenuTarget>
						<Avatar src={session.user?.image} alt="it's me" />
					</MenuTarget>
					<MenuDropdown>
						<MenuLabel>
							<Text>{session.user?.email}</Text>
						</MenuLabel>
						<MenuItem>
							<Link href="/api/auth/signout">
								<Text c="red">Log out</Text>
							</Link>
						</MenuItem>
					</MenuDropdown>
				</Menu>
			)}
			{status === "unauthenticated" && (
				<Link href="/api/auth/signin" className="nav-link">
					Login
				</Link>
			)}
		</>
	);
};

export default AuthButton;
