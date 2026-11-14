import { useTranslations } from "next-intl";
import { CATALOG_SORTS, isCatalogSort, type CatalogSort } from "@/utils/catalog";
import { CatalogControls, SortSelect, VisuallyHidden } from "../storefront.styles";

const SORT_LABELS: Record<
	CatalogSort,
	"sortFeatured" | "sortTitleAsc" | "sortPriceAsc" | "sortPriceDesc"
> = {
	featured: "sortFeatured",
	"title-asc": "sortTitleAsc",
	"price-asc": "sortPriceAsc",
	"price-desc": "sortPriceDesc",
};

export function CatalogSortControl({
	sort,
	onChange,
}: Readonly<{
	sort: CatalogSort;
	onChange: (sort: CatalogSort) => void;
}>) {
	const t = useTranslations("catalog");

	return (
		<CatalogControls>
			<label>
				<VisuallyHidden>{t("sortLabel")}</VisuallyHidden>
				<SortSelect
					value={sort}
					aria-label={t("sortLabel")}
					onChange={(event) => {
						const value = event.currentTarget.value;
						if (isCatalogSort(value)) onChange(value);
					}}
				>
					{CATALOG_SORTS.map((option) => (
						<option key={option} value={option}>
							{t(SORT_LABELS[option])}
						</option>
					))}
				</SortSelect>
			</label>
		</CatalogControls>
	);
}
