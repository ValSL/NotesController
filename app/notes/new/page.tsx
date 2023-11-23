"use client";

import { Button, TextInput, Textarea } from "@mantine/core";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

interface NewNoteForm {
	title: string;
	description: string;
}

const NewNotePage = () => {
	const { register, handleSubmit, control } = useForm<NewNoteForm>();
	const router = useRouter();

	const submitHandler: SubmitHandler<NewNoteForm> = async (data) => {
		await axios.post("/api/notes", data);
		router.push("/");
	};

	return (
		<form className="max-w-xl space-y-3" onSubmit={handleSubmit(submitHandler)}>
			<TextInput placeholder="Title" {...register("title")} />
			<Controller
				control={control}
				name="description"
				render={({ field }) => <SimpleMDE placeholder="Description" {...field} />}
			/>
			<Button type="submit">Go</Button>
		</form>
	);
};

export default NewNotePage;
