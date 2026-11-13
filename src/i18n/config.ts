import type { UIDirection } from "@/types/ui-direction";
import { localeCookie, routing } from "@/i18n/routing";

export type Locale = (typeof routing.locales)[number];

export const locales = routing.locales;
export const defaultLocale: Locale = routing.defaultLocale;
export const LOCALE_COOKIE_NAME = localeCookie.name;
export const LOCALE_COOKIE_MAX_AGE_SECONDS = localeCookie.maxAge;

export const localeLabels: Record<Locale, string> = {
	fa: "فارسی",
	en: "English",
};

const RTL_LOCALES = new Set<Locale>(["fa"]);

export function isRtlLocale(locale: string): boolean {
	return RTL_LOCALES.has(locale as Locale);
}

export function getDirection(locale: string): UIDirection {
	return isRtlLocale(locale) ? "rtl" : "ltr";
}

export function isLocale(value: string): value is Locale {
	return (locales as readonly string[]).includes(value);
}

export function writeLocaleCookie(locale: Locale): void {
	if (typeof document === "undefined") return;

	const secure = window.location.protocol === "https:" ? "; Secure" : "";
	document.cookie = `${LOCALE_COOKIE_NAME}=${locale}; Path=/; Max-Age=${LOCALE_COOKIE_MAX_AGE_SECONDS}; SameSite=Lax${secure}`;
}
