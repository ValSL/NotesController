import { createTheme } from "@mantine/core";
import { Inter, Asap } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const asap = Asap({ subsets: ["latin"] });

export const theme = createTheme({
	fontFamily: asap.style.fontFamily,
	primaryColor: "violet",
});