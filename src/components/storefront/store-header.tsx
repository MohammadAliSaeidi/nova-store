import { useLocale } from "next-intl";
import { Suspense } from "react";
import HeaderControls from "./header-controls/header-controls";
import {
	BagMark,
	BrandLink,
	HeaderControlArea,
	HeaderInner,
	HeaderRoot,
	HeaderSearch,
	SearchInput,
} from "./storefront.styles";

function HeaderControlsFallback() {
	return (
		<HeaderControlArea aria-hidden="true">
			<HeaderSearch>
				<SearchInput
					type="search"
					value=""
					disabled
					readOnly
					tabIndex={-1}
				/>
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
