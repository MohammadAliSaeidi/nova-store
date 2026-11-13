import { StyledComponentsRegistry } from "@/components/styled-components-registry";
import { getDirection } from "@/i18n/config";
import { routing } from "@/i18n/routing";
import { AppProviders } from "@/shared/providers/app-providers";
import { isThemeMode, THEME_COOKIE_NAME } from "@/shared/types/theme";
import { getSiteUrl } from "@/shared/utils/site-url";
import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

export const metadata: Metadata = {
	title: "NOVA Store",
	metadataBase: getSiteUrl(),
};

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
}

type Props = {
	children: ReactNode;
	params: Promise<{ locale: string }>;
};

export default async function LocaleLayout(props: Props) {
	const { children, params } = props;
	const { locale } = await params;
	if (!hasLocale(routing.locales, locale)) notFound();

	const [messages, cookieStore] = await Promise.all([
		getMessages(),
		cookies(),
	]);
	const cookieMode = cookieStore.get(THEME_COOKIE_NAME)?.value;
	const theme = isThemeMode(cookieMode) ? cookieMode : "light";

	return (
		<html lang={locale} dir={getDirection(locale)} data-theme={theme}>
			<body>
				<StyledComponentsRegistry>
					<NextIntlClientProvider
						locale={locale}
						messages={messages}
					>
						<AppProviders initialTheme={theme}>
							{children}
						</AppProviders>
					</NextIntlClientProvider>
				</StyledComponentsRegistry>
			</body>
		</html>
	);
}
