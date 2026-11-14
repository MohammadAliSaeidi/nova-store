"use client";

import { formatCartPrice } from "@/utils/cart";
import { useLocale, useTranslations } from "next-intl";
import {
	CartActionButton,
	CartSummaryLine,
	CartSummaryPanel,
	CartSummaryTitle,
	CartTotal,
} from "./styles";

type Props = { count: number; totalCents: number; onClear: () => void };

export function CartSummary({ count, totalCents, onClear }: Props) {
	const t = useTranslations("cart");
	const locale = useLocale();
	return (
		<CartSummaryPanel aria-labelledby="cart-summary-title">
			<CartSummaryTitle id="cart-summary-title">
				{t("summary")}
			</CartSummaryTitle>
			<CartSummaryLine>
				<span>
					{t("itemsCount", {
						count: new Intl.NumberFormat(locale).format(
							count,
						),
					})}
				</span>
			</CartSummaryLine>
			<CartSummaryLine>
				<span>{t("total")}</span>
				<CartTotal>{formatCartPrice(totalCents, locale)}</CartTotal>
			</CartSummaryLine>
			<CartActionButton type="button" onClick={onClear}>
				{t("clear")}
			</CartActionButton>
		</CartSummaryPanel>
	);
}
