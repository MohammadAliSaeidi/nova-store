import { Suspense } from "react";
import { useLocale } from "next-intl";
import {
	HeaderControlArea,
	HeaderInner,
	HeaderRoot,
	HeaderSearch,
	BagMark,
	BrandLink,
	SearchInput,
} from "./storefront.styles";
import { HeaderControls } from "./header-controls";

function HeaderControlsFallback() {
	return (
		<HeaderControlArea aria-hidden="true">
			<HeaderSearch>
				<SearchInput type="search" value="" disabled readOnly tabIndex={-1} />
			</HeaderSearch>
		</HeaderControlArea>
	);
}

export function StoreHeader() {
	const locale = useLocale();

	return (
		<HeaderRoot id="top">
			<HeaderInner>
				<BrandLink href={`/${locale}`} aria-label="NOVA">
					<span>NOVA</span>
					<BagMark aria-hidden="true" />
				</BrandLink>
				<Suspense fallback={<HeaderControlsFallback />}>
					<HeaderControls />
				</Suspense>
			</HeaderInner>
		</HeaderRoot>
	);
}
