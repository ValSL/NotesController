'use client'

import { Button, TextInput, Textarea } from "@mantine/core";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const NewNotePage = () => {
  return (
    <div className="max-w-xl space-y-3">
        <TextInput placeholder="Title"/>
        <SimpleMDE placeholder="Description"/>
        <Button>Submit new Note</Button>
    </div>
  )
}

export default NewNotePage