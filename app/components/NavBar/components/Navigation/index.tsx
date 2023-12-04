import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Navigation = () => {
	const currentPath = usePathname();

	const links = [
		{ label: "Dashboard", href: "/" },
		{ label: "Notes", href: "/notes/list" },
	];

	return (
		<>
			<Link href="/">Logo</Link>
			<ul className="flex gap-6">
				{links.map((item) => {
					return (
						<li key={item.href}>
							<Link
								className={classNames({
									"text-zinc-900": currentPath === item.href,
									"nav-link": currentPath !== item.href,
								})}
								href={item.href}
							>
								{item.label}
							</Link>
						</li>
					);
				})}
			</ul>
		</>
	);
};

export default Navigation;
