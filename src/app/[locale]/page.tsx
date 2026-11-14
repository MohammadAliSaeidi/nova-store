import { CatalogBrowser } from "@/components/storefront/catalog-browser";
import { CatalogLoadingFallback } from "@/components/storefront/catalog-loading-fallback";
import { HeroBanner } from "@/components/storefront/hero-banner";
import { StoreFooter } from "@/components/storefront/store-footer";
import { StoreHeader } from "@/components/storefront/store-header";
import {
	PageContent,
	StorefrontShell,
} from "@/components/storefront/storefront.styles";
import { categoriesQueryOptions } from "@/hooks/use-categories";
import { productsQueryOptions } from "@/hooks/use-products";
import { getQueryClient } from "@/shared/providers/query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";

type Props = { params: Promise<{ locale: "fa" | "en" }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "seo" });
	const canonical = `/${locale}`;

	return {
		title: t("homeTitle"),
		description: t("homeDescription"),
		alternates: {
			canonical,
			languages: { fa: "/fa", en: "/en" },
		},
		openGraph: {
			type: "website",
			locale: locale === "fa" ? "fa_IR" : "en_US",
			title: t("homeTitle"),
			description: t("homeDescription"),
			url: canonical,
			siteName: "NOVA Store",
		},
	};
}

async function CatalogServerContent() {
	const queryClient = getQueryClient();

	const [productsResult, categoriesResult] = await Promise.allSettled([
		queryClient.query({ ...productsQueryOptions }),
		queryClient.query({ ...categoriesQueryOptions }),
	]);

	const products =
		productsResult.status === "fulfilled" ? productsResult.value : [];

	const initialFailures = {
		products: productsResult.status === "rejected",
		categories: categoriesResult.status === "rejected",
	};

	return (
		<PageContent>
			<HeroBanner products={products} />
			<HydrationBoundary state={dehydrate(queryClient)}>
				<CatalogBrowser initialFailures={initialFailures} />
			</HydrationBoundary>
		</PageContent>
	);
}

export default async function HomePage() {
	return (
		<StorefrontShell>
			<StoreHeader />
			<Suspense fallback={<CatalogLoadingFallback />}>
				<CatalogServerContent />
			</Suspense>
			<StoreFooter />
		</StorefrontShell>
	);
}
