import { Text } from "@mantine/core";
import React, { PropsWithChildren } from "react";

const ErrorMessage = ({ children }: PropsWithChildren) => {
	if (!children) return null;
	return <Text c="red">{children}</Text>;
};

export default ErrorMessage;
