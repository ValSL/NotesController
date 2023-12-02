import { Box, ColorSchemeScript, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import type { Metadata } from "next";
// import NavBar from "./NavBar";
import "./globals.css";
import { theme } from "./theme";
import NavBar from './components/Navbar/index';



export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<ColorSchemeScript />
			</head>
			{/* <body className={inter.className}> */}
			<body>
				<MantineProvider theme={theme}>
					<NavBar />
					<Box p="1.35rem">{children}</Box>
				</MantineProvider>
			</body>
		</html>
	);
}
