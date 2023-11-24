"use client";

import { Alert, Button, Text, TextInput, Textarea } from "@mantine/core";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createNoteSchema } from "@/app/validationSchemas";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "@/app/components/ErrorMessage";

type NewNoteForm = z.infer<typeof createNoteSchema>;

const NewNotePage = () => {
	const [error, setError] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
	} = useForm<NewNoteForm>({
		resolver: zodResolver(createNoteSchema),
	});
	
	const router = useRouter();

	const submitHandler: SubmitHandler<NewNoteForm> = async (data) => {
		try {
			setIsSubmitting(true);
			await axios.post("/api/notes", data);
			router.push("/");
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
				<TextInput placeholder="Title" {...register("title")} />
				<ErrorMessage>{errors.title?.message}</ErrorMessage>
				<Controller
					control={control}
					name="description"
					render={({ field }) => <SimpleMDE placeholder="Description" {...field} />}
				/>
				<ErrorMessage>{errors.description?.message}</ErrorMessage>
				<Button type="submit" loading={isSubmitting}>
					Create note
				</Button>
			</form>
		</div>
	);
};

export default NewNotePage;
