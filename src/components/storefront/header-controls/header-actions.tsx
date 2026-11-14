"use client";

import { HeaderActions as Actions } from "../storefront.styles";
import { CartControl } from "./cart-control";
import { LocaleControl } from "./locale-control";
import { ThemeControl } from "./theme-control";

export function HeaderActions() {
	return (
		<Actions>
			<ThemeControl />
			<LocaleControl />
			<CartControl />
		</Actions>
	);
}
