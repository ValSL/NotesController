import { Badge } from "@mantine/core";
import { Status } from "@prisma/client";
import React from 'react'
import classes from './NoteBadge.module.css'

interface NoteBadgeProps {
    status: Status
}

const badgeProps: Record<Status, {label: string, color: string, text: string}> = {
    OPEN: { label: 'Open', color: "red.1", text: classes.badgeRedText },
    IN_PROGRESS: { label: 'In progress', color: "violet.1", text: classes.badgeVioletText },
    CLOSED: { label: 'CLOSED', color: "green.1", text: classes.badgeGreenText },
  };



const NoteBadge = ({status}: NoteBadgeProps) => {
  return (
    <Badge color={badgeProps[status].color} classNames={{label: badgeProps[status].text}} >
        {badgeProps[status].label}
    </Badge>
  )
}

export default NoteBadge