"use client";

import { useState, type ReactNode } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";

export function StyledComponentsRegistry(
	props: Readonly<{ children: ReactNode }>,
) {
	const { children } = props;
	const [sheet] = useState(() => new ServerStyleSheet());

	useServerInsertedHTML(() => {
		const styles = sheet.getStyleElement();
		sheet.instance.clearTag();
		return <>{styles}</>;
	});

	if (typeof window !== "undefined") return <>{children}</>;

	return (
		<StyleSheetManager sheet={sheet.instance}>
			{children}
		</StyleSheetManager>
	);
}
