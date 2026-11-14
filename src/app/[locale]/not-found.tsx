import { RouteErrorView } from "@/components/storefront/route-error-view";
import { hasLocale } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";

export default async function NotFound() {
	const locale = await getLocale();
	const safeLocale = hasLocale(routing.locales, locale) ? locale : "fa";
	const t = await getTranslations({ locale: safeLocale, namespace: "errors" });

	return (
		<RouteErrorView
			code="404"
			title={t("notFoundTitle")}
			description={t("notFoundDescription")}
			linkLabel={t("home")}
			href={`/${safeLocale}`}
		/>
	);
}
