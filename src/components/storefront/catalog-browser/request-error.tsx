import { useTranslations } from "next-intl";
import { RetryButton, StatusPanel } from "../storefront.styles";

export function RequestError({
	message,
	onRetry,
}: Readonly<{ message: string; onRetry: () => void }>) {
	const t = useTranslations("catalog");
	return (
		<StatusPanel data-kind="error" role="alert">
			<p>{message}</p>
			<RetryButton type="button" onClick={onRetry}>
				{t("retry")}
			</RetryButton>
		</StatusPanel>
	);
}
