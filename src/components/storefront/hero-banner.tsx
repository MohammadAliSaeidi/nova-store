import Image from "next/image";
import { useTranslations } from "next-intl";
import type { Product } from "@/types/product";
import {
	HeroArtwork,
	HeroCopy,
	HeroDescription,
	HeroEyebrow,
	HeroPanel,
	HeroProductFrame,
	HeroTitle,
	PrimaryLink,
} from "./storefront.styles";

export function HeroBanner({ products }: Readonly<{ products: readonly Product[] }>) {
	const t = useTranslations("catalog");

	return (
		<HeroPanel aria-labelledby="catalog-hero-title">
			<HeroCopy>
				<HeroEyebrow>{t("heroEyebrow")}</HeroEyebrow>
				<HeroTitle id="catalog-hero-title">{t("heroTitle")}</HeroTitle>
				<HeroDescription>{t("heroDescription")}</HeroDescription>
				<PrimaryLink href="#products">{t("heroCta")}</PrimaryLink>
			</HeroCopy>
			<HeroArtwork aria-hidden="true">
				{products.slice(0, 3).map((product, index) => (
					<HeroProductFrame key={product.id} $raised={index === 1}>
						<Image
							src={product.image}
							alt=""
							width={280}
							height={240}
							unoptimized
						/>
					</HeroProductFrame>
				))}
			</HeroArtwork>
		</HeroPanel>
	);
}
