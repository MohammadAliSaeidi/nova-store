export const themeModes = ['light', 'dark', 'system'] as const;
export type ThemeMode = (typeof themeModes)[number];
export type ResolvedTheme = Exclude<ThemeMode, 'system'>;

export function isThemeMode(value: string | undefined): value is ThemeMode {
  return themeModes.some((mode) => mode === value);
}
