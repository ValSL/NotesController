import { Button, TextInput, Textarea } from "@mantine/core";
// import { TextField } from "@radix-ui/themes";
import React from 'react'

const NewNotePage = () => {
  return (
    <div className="max-w-xl space-y-3">
        <TextInput placeholder="Title"/>
        <Textarea placeholder="Description"/>
        <Button>Submit new Note</Button>
    </div>
  )
}

export default NewNotePage