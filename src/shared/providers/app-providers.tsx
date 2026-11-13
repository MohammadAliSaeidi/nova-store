"use client";

import { ThemeContextProvider } from "@/context/theme-context";
import { GlobalStyles } from "@/shared/styles/global-styles";
import type { ThemeMode } from "@/shared/types/theme";
import type { ReactNode } from "react";
import { QueryProvider } from "./query-provider";

export function AppProviders({
	children,
	initialTheme,
}: Readonly<{ children: ReactNode; initialTheme: ThemeMode }>) {
	return (
		<ThemeContextProvider initialMode={initialTheme}>
			<QueryProvider>
				<GlobalStyles />
				{children}
			</QueryProvider>
		</ThemeContextProvider>
	);
}
