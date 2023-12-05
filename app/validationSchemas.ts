import { z } from "zod";


export const noteSchema = z.object({
	title: z.string().min(1, "Title is required").max(255),
	description: z.string().min(1, "Description is required"),
});

export const patchNoteSchema = z.object({
	title: z.string().min(1, "Title is required").max(255).optional(),
	description: z.string().min(1, "Description is required").max(10000).optional(),
	tagUserId: z.string().min(1).optional().nullable()
})