"use client";

import { clampPage, getPageCount, paginateItems } from "@/utils/pagination";
import { useEffect, useMemo } from "react";

export function usePagination<T>(
	items: readonly T[],
	page: number,
	pageSize: number,
	onPageChange: (page: number) => void,
) {
	const pageCount = getPageCount(items.length, pageSize);
	const currentPage = clampPage(page, pageCount);
	const pageItems = useMemo(
		() => paginateItems(items, currentPage, pageSize),
		[items, currentPage, pageSize],
	);

	useEffect(() => {
		if (page !== currentPage) onPageChange(currentPage);
	}, [currentPage, onPageChange, page]);

	return { currentPage, pageCount, pageItems };
}
