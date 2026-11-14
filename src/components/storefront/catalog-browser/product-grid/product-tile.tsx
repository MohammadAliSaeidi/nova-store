import { Product } from "@/types/product";
import { formatUsd } from "@/utils/format-usd";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import {
	AddToCartButton,
	ProductCard,
	ProductCategory,
	ProductDetails,
	ProductImageFrame,
	ProductMeta,
	ProductPrice,
	ProductRating,
	ProductTitle,
} from "../../storefront.styles";

function RatingStar() {
	return (
		<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
			<path d="m12 2.8 2.8 5.7 6.3.9-4.55 4.44 1.08 6.28L12 17.15l-5.63 2.97 1.08-6.28L2.9 9.4l6.3-.9L12 2.8Z" />
		</svg>
	);
}

type Props = {
	product: Product;
	isCartHydrated: boolean;
	onAddToCart: (productId: number) => void;
};

export default function ProductTile(props: Props) {
	const { product, isCartHydrated, onAddToCart } = props;
	const t = useTranslations("catalog");
	const locale = useLocale();
	const [wasAdded, setWasAdded] = useState(false);
	const rating = new Intl.NumberFormat(locale, {
		minimumFractionDigits: 1,
		maximumFractionDigits: 1,
	}).format(product.rating.rate);
	const reviewCount = new Intl.NumberFormat(locale).format(
		product.rating.count,
	);

	return (
		<ProductCard aria-labelledby={`product-${product.id}-title`}>
			<ProductImageFrame>
				<Image
					src={product.image}
					alt={product.title}
					width={420}
					height={320}
					unoptimized
				/>
			</ProductImageFrame>
			<ProductDetails>
				<ProductCategory dir="auto">
					{product.category}
				</ProductCategory>
				<ProductTitle id={`product-${product.id}-title`} dir="auto">
					{product.title}
				</ProductTitle>
				<ProductMeta>
					<ProductRating
						aria-label={t("ratingLabel", {
							rating,
							count: reviewCount,
						})}
					>
						<RatingStar />
						<span>
							{rating} ({reviewCount})
						</span>
					</ProductRating>
					<ProductPrice dir="auto">
						{formatUsd(product.price, locale)}
					</ProductPrice>
				</ProductMeta>
				<AddToCartButton
					type="button"
					disabled={!isCartHydrated}
					aria-label={
						wasAdded
							? t("addedToCartProduct", {
									product: product.title,
								})
							: t("addToCartProduct", {
									product: product.title,
								})
					}
					onClick={() => {
						onAddToCart(product.id);
						setWasAdded(true);
					}}
				>
					{wasAdded ? t("addedToCart") : t("addToCart")}
				</AddToCartButton>
			</ProductDetails>
		</ProductCard>
	);
}
