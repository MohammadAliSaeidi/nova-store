"use client";

import { useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { writeLocaleCookie, type Locale } from "@/i18n/config";
import { LanguageLink } from "../storefront.styles";

export function LocaleControl() {
	const locale = useLocale();
	const t = useTranslations("catalog");
	const nextLocale: Locale = locale === "fa" ? "en" : "fa";

	useEffect(() => {
		if (locale === "fa" || locale === "en") writeLocaleCookie(locale);
	}, [locale]);

	return (
		<LanguageLink
			href={`/${nextLocale}`}
			lang={nextLocale}
			aria-label={t("switchLanguageLabel")}
			onClick={() => writeLocaleCookie(nextLocale)}
		>
			{t("switchLanguage")}
		</LanguageLink>
	);
}
