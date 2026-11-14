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
import { Suspense } from "react";

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
