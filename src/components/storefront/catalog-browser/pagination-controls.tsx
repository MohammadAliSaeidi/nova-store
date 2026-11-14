import { useTranslations } from "next-intl";
import { useDirection } from "@/hooks/use-direction";
import {
	PageButton,
	Pagination,
	VisuallyHidden,
} from "../storefront.styles";

export function PaginationControls({
	currentPage,
	pageCount,
	locale,
	onPageChange,
}: Readonly<{
	currentPage: number;
	pageCount: number;
	locale: string;
	onPageChange: (page: number) => void;
}>) {
	const t = useTranslations("catalog");
	const direction = useDirection();
	const numberFormat = (value: number) =>
		new Intl.NumberFormat(locale).format(value);

	return (
		<Pagination aria-label={t("paginationLabel")}>
			<PageButton
				type="button"
				disabled={currentPage === 1}
				aria-label={t("previousPage")}
				onClick={() => onPageChange(currentPage - 1)}
			>
				{direction === "rtl" ? "›" : "‹"}
			</PageButton>
			{Array.from({ length: pageCount }, (_, index) => index + 1).map(
				(pageNumber) => (
					<PageButton
						key={pageNumber}
						type="button"
						$active={pageNumber === currentPage}
						aria-current={pageNumber === currentPage ? "page" : undefined}
						onClick={() => onPageChange(pageNumber)}
					>
						{numberFormat(pageNumber)}
					</PageButton>
				),
			)}
			<PageButton
				type="button"
				disabled={currentPage === pageCount}
				aria-label={t("nextPage")}
				onClick={() => onPageChange(currentPage + 1)}
			>
				{direction === "rtl" ? "‹" : "›"}
			</PageButton>
			<VisuallyHidden aria-live="polite">
				{t("pageSummary", {
					current: numberFormat(currentPage),
					total: numberFormat(pageCount),
				})}
			</VisuallyHidden>
		</Pagination>
	);
}
