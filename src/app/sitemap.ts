import { getSiteUrl } from "@/utils/site-url";
import type { MetadataRoute } from "next";

const locales = ["fa", "en"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
	const siteUrl = getSiteUrl();
	const languages = Object.fromEntries(
		locales.map((locale) => [locale, new URL(`/${locale}`, siteUrl).toString()]),
	);

	return locales.map((locale) => ({
		url: new URL(`/${locale}`, siteUrl).toString(),
		alternates: { languages },
	}));
}
