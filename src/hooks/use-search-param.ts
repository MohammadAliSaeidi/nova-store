"use client";

import { useCallback } from "react";
import {
	useUrlQueryParams,
	type QueryHistoryMode,
	type QueryParamUpdates,
} from "@/hooks/use-url-query-params";

export type { QueryHistoryMode } from "@/hooks/use-url-query-params";

type Options = Readonly<{ method?: QueryHistoryMode }>;

/** Convenience hook for one query value, backed by the shared URL patcher. */
export function useSearchParam(key: string, options: Options = {}) {
	const { method = "push" } = options;
	const { searchParams, updateQueryParams: patchQueryParams } =
		useUrlQueryParams();
	const value = searchParams.get(key);

	const updateQueryParams = useCallback(
		(updates: QueryParamUpdates, updateMethod: QueryHistoryMode = method) =>
			patchQueryParams(updates, updateMethod),
		[method, patchQueryParams],
	);
	const updateParam = useCallback(
		(newValue: string, updateMethod: QueryHistoryMode = method) =>
			updateQueryParams({ [key]: newValue }, updateMethod),
		[key, method, updateQueryParams],
	);
	const deleteParam = useCallback(
		(updateMethod: QueryHistoryMode = method) =>
			updateQueryParams({ [key]: null }, updateMethod),
		[key, method, updateQueryParams],
	);

	return { value, updateParam, deleteParam, updateQueryParams };
}
