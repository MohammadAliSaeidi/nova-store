"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
	HeaderNavigation as Navigation,
	MenuButton,
	NavigationLink,
} from "../storefront.styles";

function MenuIcon({ open }: Readonly<{ open: boolean }>) {
	return (
		<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
			{open ? (
				<path
					d="m6 6 12 12M18 6 6 18"
					stroke="currentColor"
					strokeWidth="2"
				/>
			) : (
				<path
					d="M4 7h16M4 12h16M4 17h16"
					stroke="currentColor"
					strokeWidth="2"
				/>
			)}
		</svg>
	);
}

export function HeaderNavigation() {
	const locale = useLocale();
	const t = useTranslations("catalog");
	const [menuOpen, setMenuOpen] = useState(false);
	const closeMenu = () => setMenuOpen(false);

	return (
		<>
			<MenuButton
				type="button"
				aria-label={menuOpen ? t("closeMenu") : t("openMenu")}
				aria-controls="store-navigation"
				aria-expanded={menuOpen}
				onClick={() => setMenuOpen((open) => !open)}
			>
				<MenuIcon open={menuOpen} />
			</MenuButton>
			<Navigation
				id="store-navigation"
				aria-label={t("primaryNavigation")}
				$open={menuOpen}
			>
				<NavigationLink href={`/${locale}`} onClick={closeMenu}>
					{t("home")}
				</NavigationLink>
				<NavigationLink href="#categories" onClick={closeMenu}>
					{t("categoriesLink")}
				</NavigationLink>
				<NavigationLink href="#products" onClick={closeMenu}>
					{t("productsLink")}
				</NavigationLink>
			</Navigation>
		</>
	);
}
