"use client";

import { useCatalogControls } from "@/hooks/use-catalog-controls";
import { useCategories } from "@/hooks/use-categories";
import { usePagination } from "@/hooks/use-pagination";
import { useProducts } from "@/hooks/use-products";
import { useCartStore } from "@/storage/cart-store";
import { filterAndSortProducts } from "@/utils/catalog";
import { useLocale, useTranslations } from "next-intl";
import { useMemo } from "react";
import { CatalogSection } from "../storefront.styles";
import { CategoryFilter } from "./category-filter";
import { ProductResults } from "./product-results";

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
				search: search ?? "",
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

			<ProductResults
				status={productsStatus}
				totalProducts={products.length}
				visibleProducts={visibleProducts.length}
				pageItems={pageItems}
				sort={sort}
				currentPage={currentPage}
				pageCount={pageCount}
				isCartHydrated={isCartHydrated}
				onSortChange={setSort}
				onRetry={() => void productsQuery.refetch()}
				onAddToCart={addItem}
				onPageChange={setPage}
			/>
		</CatalogSection>
	);
}
