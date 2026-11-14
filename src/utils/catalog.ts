import type { Product } from "@/types/product";

export const CATALOG_SORTS = [
	"featured",
	"title-asc",
	"price-asc",
	"price-desc",
] as const;

export type CatalogSort = (typeof CATALOG_SORTS)[number];

export function isCatalogSort(value: string | null): value is CatalogSort {
	return value !== null && CATALOG_SORTS.some((sort) => sort === value);
}

export type CatalogFilters = {
	search: string;
	category: string | null;
	sort: CatalogSort;
	locale: string;
};

export function filterAndSortProducts(
	products: readonly Product[],
	filters: CatalogFilters,
): Product[] {
	const normalizedSearch = filters.search.trim().toLowerCase();

	const filtered = products.filter((product) => {
		const matchesSearch = product.title
			.toLowerCase()
			.includes(normalizedSearch);

		const matchesCategory =
			filters.category === null ||
			product.category === filters.category;

		return matchesSearch && matchesCategory;
	});

	const sorted = [...filtered];

	switch (filters.sort) {
		case "title-asc":
			sorted.sort((left, right) =>
				left.title.localeCompare(right.title, filters.locale, {
					sensitivity: "base",
				}),
			);
			break;

		case "price-asc":
			sorted.sort((left, right) => left.price - right.price);
			break;

		case "price-desc":
			sorted.sort((left, right) => right.price - left.price);
			break;
	}

	return sorted;
}
