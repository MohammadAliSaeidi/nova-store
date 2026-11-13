"use client";

import { themes } from "@/shared/styles/theme";
import type { ResolvedTheme, ThemeMode } from "@/shared/types/theme";
import {
	createContext,
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
const THEME_COOKIE_MAX_AGE = 31_536_000;

export function ThemeContextProvider({
	children,
	initialMode,
}: Readonly<{ children: ReactNode; initialMode: ThemeMode }>) {
	const [mode, setModeState] = useState(initialMode);
	const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(
		initialMode === "dark" ? "dark" : "light",
	);

	useEffect(() => {
		const media = window.matchMedia("(prefers-color-scheme: dark)");
		const applyMode = () => {
			setResolvedTheme(
				mode === "system"
					? media.matches
						? "dark"
						: "light"
					: mode,
			);
		};

		applyMode();
		if (mode === "system") media.addEventListener("change", applyMode);
		return () => media.removeEventListener("change", applyMode);
	}, [mode]);

	useEffect(() => {
		document.documentElement.dataset.theme = resolvedTheme;
	}, [resolvedTheme]);

	const setMode = (nextMode: ThemeMode) => {
		setModeState(nextMode);
		document.cookie = `NOVA_THEME=${nextMode}; Path=/; Max-Age=${THEME_COOKIE_MAX_AGE}; SameSite=Lax${location.protocol === "https:" ? "; Secure" : ""}`;
	};

	const value = useMemo(
		() => ({ mode, resolvedTheme, setMode }),
		[mode, resolvedTheme],
	);

	return (
		<ThemeContext.Provider value={value}>
			<StyledThemeProvider theme={themes[resolvedTheme]}>
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
