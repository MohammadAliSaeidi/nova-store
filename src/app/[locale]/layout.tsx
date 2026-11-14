import { StyledComponentsRegistry } from "@/components/styled-components-registry";
import { getDirection } from "@/i18n/config";
import { routing } from "@/i18n/routing";
import { getSiteUrl } from "@/utils/site-url";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { Suspense, type ReactNode } from "react";
import { RequestThemeProvider } from "@/context/request-theme-provider";

const vazirmatn = localFont({
	src: "../../assets/fonts/Vazirmatn-Regular.woff2",
	weight: "400",
	style: "normal",
	display: "swap",
	variable: "--font-store",
});

export const metadata: Metadata = {
	title: {
		default: "NOVA Store",
		template: "%s | NOVA Store",
	},
	metadataBase: getSiteUrl(),
};

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
}

type Props = {
	children: ReactNode;
	params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
	const { locale } = await params;
	if (!hasLocale(routing.locales, locale)) notFound();

	const messages = await getMessages({ locale });

	return (
		<html
			lang={locale}
			dir={getDirection(locale)}
			className={locale === "fa" ? vazirmatn.variable : undefined}
		>
			<body>
				<StyledComponentsRegistry>
					<NextIntlClientProvider
						locale={locale}
						messages={messages}
					>
						<Suspense fallback={null}>
							<RequestThemeProvider>
								{children}
							</RequestThemeProvider>
						</Suspense>
					</NextIntlClientProvider>
				</StyledComponentsRegistry>
			</body>
		</html>
	);
}
