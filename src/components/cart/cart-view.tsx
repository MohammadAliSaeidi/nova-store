"use client";

import { useProducts } from "@/hooks/use-products";
import { getCartQuantity, useCartStore } from "@/storage/cart-store";
import { getCartTotalCents } from "@/utils/cart";
import { useLocale, useTranslations } from "next-intl";
import { CartItemRow } from "./cart-item-row";
import { CartSummary } from "./cart-summary";
import {
	CartActionButton,
	CartBrowseLink,
	CartLayout,
	CartList,
	CartMain,
	CartStatePanel,
	CartTitle,
} from "./styles";

export function CartView() {
	const t = useTranslations("cart");
	const locale = useLocale();
	const items = useCartStore((state) => state.items);
	const isHydrated = useCartStore((state) => state.isHydrated);
	const increase = useCartStore((state) => state.increase);
	const decrease = useCartStore((state) => state.decrease);
	const removeItem = useCartStore((state) => state.removeItem);
	const clear = useCartStore((state) => state.clear);
	const productsQuery = useProducts();
	const products = productsQuery.data ?? [];
	const productsById = new Map(
		products.map((product) => [product.id, product]),
	);

	return (
		<CartMain>
			<CartTitle>{t("title")}</CartTitle>
			{!isHydrated ? (
				<CartStatePanel aria-busy="true">
					<p>{t("loading")}</p>
				</CartStatePanel>
			) : items.length === 0 ? (
				<CartStatePanel>
					<h2>{t("empty")}</h2>
					<p>{t("emptyHint")}</p>
					<CartBrowseLink href={`/${locale}`}>
						{t("browseProducts")}
					</CartBrowseLink>
				</CartStatePanel>
			) : productsQuery.isPending ? (
				<CartStatePanel aria-busy="true">
					<p>{t("loadingProducts")}</p>
				</CartStatePanel>
			) : productsQuery.isError ? (
				<CartStatePanel>
					<h2>{t("productsError")}</h2>
					<CartActionButton
						type="button"
						onClick={() => void productsQuery.refetch()}
					>
						{t("retry")}
					</CartActionButton>
				</CartStatePanel>
			) : (
				<CartLayout>
					<CartList>
						{items.map((item) => (
							<CartItemRow
								key={item.productId}
								item={item}
								product={productsById.get(
									item.productId,
								)}
								onIncrease={() =>
									increase(item.productId)
								}
								onDecrease={() =>
									decrease(item.productId)
								}
								onRemove={() =>
									removeItem(item.productId)
								}
							/>
						))}
					</CartList>
					<CartSummary
						count={getCartQuantity(items)}
						totalCents={getCartTotalCents(items, products)}
						onClear={clear}
					/>
				</CartLayout>
			)}
		</CartMain>
	);
}
