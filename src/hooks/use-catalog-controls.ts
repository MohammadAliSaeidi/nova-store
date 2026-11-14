"use client";

import {
	useSearchParam,
	type QueryHistoryMode,
} from "@/hooks/use-search-param";
import { isCatalogSort, type CatalogSort } from "@/utils/catalog";
import { useCallback } from "react";

function parsePage(value: string | null): number {
	if (!value || !/^\d+$/.test(value)) return 1;
	const page = Number(value);
	return Number.isSafeInteger(page) && page > 0 ? page : 1;
}

export function useCatalogControls() {
	const { value: search, updateQueryParams: updateSearchQueryParams } =
		useSearchParam("q");

	const categoryParam = useSearchParam("category");
	const category = categoryParam.value || null;

	const { value: sortValue, updateQueryParams: updateSortQueryParams } =
		useSearchParam("sort");

	const { value: pageValue, updateQueryParams: updatePageQueryParams } =
		useSearchParam("page");

	const sort: CatalogSort = isCatalogSort(sortValue)
		? sortValue
		: "featured";

	const page = parsePage(pageValue);

	const setSearch = useCallback(
		(value: string) => {
			updateSearchQueryParams({ q: value, page: null }, "replace");
		},
		[updateSearchQueryParams],
	);

	const setSelectedCategory = useCallback(
		(value: string | null) =>
			categoryParam.updateQueryParams(
				{ category: value, page: null },
				"push",
			),
		[categoryParam],
	);

	const setSort = useCallback(
		(value: CatalogSort) => {
			updateSortQueryParams(
				{ sort: value === "featured" ? null : value, page: null },
				"push",
			);
		},
		[updateSortQueryParams],
	);

	const updatePage = useCallback(
		(value: number, mode: QueryHistoryMode) => {
			const nextPage = Number.isFinite(value)
				? Math.max(1, Math.trunc(value))
				: 1;
			updatePageQueryParams(
				{ page: nextPage === 1 ? null : nextPage },
				mode,
			);
		},
		[updatePageQueryParams],
	);
	const setPage = useCallback(
		(value: number) => updatePage(value, "push"),
		[updatePage],
	);
	const normalizePage = useCallback(
		(value: number) => updatePage(value, "replace"),
		[updatePage],
	);

	return {
		search,
		selectedCategory: category,
		sort,
		page,
		setSearch,
		setSelectedCategory,
		setSort,
		setPage,
		normalizePage,
	};
}
