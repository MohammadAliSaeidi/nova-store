"use client";

import { useCallback } from "react";
import { isCatalogSort, type CatalogSort } from "@/utils/catalog";
import {
	useUrlQueryParams,
	type QueryHistoryMode,
} from "@/hooks/use-url-query-params";

function parsePage(value: string | null): number {
	if (!value || !/^\d+$/.test(value)) return 1;
	const page = Number(value);
	return Number.isSafeInteger(page) && page > 0 ? page : 1;
}

export function useCatalogControls() {
	const { searchParams, updateQueryParams } = useUrlQueryParams();

	const search = searchParams.get("q") ?? "";
	const category = searchParams.get("category") || null;
	const sortValue = searchParams.get("sort");
	const sort: CatalogSort = isCatalogSort(sortValue) ? sortValue : "featured";
	const page = parsePage(searchParams.get("page"));

	const setSearch = useCallback(
		(value: string) => {
			updateQueryParams({ q: value, page: null }, "replace");
		},
		[updateQueryParams],
	);
	const setSelectedCategory = useCallback(
		(value: string | null) =>
			updateQueryParams({ category: value, page: null }, "push"),
		[updateQueryParams],
	);
	const setSort = useCallback(
		(value: CatalogSort) => {
			updateQueryParams(
				{ sort: value === "featured" ? null : value, page: null },
				"push",
			);
		},
		[updateQueryParams],
	);
	const updatePage = useCallback(
		(value: number, mode: QueryHistoryMode) => {
			const nextPage = Number.isFinite(value)
				? Math.max(1, Math.trunc(value))
				: 1;
			updateQueryParams({ page: nextPage === 1 ? null : nextPage }, mode);
		},
		[updateQueryParams],
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
