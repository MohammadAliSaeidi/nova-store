import { useTranslations } from "next-intl";
import { HeroBanner } from "./hero-banner";
import {
	CatalogControls,
	CatalogSection,
	CatalogTopline,
	CategoryChips,
	HeadingAccent,
	LoadingBlock,
	PageContent,
	ProductCard,
	ProductDetails,
	ProductGrid,
	ProductImageFrame,
	ResultCount,
	SectionHeading,
	VisuallyHidden,
} from "./storefront.styles";

const LOADING_CARDS = Array.from({ length: 6 }, (_, index) => index);
const LOADING_CATEGORIES = Array.from({ length: 4 }, (_, index) => index);

export function CatalogLoadingFallback() {
	const t = useTranslations("catalog");

	return (
		<PageContent aria-busy="true">
			<HeroBanner products={[]} />
			<CatalogSection id="catalog-content">
				<section id="categories" aria-labelledby="catalog-categories-title">
					<SectionHeading id="catalog-categories-title">
						{t("categoriesHeading")}
					</SectionHeading>
					<HeadingAccent aria-hidden="true" />
					<VisuallyHidden role="status" aria-live="polite">
						{t("loadingCategories")}
					</VisuallyHidden>
					<CategoryChips aria-hidden="true">
						<LoadingBlock $width="7rem" $height="2.75rem" />
						{LOADING_CATEGORIES.map((category) => (
							<LoadingBlock
								key={category}
								$width={`${6 + category}rem`}
								$height="2.75rem"
							/>
						))}
					</CategoryChips>
				</section>

				<section id="products" aria-labelledby="catalog-section-title">
					<CatalogTopline>
						<div>
							<SectionHeading id="catalog-section-title">
								{t("productsHeading")}
							</SectionHeading>
							<HeadingAccent aria-hidden="true" />
						</div>
						<ResultCount>
							<LoadingBlock $width="6rem" $height="1rem" />
						</ResultCount>
					</CatalogTopline>
					<CatalogControls>
						<LoadingBlock $width="18rem" $height="2.9rem" />
					</CatalogControls>
					<VisuallyHidden role="status" aria-live="polite">
						{t("loadingProducts")}
					</VisuallyHidden>
					<ProductGrid aria-hidden="true">
						{LOADING_CARDS.map((card) => (
							<ProductCard key={card}>
								<ProductImageFrame>
									<LoadingBlock $width="65%" $height="70%" />
								</ProductImageFrame>
								<ProductDetails data-loading="true">
									<LoadingBlock $width="38%" $height="0.85rem" />
									<LoadingBlock $width="86%" $height="1.1rem" />
									<LoadingBlock $width="55%" $height="1rem" />
									<LoadingBlock $width="100%" $height="2.65rem" />
								</ProductDetails>
							</ProductCard>
						))}
					</ProductGrid>
				</section>
			</CatalogSection>
		</PageContent>
	);
}
