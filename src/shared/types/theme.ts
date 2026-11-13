export const themeModes = ["light", "dark"] as const;
export type ThemeMode = (typeof themeModes)[number];
export type ResolvedTheme = ThemeMode;

export const THEME_COOKIE_NAME = "NOVA_THEME";
export const THEME_COOKIE_MAX_AGE_SECONDS = 31_536_000;

export function isThemeMode(value: string | undefined): value is ThemeMode {
	return themeModes.some((mode) => mode === value);
}
