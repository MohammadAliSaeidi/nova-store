"use client";

import { getCategories } from "@/requests/get-categories";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const CATEGORY_KEYS = ["catalog", "categories"] as const;

export const categoriesQueryOptions = queryOptions({
	queryKey: CATEGORY_KEYS,
	queryFn: getCategories,
	staleTime: 60_000,
});

export function useCategories() {
	return useQuery({ ...categoriesQueryOptions });
}
