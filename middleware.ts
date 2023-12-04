export { default } from "next-auth/middleware";

export const config = {
	matcher: ["/notes/new", "/notes/edit/:id+"],
};
