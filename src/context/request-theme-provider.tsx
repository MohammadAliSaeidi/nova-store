import { AppProviders } from "@/shared/providers/app-providers";
import { isThemeMode } from "@/shared/types/theme";
import { cookies } from "next/headers";
import type { ReactNode } from "react";

export async function RequestThemeProvider({
	children,
}: Readonly<{ children: ReactNode }>) {
	const cookieStore = await cookies();
	const cookieMode = cookieStore.get("NOVA_THEME")?.value;
	const initialTheme = isThemeMode(cookieMode) ? cookieMode : "system";

	return <AppProviders initialTheme={initialTheme}>{children}</AppProviders>;
}
