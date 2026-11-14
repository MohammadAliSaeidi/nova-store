import { AppProviders } from "@/shared/providers/app-providers";
import { isThemeMode, THEME_COOKIE_NAME } from "@/shared/types/theme";
import { cookies } from "next/headers";
import type { ReactNode } from "react";

export async function RequestThemeProvider({
	children,
}: Readonly<{ children: ReactNode }>) {
	const cookieStore = await cookies();
	const cookieMode = cookieStore.get(THEME_COOKIE_NAME)?.value;
	const initialTheme = isThemeMode(cookieMode) ? cookieMode : "light";

	return (
		<div data-theme={initialTheme} style={{ display: "contents" }}>
			<AppProviders initialTheme={initialTheme}>
				{children}
			</AppProviders>
		</div>
	);
}
