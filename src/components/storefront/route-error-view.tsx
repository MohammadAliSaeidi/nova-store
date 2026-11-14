import Link from "next/link";
import type { ReactNode } from "react";
import styled from "styled-components";

const ErrorView = styled.main`
	min-height: 65dvh;
	width: min(100% - 2rem, 48rem);
	margin-inline: auto;
	display: grid;
	place-content: center;
	justify-items: center;
	padding-block: 3rem;
	text-align: center;
	color: var(--nova-text);

	strong {
		color: var(--nova-accent);
		font-size: clamp(3rem, 12vw, 6rem);
		line-height: 1;
	}

	h1 {
		margin: 1rem 0 0;
		color: var(--nova-primary);
	}

	p {
		max-width: 44ch;
		margin: 0.75rem 0 1.5rem;
		line-height: 1.8;
	}

	a,
	button {
		min-height: 2.75rem;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0.65rem 1.1rem;
		border: 0;
		border-radius: 999px;
		background: var(--nova-accent);
		color: var(--nova-accent-foreground);
		font: inherit;
		font-weight: 700;
		text-decoration: none;
		cursor: pointer;
	}

	button:focus-visible,
	a:focus-visible {
		outline: 3px solid var(--nova-primary);
		outline-offset: 3px;
	}
`;

type Props = {
	code: "404" | "500";
	title: string;
	description: string;
	linkLabel: string;
	href: string;
	children?: ReactNode;
};

export function RouteErrorView({
	code,
	title,
	description,
	linkLabel,
	href,
	children,
}: Props) {
	return (
		<ErrorView>
			<strong aria-hidden="true">{code}</strong>
			<h1>{title}</h1>asdasd
			<p>{description}</p>
			{children}
			<Link href={href}>{linkLabel}</Link>
		</ErrorView>
	);
}
