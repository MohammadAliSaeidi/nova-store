import { useTranslations } from "next-intl";
import {
	BagMark,
	FooterBottom,
	FooterBrand,
	FooterColumn,
	FooterGrid,
	FooterInner,
	FooterRoot,
	SocialMarks,
} from "./storefront.styles";

export function StoreFooter() {
	const t = useTranslations("catalog");

	return (
		<FooterRoot>
			<FooterInner>
				<FooterGrid>
					<FooterColumn>
						<h2>{t("footerAboutHeading")}</h2>
						<FooterBrand>
							<span>NOVA</span>
							<BagMark aria-hidden="true" />
						</FooterBrand>
						<p>{t("footerAbout")}</p>
					</FooterColumn>
					<FooterColumn>
						<h2>{t("footerLinksHeading")}</h2>
						<a href="#top">{t("footerHome")}</a>
						<a href="#products">{t("footerProducts")}</a>
						<a href="#categories">{t("footerCategories")}</a>
					</FooterColumn>
					<FooterColumn>
						<h2>{t("footerHelpHeading")}</h2>
						<a href="#top">{t("footerHelp")}</a>
						<a href="#top">{t("footerContact")}</a>
					</FooterColumn>
					<FooterColumn>
						<h2>{t("socialLinksLabel")}</h2>
						<SocialMarks role="group" aria-label={t("socialLinksLabel")}>
							<span aria-hidden="true">ig</span>
							<span aria-hidden="true">in</span>
							<span aria-hidden="true">x</span>
						</SocialMarks>
					</FooterColumn>
				</FooterGrid>
				<FooterBottom>
					<span>{t("copyright")}</span>
				</FooterBottom>
			</FooterInner>
		</FooterRoot>
	);
}
