"use client";

import { useEffect, useRef, useState } from "react";
import { useCatalogControls } from "@/hooks/use-catalog-controls";
import { useDebounce } from "@/hooks/use-debounce";
import { useTranslations } from "next-intl";
import { HeaderSearch, SearchInput, VisuallyHidden } from "../storefront.styles";

export function HeaderSearchControl() {
	const t = useTranslations("catalog");
	const { search, setSearch } = useCatalogControls();
	const [searchDraft, setSearchDraft] = useState(search);
	const debouncedSearch = useDebounce(searchDraft);
	const previousSearch = useRef(search);

	useEffect(() => {
		if (previousSearch.current !== search) {
			previousSearch.current = search;
			setSearchDraft(search);
			return;
		}

		if (debouncedSearch === searchDraft && debouncedSearch !== search) {
			setSearch(debouncedSearch ?? "");
		}
	}, [debouncedSearch, search, searchDraft, setSearch]);

	return (
		<HeaderSearch>
			<VisuallyHidden>{t("searchLabel")}</VisuallyHidden>
			<SearchInput
				type="search"
				dir="auto"
				value={searchDraft ?? ""}
				placeholder={t("searchPlaceholder")}
				aria-label={t("searchLabel")}
				onChange={(event) => setSearchDraft(event.currentTarget.value)}
			/>
		</HeaderSearch>
	);
}
