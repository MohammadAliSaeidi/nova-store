"use client";

import type { Product } from "@/types/product";
import { ProductGrid as ProductGridLayout } from "../../storefront.styles";
import ProductTile from "./product-tile";

type Props = {
	products: readonly Product[];
	isCartHydrated: boolean;
	onAddToCart: (productId: number) => void;
};

export default function ProductGrid(props: Props) {
	const { products, isCartHydrated, onAddToCart } = props;

	return (
		<ProductGridLayout>
			{products.map((product) => (
				<ProductTile
					key={product.id}
					product={product}
					isCartHydrated={isCartHydrated}
					onAddToCart={onAddToCart}
				/>
			))}
		</ProductGridLayout>
	);
}
