"use client";

import { HeaderControlArea } from "../storefront.styles";
import { HeaderActions } from "./header-actions";
import { HeaderNavigation } from "./header-navigation";
import { HeaderSearchControl } from "./header-search-control";

export default function HeaderControls() {
	return (
		<HeaderControlArea>
			<HeaderNavigation />
			<HeaderSearchControl />
			<HeaderActions />
		</HeaderControlArea>
	);
}
