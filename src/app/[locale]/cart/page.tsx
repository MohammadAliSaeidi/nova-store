import { CartView } from "@/components/cart/cart-view";
import { CartMain, CartStatePanel, CartTitle } from "@/components/cart/styles";
import { StoreFooter } from "@/components/storefront/store-footer";
import { StoreHeader } from "@/components/storefront/store-header";
import { StorefrontShell } from "@/components/storefront/storefront.styles";
import type { Locale } from "@/i18n/config";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "cart" });
	return {
		title: t("title"),
		robots: { index: false },
	};
}

export default async function CartPage() {
	const t = await getTranslations("cart");
	return (
		<StorefrontShell>
			<StoreHeader />
			<Suspense
				fallback={
					<CartMain>
						<CartTitle>{t("title")}</CartTitle>
						<CartStatePanel aria-busy="true">
							<p>{t("loading")}</p>
						</CartStatePanel>
					</CartMain>
				}
			>
				<CartView />
			</Suspense>
			<StoreFooter />
		</StorefrontShell>
	);
}
