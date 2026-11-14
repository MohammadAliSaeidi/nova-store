"use client";

import { useCallback } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export type QueryParamValue = string | number | null | undefined;
export type QueryParamUpdates = Readonly<Record<string, QueryParamValue>>;
export type QueryHistoryMode = "push" | "replace";

export function useUrlQueryParams() {
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const updateQueryParams = useCallback(
		(updates: QueryParamUpdates, mode: QueryHistoryMode = "push") => {
			const params = new URLSearchParams(window.location.search);

			for (const [key, value] of Object.entries(updates)) {
				if (value === null || value === undefined || value === "") {
					params.delete(key);
				} else {
					params.set(key, String(value));
				}
			}

			const query = params.toString();
			const href = `${pathname}${query ? `?${query}` : ""}${window.location.hash}`;
			const currentHref = `${window.location.pathname}${window.location.search}${window.location.hash}`;
			if (href === currentHref) return;

			window.history[mode === "push" ? "pushState" : "replaceState"](
				null,
				"",
				href,
			);
		},
		[pathname],
	);

	return { searchParams, updateQueryParams };
}
