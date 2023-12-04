"use client";

import ErrorMessage from "@/app/components/ErrorMessage";
import { noteSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, Button, TextInput, Textarea } from "@mantine/core";
import { Note } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import classes from "./noteForm.module.css";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

type NewNoteForm = z.infer<typeof noteSchema>;

const NoteForm = ({ note }: { note?: Note }) => {
	const [error, setError] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<NewNoteForm>({
		resolver: zodResolver(noteSchema),
	});

	const router = useRouter();

	const submitHandler: SubmitHandler<NewNoteForm> = async (data) => {
		try {
			setIsSubmitting(true);
			console.log(data);

			if (note) {
				await axios.patch("/api/notes/" + note.id, data);
			} else {
				await axios.post("/api/notes", data);
			}

			router.push("/notes/list");
			router.refresh();
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
				<Controller
					control={control}
					name="description"
					defaultValue={note?.description}
					render={({ field }) => <SimpleMDE {...field} />}
				></Controller>

				{/* <Textarea {...register("description")} defaultValue={note?.description} placeholder="Description"></Textarea> */}
				<ErrorMessage>{errors.description?.message}</ErrorMessage>

				<Button color="var(--mantine-primary-color-filled)" type="submit" loading={isSubmitting}>
					{note ? "Update note" : "Create note"}
				</Button>
			</form>
		</div>
	);
};

export default NoteForm;
