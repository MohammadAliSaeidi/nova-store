"use client";

import { RouteErrorView } from "@/components/storefront/route-error-view";
import { useLocale, useTranslations } from "next-intl";

type Props = {
	error: Error & { digest?: string };
	reset: () => void;
};

export default function LocaleError({ reset }: Props) {
	const locale = useLocale();
	const t = useTranslations("errors");

	return (
		<RouteErrorView
			code="500"
			title={t("errorTitle")}
			description={t("errorDescription")}
			linkLabel={t("home")}
			href={`/${locale}`}
		>
			<button type="button" onClick={reset}>
				{t("retry")}
			</button>
		</RouteErrorView>
	);
}
