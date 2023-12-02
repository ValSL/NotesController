"use client";

import Link from "next/link";
import React from "react";
import classNames from "classnames";
import { usePathname } from "next/navigation";
import classes from "./Navbar.module.css";

const NavBar = () => {
	const currentPath = usePathname();
	console.log(currentPath);
	
	const links = [
		{ label: "Dashboard", href: "/" },
		{ label: "Notes", href: "/notes" },
	];
	const zinc500 = classes.navbarTextZinc500;
	const zinc800 = classes.navbarTextZinc800;
	const zinc900 = classes.navbarTextZinc900;
	return (
		
		<nav className={classes.navContainer}>
			<Link href="/">Logo</Link>
			<ul className={classes.navLinks}>
				{links.map((item) => {
					return (
						<Link
							key={item.href}
							className={classNames([classes.trans], {
								[classes.navbarTextZinc9]: currentPath === item.href,
								[classes.navbarTextZinc5] : currentPath !== item.href,
							})}
							href={item.href}
						>
							{item.label}
						</Link>
					);
				})}
			</ul>
		</nav>
	);
};

export default NavBar;
