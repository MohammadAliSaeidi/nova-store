export function formatUsd(amount: number, locale: string) {
	return new Intl.NumberFormat(locale === "fa" ? "fa-IR" : "en-US", {
		style: "currency",
		currency: "USD",
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(amount);
}
