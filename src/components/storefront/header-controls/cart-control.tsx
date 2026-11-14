"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { getCartQuantity, useCartStore } from "@/storage/cart-store";
import { CartCount, CartStatus } from "../storefront.styles";

function BagIcon() {
	return (
		<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
			<path
				d="M5 8.5h14l1 12H4l1-12Z"
				stroke="currentColor"
				strokeWidth="1.8"
				strokeLinejoin="round"
			/>
			<path
				d="M9 9V6a3 3 0 0 1 6 0v3"
				stroke="currentColor"
				strokeWidth="1.8"
				strokeLinecap="round"
			/>
		</svg>
	);
}

export function CartControl() {
	const locale = useLocale();
	const cartT = useTranslations("cart");
	const cartItems = useCartStore((state) => state.items);
	const cartHydrated = useCartStore((state) => state.isHydrated);
	const cartQuantity = getCartQuantity(cartItems);
	const formattedQuantity = new Intl.NumberFormat(locale).format(cartQuantity);

	useEffect(() => {
		let active = true;
		void Promise.resolve(useCartStore.persist.rehydrate())
			.catch(() => undefined)
			.finally(() => {
				if (active) useCartStore.setState({ isHydrated: true });
			});
		return () => {
			active = false;
		};
	}, []);

	return (
		<Link
			href={`/${locale}/cart`}
			aria-label={cartT("badgeLabel", { count: formattedQuantity })}
		>
			<CartStatus role="status" aria-live="polite">
				<BagIcon />
				{cartHydrated && cartQuantity > 0 ? (
					<CartCount aria-hidden="true">{formattedQuantity}</CartCount>
				) : null}
			</CartStatus>
		</Link>
	);
}
