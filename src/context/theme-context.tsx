"use client";

import { themes } from "@/shared/styles/theme";
import {
	THEME_COOKIE_MAX_AGE_SECONDS,
	THEME_COOKIE_NAME,
	type ResolvedTheme,
	type ThemeMode,
} from "@/shared/types/theme";
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
	type ReactNode,
} from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";

type ThemeContextValue = {
	mode: ThemeMode;
	resolvedTheme: ResolvedTheme;
	setMode: (mode: ThemeMode) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeContextProvider({
	children,
	initialMode,
}: Readonly<{ children: ReactNode; initialMode: ThemeMode }>) {
	const [mode, setModeState] = useState<ThemeMode>(initialMode);

	useEffect(() => {
		document.documentElement.dataset.theme = mode;
	}, [mode]);

	const setMode = useCallback((next: ThemeMode) => {
		setModeState(next);
		document.cookie = `${THEME_COOKIE_NAME}=${next}; path=/; max-age=${THEME_COOKIE_MAX_AGE_SECONDS}; samesite=lax`;
	}, []);

	const value = useMemo(
		() => ({ mode, resolvedTheme: mode, setMode }),
		[mode, setMode],
	);

	return (
		<ThemeContext.Provider value={value}>
			<StyledThemeProvider theme={themes[mode]}>
				{children}
			</StyledThemeProvider>
		</ThemeContext.Provider>
	);
}

export function useTheme() {
	const context = useContext(ThemeContext);
	if (!context)
		throw new Error("useTheme must be used inside ThemeContextProvider");
	return context;
}
