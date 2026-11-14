"use client";

import type { Product } from "@/types/product";
import type { CatalogSort } from "@/utils/catalog";
import { useLocale, useTranslations } from "next-intl";
import {
	CatalogTopline,
	HeadingAccent,
	ResultCount,
	SectionHeading,
	StatusPanel,
} from "../storefront.styles";
import { CatalogSortControl } from "./catalog-sort-control";
import { PaginationControls } from "./pagination-controls";
import ProductGrid from "./product-grid";
import { RequestError } from "./request-error";

type Props = Readonly<{
	status: "error" | "loading" | "ready";
	totalProducts: number;
	visibleProducts: number;
	pageItems: readonly Product[];
	sort: CatalogSort;
	currentPage: number;
	pageCount: number;
	isCartHydrated: boolean;
	onSortChange: (sort: CatalogSort) => void;
	onRetry: () => void;
	onAddToCart: (productId: number) => void;
	onPageChange: (page: number) => void;
}>;

export function ProductResults(props: Props) {
	const {
		status,
		totalProducts,
		visibleProducts,
		pageItems,
		sort,
		currentPage,
		pageCount,
		isCartHydrated,
		onSortChange,
		onRetry,
		onAddToCart,
		onPageChange,
	} = props;
	const t = useTranslations("catalog");
	const locale = useLocale();

	const emptyMessage =
		status === "ready" && visibleProducts === 0
			? totalProducts === 0
				? t("emptyCatalog")
				: t("emptyResults")
			: null;

	return (
		<div id="products">
			<CatalogTopline>
				<div>
					<SectionHeading id="catalog-section-title">
						{t("productsHeading")}
					</SectionHeading>
					<HeadingAccent aria-hidden="true" />
				</div>
				{status === "ready" && (
					<ResultCount>
						{t("productCount", { count: visibleProducts })}
					</ResultCount>
				)}
			</CatalogTopline>

			<CatalogSortControl sort={sort} onChange={onSortChange} />

			{status === "error" && (
				<RequestError
					message={t("productsError")}
					onRetry={onRetry}
				/>
			)}
			{status === "loading" && (
				<StatusPanel role="status" aria-live="polite">
					{t("loadingProducts")}
				</StatusPanel>
			)}
			{emptyMessage && (
				<StatusPanel role="status" aria-live="polite">
					{emptyMessage}
				</StatusPanel>
			)}
			{pageItems.length > 0 && (
				<ProductGrid
					products={pageItems}
					isCartHydrated={isCartHydrated}
					onAddToCart={onAddToCart}
				/>
			)}
			{pageCount > 1 && (
				<PaginationControls
					currentPage={currentPage}
					pageCount={pageCount}
					locale={locale}
					onPageChange={onPageChange}
				/>
			)}
		</div>
	);
}
