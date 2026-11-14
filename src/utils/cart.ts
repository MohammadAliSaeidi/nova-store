import type { CartItem } from "@/storage/cart-store";
import type { Product } from "@/types/product";

export function getUnitPriceCents(price: number): number {
	return Math.round(price * 100);
}

export function getLineTotalCents(item: CartItem, product: Product): number {
	return getUnitPriceCents(product.price) * item.quantity;
}

export function getCartTotalCents(
	items: readonly CartItem[],
	products: readonly Product[],
): number {
	const productsById = new Map(products.map((product) => [product.id, product]));
	return items.reduce((total, item) => {
		const product = productsById.get(item.productId);
		return product ? total + getLineTotalCents(item, product) : total;
	}, 0);
}

export function formatCartPrice(cents: number, locale: string): string {
	return new Intl.NumberFormat(locale === "fa" ? "fa-IR" : "en-US", {
		style: "currency",
		currency: "USD",
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(cents / 100);
}
