"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useTheme } from "@/context/theme-context";
import { useCatalogControls } from "@/hooks/use-catalog-controls";
import { useDebounce } from "@/hooks/use-debounce";
import { writeLocaleCookie, type Locale } from "@/i18n/config";
import { getCartQuantity, useCartStore } from "@/storage/cart-store";
import {
	CartCount,
	CartStatus,
	HeaderActions,
	HeaderControlArea,
	HeaderNavigation,
	HeaderSearch,
	LanguageLink,
	MenuButton,
	NavigationLink,
	SearchInput,
	ThemeToggle,
	VisuallyHidden,
} from "./storefront.styles";

function MenuIcon({ open }: Readonly<{ open: boolean }>) {
	return (
		<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
			{open ? (
				<path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" />
			) : (
				<path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" />
			)}
		</svg>
	);
}

function BagIcon() {
	return (
		<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
			<path
				d="M5 8.5h14l1 12H4l1-12Z"
				stroke="currentColor"
				strokeWidth="1.8"
				strokeLinejoin="round"
			/>
			<path
				d="M9 9V6a3 3 0 0 1 6 0v3"
				stroke="currentColor"
				strokeWidth="1.8"
				strokeLinecap="round"
			/>
		</svg>
	);
}

function ThemeIcon({ dark }: Readonly<{ dark: boolean }>) {
	return dark ? (
		<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
			<circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
			<path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
		</svg>
	) : (
		<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
			<path d="M20.2 15.4A8.5 8.5 0 0 1 8.6 3.8 8.5 8.5 0 1 0 20.2 15.4Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
		</svg>
	);
}

export function HeaderControls() {
	const t = useTranslations("catalog");
	const cartT = useTranslations("cart");
	const locale = useLocale();
	const { mode, setMode } = useTheme();
	const { search, setSearch } = useCatalogControls();
	const [searchDraft, setSearchDraft] = useState(search);
	const debouncedSearch = useDebounce(searchDraft);
	const previousSearch = useRef(search);
	const [menuOpen, setMenuOpen] = useState(false);
	const cartItems = useCartStore((state) => state.items);
	const cartHydrated = useCartStore((state) => state.isHydrated);
	const cartQuantity = getCartQuantity(cartItems);
	const nextLocale: Locale = locale === "fa" ? "en" : "fa";
	const nextTheme = mode === "light" ? "dark" : "light";

	useEffect(() => {
		if (locale === "fa" || locale === "en") writeLocaleCookie(locale);
	}, [locale]);

	useEffect(() => {
		if (previousSearch.current !== search) {
			previousSearch.current = search;
			setSearchDraft(search);
			return;
		}

		if (debouncedSearch === searchDraft && debouncedSearch !== search) {
			setSearch(debouncedSearch);
		}
	}, [debouncedSearch, search, searchDraft, setSearch]);

	useEffect(() => {
		let active = true;
		void Promise.resolve(useCartStore.persist.rehydrate())
			.catch(() => undefined)
			.finally(() => {
				if (active) useCartStore.setState({ isHydrated: true });
			});
		return () => {
			active = false;
		};
	}, []);

	return (
		<HeaderControlArea>
			<MenuButton
				type="button"
				aria-label={menuOpen ? t("closeMenu") : t("openMenu")}
				aria-controls="store-navigation"
				aria-expanded={menuOpen}
				onClick={() => setMenuOpen((open) => !open)}
			>
				<MenuIcon open={menuOpen} />
			</MenuButton>
			<HeaderNavigation
				id="store-navigation"
				aria-label={t("primaryNavigation")}
				$open={menuOpen}
			>
				<NavigationLink href={`/${locale}`} onClick={() => setMenuOpen(false)}>
					{t("home")}
				</NavigationLink>
				<NavigationLink href="#categories" onClick={() => setMenuOpen(false)}>
					{t("categoriesLink")}
				</NavigationLink>
				<NavigationLink href="#products" onClick={() => setMenuOpen(false)}>
					{t("productsLink")}
				</NavigationLink>
			</HeaderNavigation>
			<HeaderSearch>
				<VisuallyHidden>{t("searchLabel")}</VisuallyHidden>
				<SearchInput
					type="search"
					dir="auto"
					value={searchDraft}
					placeholder={t("searchPlaceholder")}
					aria-label={t("searchLabel")}
					onChange={(event) => setSearchDraft(event.currentTarget.value)}
				/>
			</HeaderSearch>
			<HeaderActions>
				<ThemeToggle
					type="button"
					aria-label={t(nextTheme === "dark" ? "switchToDark" : "switchToLight")}
					title={t(nextTheme === "dark" ? "switchToDark" : "switchToLight")}
					onClick={() => setMode(nextTheme)}
				>
					<ThemeIcon dark={mode === "dark"} />
				</ThemeToggle>
				<LanguageLink
					href={`/${nextLocale}`}
					lang={nextLocale}
					aria-label={t("switchLanguageLabel")}
					onClick={() => writeLocaleCookie(nextLocale)}
				>
					{t("switchLanguage")}
				</LanguageLink>
				<Link
					href={`/${locale}/cart`}
					aria-label={cartT("badgeLabel", {
						count: new Intl.NumberFormat(locale).format(cartQuantity),
					})}
				>
				<CartStatus
					role="status"
					aria-live="polite"
				>
					<BagIcon />
					{cartHydrated && cartQuantity > 0 ? <CartCount aria-hidden="true">
						{new Intl.NumberFormat(locale).format(cartQuantity)}
					</CartCount> : null}
				</CartStatus>
				</Link>
			</HeaderActions>
		</HeaderControlArea>
	);
}
