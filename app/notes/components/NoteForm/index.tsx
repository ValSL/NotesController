"use client";

import ErrorMessage from "@/app/components/ErrorMessage";
import { noteSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, Button, TextInput } from "@mantine/core";
import { Note } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import MDEditor from "@uiw/react-md-editor";

type NewNoteForm = z.infer<typeof noteSchema>;

const NoteForm = ({ note }: { note?: Note }) => {
	const [error, setError] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
	} = useForm<NewNoteForm>({
		resolver: zodResolver(noteSchema),
	});

	const router = useRouter();

	const submitHandler: SubmitHandler<NewNoteForm> = async (data) => {
		try {
			setIsSubmitting(true);

			if (note) {
				await axios.patch("/api/notes/" + note.id, data);
			} else {
				await axios.post("/api/notes", data);
			}

			router.push("/notes");
		} catch (error) {
			setIsSubmitting(false);
			setError("An exception was occured");
		}
		setIsSubmitting(false);
	};

	return (
		<div className="max-w-xl">
			{error && (
				<Alert color="red" title="Error" className="mb-5">
					{error}
				</Alert>
			)}
			
			<form className="space-y-3" onSubmit={handleSubmit(submitHandler)}>
				<TextInput defaultValue={note?.title} placeholder="Title" {...register("title")} />
				<ErrorMessage>{errors.title?.message}</ErrorMessage>

				<div data-color-mode="light">
					<Controller
						control={control}
						defaultValue={note?.description}
						name="description"
						render={({ field }) => <MDEditor placeholder="Description" {...field} />}
					/>
				</div>
				<ErrorMessage>{errors.description?.message}</ErrorMessage>

				<Button type="submit" loading={isSubmitting}>
					{note ? "Update note" : "Create note"}
				</Button>
			</form>
		</div>
	);
};

export default NoteForm;
