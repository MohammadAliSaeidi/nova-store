"use client";

import { useTheme } from "@/context/theme-context";
import { useTranslations } from "next-intl";
import { ThemeToggle } from "../storefront.styles";

function ThemeIcon({ dark }: Readonly<{ dark: boolean }>) {
	return dark ? (
		<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
			<circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
			<path
				d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"
				stroke="currentColor"
				strokeWidth="1.8"
				strokeLinecap="round"
			/>
		</svg>
	) : (
		<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
			<path
				d="M20.2 15.4A8.5 8.5 0 0 1 8.6 3.8 8.5 8.5 0 1 0 20.2 15.4Z"
				stroke="currentColor"
				strokeWidth="1.8"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

export function ThemeControl() {
	const t = useTranslations("catalog");
	const { mode, setMode } = useTheme();
	const nextTheme = mode === "light" ? "dark" : "light";
	const label = t(nextTheme === "dark" ? "switchToDark" : "switchToLight");

	return (
		<ThemeToggle
			type="button"
			aria-label={label}
			title={label}
			onClick={() => setMode(nextTheme)}
		>
			<ThemeIcon dark={mode === "dark"} />
		</ThemeToggle>
	);
}
