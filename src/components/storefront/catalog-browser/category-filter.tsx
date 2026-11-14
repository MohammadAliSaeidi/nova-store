import { useTranslations } from "next-intl";
import {
	CategoryChip,
	CategoryChips,
	HeadingAccent,
	SectionHeading,
	StatusPanel,
} from "../storefront.styles";
import { RequestError } from "./request-error";

type Props = Readonly<{
	categories: readonly string[];
	selectedCategory: string | null;
	status: "loading" | "error" | "ready";
	onSelect: (category: string | null) => void;
	onRetry: () => void;
}>;

export function CategoryFilter({
	categories,
	selectedCategory,
	status,
	onSelect,
	onRetry,
}: Props) {
	const t = useTranslations("catalog");

	return (
		<section id="categories" aria-labelledby="catalog-categories-title">
			<SectionHeading id="catalog-categories-title">
				{t("categoriesHeading")}
			</SectionHeading>
			<HeadingAccent aria-hidden="true" />
			{status === "error" && (
				<RequestError
					message={t("categoriesError")}
					onRetry={onRetry}
				/>
			)}
			{status === "loading" && (
				<StatusPanel role="status" aria-live="polite">
					{t("loadingCategories")}
				</StatusPanel>
			)}
			<CategoryChips role="group" aria-label={t("categoriesHeading")}>
				<CategoryChip
					type="button"
					$active={selectedCategory === null}
					aria-pressed={selectedCategory === null}
					onClick={() => onSelect(null)}
				>
					{t("allCategories")}
				</CategoryChip>
				{categories.map((category) => (
					<CategoryChip
						key={category}
						type="button"
						$active={selectedCategory === category}
						aria-pressed={selectedCategory === category}
						onClick={() => onSelect(category)}
					>
						{category}
					</CategoryChip>
				))}
			</CategoryChips>
		</section>
	);
}
