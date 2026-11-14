import styled from "styled-components";
import Link from "next/link";

export const CartMain = styled.main`
	width: min(100% - 2rem, 76rem);
	min-height: 50dvh;
	margin-inline: auto;
	padding-block: 1.5rem 4rem;

	@media (max-width: 840px) {
		width: min(100% - 1.25rem, 76rem);
		padding-block-start: 1rem;
	}
`;

export const CartTitle = styled.h1`
	margin: 0 0 1.5rem;
	color: var(--nova-primary);
	font-size: clamp(1.6rem, 4vw, 2.25rem);
`;

export const CartLayout = styled.div`
	display: grid;
	grid-template-columns: minmax(0, 1fr);
	align-items: start;
	gap: 1.25rem;

	@media (min-width: 900px) {
		grid-template-columns: minmax(0, 1fr) 19rem;
	}
`;

export const CartList = styled.ul`
	min-width: 0;
	display: grid;
	gap: 0.85rem;
	margin: 0;
	padding: 0;
	list-style: none;
`;

export const CartRow = styled.li`
	min-width: 0;
	display: grid;
	grid-template-columns: 4rem minmax(0, 1fr);
	gap: 0.65rem;
	padding: 0.7rem;
	border: 1px solid var(--nova-border);
	border-radius: 0.9rem;
	background: var(--nova-surface);

	@media (min-width: 600px) {
		grid-template-columns: 6rem minmax(0, 1fr) auto;
		align-items: center;
		gap: 1rem;
	}
`;

export const CartImageFrame = styled.div`
	position: relative;
	width: 4rem;
	height: 4rem;
	display: grid;
	place-items: center;
	padding: 0.35rem;
	border-radius: 0.65rem;
	background: var(--nova-background);
	overflow: hidden;

	img { width: 100%; height: 100%; object-fit: contain; }

	@media (min-width: 600px) { width: 6rem; height: 6rem; }
`;

export const CartProductInfo = styled.div`
	min-width: 0;
	display: grid;
	align-content: center;
	gap: 0.35rem;
`;

export const CartProductTitle = styled.h2`
	margin: 0;
	color: var(--nova-text);
	font-size: 1rem;
	line-height: 1.45;
	overflow-wrap: break-word;
`;

export const CartMuted = styled.p`
	margin: 0;
	color: var(--nova-muted-text);
	font-size: 0.85rem;
`;

export const CartControls = styled.div`
	grid-column: 1 / -1;
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 0.7rem;
	flex-wrap: wrap;

	@media (min-width: 600px) {
		grid-column: auto;
		justify-content: flex-end;
	}
`;

export const CartRowTotal = styled.p`
	margin: 0;
	color: var(--nova-primary);
	font-weight: 800;
	font-variant-numeric: tabular-nums;
`;

export const CartActionButton = styled.button`
	min-height: 2.75rem;
	padding-inline: 0.75rem;
	border: 1px solid var(--nova-border);
	border-radius: 0.65rem;
	background: transparent;
	color: var(--nova-text);
	cursor: pointer;

	&:hover { border-color: var(--nova-accent); color: var(--nova-accent); }
`;

export const CartSummaryPanel = styled.aside`
	position: sticky;
	inset-block-start: 1rem;
	padding: 1rem;
	border: 1px solid var(--nova-border);
	border-radius: 0.9rem;
	background: var(--nova-surface);
	color: var(--nova-text);
`;

export const CartSummaryTitle = styled.h2`
	margin: 0 0 0.8rem;
	font-size: 1.15rem;
`;

export const CartSummaryLine = styled.div`
	display: flex;
	justify-content: space-between;
	gap: 1rem;
	padding-block: 0.6rem;
	border-block-start: 1px solid var(--nova-border);
`;

export const CartTotal = styled.strong`
	color: var(--nova-primary);
	font-size: 1.05rem;
	font-variant-numeric: tabular-nums;
`;

export const CartStatePanel = styled.section`
	min-height: 14rem;
	display: grid;
	align-content: center;
	justify-items: start;
	gap: 0.7rem;
	padding: 1.25rem;
	border: 1px solid var(--nova-border);
	border-radius: 0.9rem;
	background: var(--nova-surface);
	color: var(--nova-text);

	h2, p { margin: 0; }
	 p { color: var(--nova-muted-text); line-height: 1.7; }
`;

export const CartBrowseLink = styled(Link)`
	min-height: 2.75rem;
	display: inline-flex;
	align-items: center;
	padding-inline: 1rem;
	border-radius: 0.7rem;
	background: var(--nova-accent);
	color: var(--nova-accent-foreground);
	font-weight: 700;
`;
