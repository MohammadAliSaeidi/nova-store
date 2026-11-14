"use client";

import { useCatalogControls } from "@/hooks/use-catalog-controls";
import { usePagination } from "@/hooks/use-pagination";
import { useCategories } from "@/hooks/use-categories";
import { useCartStore } from "@/storage/cart-store";
import { filterAndSortProducts } from "@/utils/catalog";
import { useLocale, useTranslations } from "next-intl";
import { useMemo } from "react";
import {
	CatalogSection,
	CatalogTopline,
	HeadingAccent,
	ResultCount,
	SectionHeading,
	StatusPanel,
} from "../storefront.styles";
import { CatalogSortControl } from "./catalog-sort-control";
import { CategoryFilter } from "./category-filter";
import { PaginationControls } from "./pagination-controls";
import ProductGrid from "./product-grid";
import { RequestError } from "./request-error";
import { useProducts } from "@/hooks/use-products";

type InitialFailures = Readonly<{ products: boolean; categories: boolean }>;
type Props = Readonly<{ initialFailures: InitialFailures }>;
type Status = "error" | "loading" | "ready";

const CATALOG_PAGE_SIZE = 6;
const EMPTY: readonly never[] = [];

type QueryLike = { isError: boolean; data: unknown };

function getStatus(query: QueryLike, initialFailed: boolean): Status {
	if (query.data !== undefined) return "ready";

	if (query.isError || initialFailed) return "error";

	return "loading";
}

export function CatalogBrowser({ initialFailures }: Props) {
	const t = useTranslations("catalog");
	const locale = useLocale();
	const productsQuery = useProducts();
	const categoriesQuery = useCategories();
	const {
		search,
		selectedCategory,
		setSelectedCategory,
		sort,
		setSort,
		page,
		setPage,
		normalizePage,
	} = useCatalogControls();
	const addItem = useCartStore((s) => s.addItem);
	const isCartHydrated = useCartStore((s) => s.isHydrated);

	const productsStatus = getStatus(productsQuery, initialFailures.products);
	const categoryStatus = getStatus(
		categoriesQuery,
		initialFailures.categories,
	);

	const products = productsQuery.data ?? EMPTY;
	const visibleProducts = useMemo(
		() =>
			filterAndSortProducts(products, {
				search,
				category: selectedCategory,
				sort,
				locale,
			}),
		[products, search, selectedCategory, sort, locale],
	);
	const { currentPage, pageCount, pageItems } = usePagination(
		visibleProducts,
		page,
		CATALOG_PAGE_SIZE,
		normalizePage,
	);

	const emptyMessage =
		productsStatus === "ready" && visibleProducts.length === 0
			? products.length === 0
				? t("emptyCatalog")
				: t("emptyResults")
			: null;

	return (
		<CatalogSection
			id="catalog-content"
			aria-labelledby="catalog-section-title"
		>
			<CategoryFilter
				categories={categoriesQuery.data ?? EMPTY}
				selectedCategory={selectedCategory}
				status={categoryStatus}
				onSelect={setSelectedCategory}
				onRetry={() => void categoriesQuery.refetch()}
			/>

			<div id="products">
				<CatalogTopline>
					<div>
						<SectionHeading id="catalog-section-title">
							{t("productsHeading")}
						</SectionHeading>
						<HeadingAccent aria-hidden="true" />
					</div>
					{productsStatus === "ready" && (
						<ResultCount>
							{t("productCount", {
								count: visibleProducts.length,
							})}
						</ResultCount>
					)}
				</CatalogTopline>

				<CatalogSortControl sort={sort} onChange={setSort} />

				{productsStatus === "error" && (
					<RequestError
						message={t("productsError")}
						onRetry={() => void productsQuery.refetch()}
					/>
				)}
				{productsStatus === "loading" && (
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
						onAddToCart={addItem}
					/>
				)}
				{pageCount > 1 && (
					<PaginationControls
						currentPage={currentPage}
						pageCount={pageCount}
						locale={locale}
						onPageChange={setPage}
					/>
				)}
			</div>
		</CatalogSection>
	);
}
