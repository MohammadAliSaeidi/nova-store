import { hasLocale } from "next-intl";
import { locale as routeLocale } from "next/root-params";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ locale: explicitLocale }) => {
	const requestedLocale = explicitLocale ?? (await routeLocale());
	const locale = hasLocale(routing.locales, requestedLocale)
		? requestedLocale
		: routing.defaultLocale;

	return {
		locale,
		messages: (await import(`../dictionary/${locale}.json`)).default,
	};
});
