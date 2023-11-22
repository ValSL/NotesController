import Link from "next/link";
import React from 'react'

const NavBar = () => {
  const links = [
    {label: 'Dashboard', href: '/'},
    {label: 'Issues', href: '/issues'},
  ]
  
    return (
    <nav className="flex gap-6 border-b px-5 h-14 mb-5 items-center">
        <Link href='/'>Logo</Link>
        <ul className="flex gap-6">
            {links.map((item) => {
                return (
                    <Link key={item.href} className="text-zinc-500 hover:text-zinc-800 transition-colors" href={item.href}>{item.label}</Link>
                )
            })}
        </ul>
    </nav>
  )
}

export default NavBar