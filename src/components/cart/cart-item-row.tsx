"use client";

import { QuantityStepper } from "@/components/quantity-stepper/quantity-stepper";
import type { CartItem as StoredCartItem } from "@/storage/cart-store";
import type { Product } from "@/types/product";
import {
	formatCartPrice,
	getLineTotalCents,
	getUnitPriceCents,
} from "@/utils/cart";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import {
	CartActionButton,
	CartControls,
	CartImageFrame,
	CartMuted,
	CartProductInfo,
	CartProductTitle,
	CartRow,
	CartRowTotal,
} from "./styles";

type Props = {
	item: StoredCartItem;
	product?: Product;
	onIncrease: () => void;
	onDecrease: () => void;
	onRemove: () => void;
};

export function CartItemRow({
	item,
	product,
	onIncrease,
	onDecrease,
	onRemove,
}: Props) {
	const t = useTranslations("cart");
	const locale = useLocale();

	return (
		<CartRow>
			<CartImageFrame>
				{product ? (
					<Image
						src={product.image}
						alt={product.title}
						width={120}
						height={120}
						unoptimized
					/>
				) : null}
			</CartImageFrame>
			<CartProductInfo>
				<CartProductTitle dir="auto">
					{product?.title ?? t("unavailableProduct")}
				</CartProductTitle>
				{product ? (
					<CartMuted dir="auto">{product.category}</CartMuted>
				) : null}
				{product ? (
					<CartMuted>
						{t("unitPrice")}:{" "}
						{formatCartPrice(
							getUnitPriceCents(product.price),
							locale,
						)}
					</CartMuted>
				) : null}
			</CartProductInfo>
			<CartControls>
				<QuantityStepper
					value={item.quantity}
					label={t("quantityForProduct", {
						product:
							product?.title ?? t("unavailableProduct"),
					})}
					increaseLabel={t("increase")}
					decreaseLabel={t("decrease")}
					onIncrease={onIncrease}
					onDecrease={onDecrease}
				/>
				<CartRowTotal>
					{product
						? `${t("lineTotal")}: ${formatCartPrice(getLineTotalCents(item, product), locale)}`
						: t("unavailableProduct")}
				</CartRowTotal>
				<CartActionButton type="button" onClick={onRemove}>
					{t("remove")}
				</CartActionButton>
			</CartControls>
		</CartRow>
	);
}
