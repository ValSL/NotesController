'use client'

import React, { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const ReactQueryClientProvider = ({ children }: PropsWithChildren) => {
	const queryClient = new QueryClient();
	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default ReactQueryClientProvider;
