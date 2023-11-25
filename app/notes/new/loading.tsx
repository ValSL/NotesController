import { Box, Skeleton } from "@mantine/core";
import React from 'react'

const NewNoteLoading = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton height={20}/>
      <Skeleton height={20}/>
    </Box>
  )
}

export default NewNoteLoading