'use client'

import Link from "next/link";
import React from "react";
import classNames from "classnames";
import { usePathname } from "next/navigation";

const NavBar = () => {
    const currentPath = usePathname();

	const links = [
		{ label: "Dashboard", href: "/" },
		{ label: "Notes", href: "/notes" },
	];

	return (
		<nav className="flex gap-6 border-b px-5 h-14 mb-5 items-center">
			<Link href="/">Logo</Link>
			<ul className="flex gap-6">
				{links.map((item) => {
					return (
						<Link
							key={item.href}
							className={
                                classNames({
                                    'text-zinc-900': currentPath === item.href,
                                    'text-zinc-500': currentPath !== item.href,
                                    'hover:text-zinc-800 transition-colors': true
                                })
                            }
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
