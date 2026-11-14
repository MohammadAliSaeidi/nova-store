import styled from "styled-components";

export const StorefrontShell = styled.div`
	min-height: 100dvh;
	display: flex;
	flex-direction: column;
`;

export const HeaderRoot = styled.header`
	flex: 0 0 auto;
	background: var(--nova-surface);
	border-bottom: 1px solid var(--nova-border);
`;

export const HeaderInner = styled.div`
	width: min(100% - 2rem, 76rem);
	min-height: 5rem;
	margin-inline: auto;
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 1.25rem;

	@media (max-width: 840px) {
		width: min(100% - 1.25rem, 76rem);
		min-height: 4.5rem;
		flex-wrap: wrap;
		padding-block: 0.65rem;
	}
`;

export const BrandLink = styled.a`
	display: inline-flex;
	align-items: center;
	gap: 0.55rem;
	flex: 0 0 auto;
	color: var(--nova-primary);
	font-size: 1.55rem;
	font-weight: 800;
	letter-spacing: 0.015em;
`;

export const BagMark = styled.span`
	position: relative;
	display: inline-block;
	width: 1.05rem;
	height: 1.15rem;
	border-radius: 0.22rem;
	background: var(--nova-accent);

	&::before {
		position: absolute;
		inset-block-start: -0.38rem;
		inset-inline-start: 0.2rem;
		width: 0.45rem;
		height: 0.48rem;
		border: 2px solid var(--nova-accent);
		border-bottom: 0;
		border-radius: 0.4rem 0.4rem 0 0;
		content: "";
	}
`;

export const HeaderControlArea = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	gap: 1rem;
	min-width: 0;

	@media (max-width: 840px) {
		flex: 1 0 100%;
		flex-wrap: wrap;
		gap: 0.7rem;
	}
`;

export const HeaderNavigation = styled.nav<{ $open: boolean }>`
	display: flex;
	align-items: center;
	gap: clamp(0.7rem, 2vw, 1.5rem);

	@media (max-width: 840px) {
		order: 2;
		flex: 1 0 100%;
		flex-direction: column;
		align-items: stretch;
		gap: 0.2rem;
		display: ${({ $open }) => ($open ? "flex" : "none")};
		padding-block-start: 0.35rem;
	}
`;

export const NavigationLink = styled.a`
	min-height: 2.75rem;
	display: inline-flex;
	align-items: center;
	padding-inline: 0.25rem;
	color: var(--nova-text);
	font-size: 0.92rem;
	font-weight: 600;
	text-decoration-thickness: 2px;
	text-underline-offset: 0.35rem;

	&:hover {
		color: var(--nova-accent);
		text-decoration-line: underline;
	}

	@media (max-width: 840px) {
		padding-inline: 0.75rem;
		border-radius: 0.65rem;

		&:hover {
			background: var(--nova-background);
		}
	}
`;

export const HeaderActions = styled.div`
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	gap: 0.5rem;
`;

export const ThemeToggle = styled.button`
	min-width: 2.75rem;
	min-height: 2.75rem;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0.55rem;
	border: 1px solid var(--nova-border);
	border-radius: 0.7rem;
	background: var(--nova-surface);
	color: var(--nova-text);
	cursor: pointer;

	svg {
		width: 1.2rem;
		height: 1.2rem;
	}
`;

export const HeaderSearch = styled.label`
	width: clamp(12rem, 19vw, 17rem);
	display: block;

	@media (max-width: 840px) {
		order: 2;
		width: 100%;
		flex: 1 0 100%;
	}
`;

export const IconButton = styled.button`
	min-width: 2.75rem;
	min-height: 2.75rem;
	display: inline-grid;
	place-items: center;
	padding: 0.45rem;
	border: 1px solid var(--nova-border);
	border-radius: 50%;
	background: var(--nova-surface);
	color: var(--nova-text);
	cursor: pointer;

	&:hover {
		border-color: var(--nova-accent);
		color: var(--nova-accent);
	}

	svg {
		width: 1.2rem;
		height: 1.2rem;
		display: block;
	}
`;

export const MenuButton = styled(IconButton)`
	display: none;

	@media (max-width: 840px) {
		display: inline-grid;
	}
`;

export const LanguageLink = styled.a`
	min-width: 2.75rem;
	min-height: 2.75rem;
	display: inline-grid;
	place-items: center;
	padding-inline: 0.6rem;
	border-radius: 999px;
	color: var(--nova-text);
	font-size: 0.8rem;
	font-weight: 700;

	&:hover {
		background: var(--nova-background);
	}
`;

export const CartStatus = styled.div`
	position: relative;
	min-width: 2.75rem;
	min-height: 2.75rem;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	gap: 0.25rem;
	color: var(--nova-primary);

	svg {
		width: 1.35rem;
		height: 1.35rem;
	}
`;

export const CartCount = styled.span`
	min-width: 1.25rem;
	height: 1.25rem;
	display: inline-grid;
	place-items: center;
	padding-inline: 0.2rem;
	border-radius: 999px;
	background: var(--nova-accent);
	color: var(--nova-accent-foreground);
	font-size: 0.7rem;
	font-weight: 800;
`;

export const PageContent = styled.main`
	flex: 1 0 auto;
	min-height: 0;
	width: min(100% - 2rem, 76rem);
	margin-inline: auto;
	padding-block: 1.5rem 4rem;

	@media (max-width: 840px) {
		width: min(100% - 1.25rem, 76rem);
		padding-block-start: 1rem;
	}
`;

export const HeroPanel = styled.section`
	min-height: 19rem;
	display: grid;
	grid-template-columns: minmax(0, 1.1fr) minmax(18rem, 0.9fr);
	align-items: center;
	gap: clamp(1.5rem, 4vw, 4rem);
	padding: clamp(1.5rem, 4vw, 3rem);
	border: 1px solid var(--nova-border);
	border-radius: 1.25rem;
	background: linear-gradient(
		120deg,
		var(--nova-surface) 8%,
		var(--nova-background) 100%
	);
	overflow: hidden;

	@media (max-width: 760px) {
		grid-template-columns: 1fr;
		gap: 1.1rem;
		padding: 1.35rem;
	}
`;

export const HeroCopy = styled.div`
	position: relative;
	z-index: 1;
`;

export const HeroEyebrow = styled.p`
	margin: 0 0 0.7rem;
	color: var(--nova-accent);
	font-size: 0.9rem;
	font-weight: 800;
`;

export const HeroTitle = styled.h1`
	max-width: 16ch;
	margin: 0;
	color: var(--nova-primary);
	font-size: clamp(1.8rem, 4vw, 3rem);
	line-height: 1.25;
`;

export const HeroDescription = styled.p`
	max-width: 38ch;
	margin: 0.8rem 0 1.35rem;
	color: var(--nova-muted-text);
	line-height: 1.8;
`;

export const PrimaryLink = styled.a`
	min-height: 2.85rem;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	gap: 0.45rem;
	padding: 0.65rem 1.15rem;
	border-radius: 999px;
	background: var(--nova-accent);
	color: var(--nova-accent-foreground);
	font-weight: 700;
	transition: transform 150ms ease, filter 150ms ease;

	&:hover {
		filter: brightness(1.05);
		transform: translateY(-1px);
	}
`;

export const HeroArtwork = styled.div`
	position: relative;
	min-height: 15rem;
	display: grid;
	grid-template-columns: repeat(3, minmax(0, 1fr));
	align-items: center;
	gap: 0.55rem;
	padding: 0.7rem;
	border-radius: 1rem;
	background: radial-gradient(
		circle at 45% 45%,
		var(--nova-background),
		var(--nova-border)
	);

	@media (max-width: 760px) {
		min-height: 11.5rem;
	}
`;

export const HeroProductFrame = styled.div<{ $raised?: boolean }>`
	min-width: 0;
	min-height: 0;
	height: clamp(8rem, 16vw, 13rem);
	display: grid;
	place-items: center;
	padding: 0.4rem;
	border-radius: 0.85rem;
	background: var(--nova-surface);
	box-shadow: 0 0.8rem 2rem rgb(23 36 58 / 10%);
	overflow: hidden;
	transform: ${({ $raised }) => ($raised ? "translateY(-0.8rem)" : "translateY(0.6rem)")};

	img {
		display: block;
		width: auto;
		height: auto;
		max-width: 100%;
		max-height: 100%;
		object-fit: contain;
	}
`;

export const CatalogSection = styled.section`
	padding-block-start: clamp(2.5rem, 6vw, 4.5rem);
`;

export const SectionHeading = styled.h2`
	margin: 0;
	color: var(--nova-primary);
	font-size: clamp(1.35rem, 2vw, 1.8rem);
`;

export const HeadingAccent = styled.span`
	width: 3rem;
	height: 0.22rem;
	display: block;
	margin-block-start: 0.45rem;
	border-radius: 999px;
	background: var(--nova-accent);
`;

export const CategoryChips = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 0.6rem;
	margin-block: 1.15rem 2.2rem;
`;

export const CategoryChip = styled.button<{ $active: boolean }>`
	min-height: 2.75rem;
	max-width: 100%;
	padding: 0.55rem 1rem;
	border: 1px solid
		${({ $active }) => ($active ? "var(--nova-accent)" : "var(--nova-border)")};
	border-radius: 999px;
	background: ${({ $active }) =>
		$active ? "var(--nova-accent)" : "var(--nova-surface)"};
	color: ${({ $active }) =>
		$active ? "var(--nova-accent-foreground)" : "var(--nova-text)"};
	font-weight: 650;
	text-align: start;
	cursor: pointer;

	&:hover {
		border-color: var(--nova-accent);
	}
`;

export const CatalogTopline = styled.div`
	display: flex;
	align-items: flex-end;
	justify-content: space-between;
	gap: 1rem;
	margin-block-end: 1rem;

	@media (max-width: 620px) {
		align-items: flex-start;
		flex-direction: column;
	}
`;

export const ResultCount = styled.p`
	margin: 0.55rem 0 0;
	color: var(--nova-muted-text);
	font-size: 0.9rem;
`;

export const CatalogControls = styled.div`
	display: flex;
	justify-content: flex-end;
	gap: 0.75rem;
	margin-block-end: 1.2rem;

	@media (max-width: 620px) {
		justify-content: stretch;
	}
`;

export const SearchInput = styled.input`
	width: 100%;
	min-width: 0;
	min-height: 2.9rem;
	padding: 0.7rem 0.9rem;
	border: 1px solid var(--nova-border);
	border-radius: 0.75rem;
	background: var(--nova-surface);
	color: var(--nova-text);

	&::placeholder {
		color: var(--nova-muted-text);
	}
`;

export const SortSelect = styled.select`
	width: min(100%, 18rem);
	min-height: 2.9rem;
	padding: 0.65rem 0.85rem;
	border: 1px solid var(--nova-border);
	border-radius: 0.75rem;
	background: var(--nova-surface);
	color: var(--nova-text);

	@media (max-width: 620px) {
		width: 100%;
	}
`;

export const ProductGrid = styled.div`
	display: grid;
	grid-template-columns: minmax(0, 1fr);
	gap: 1rem;

	@media (min-width: 480px) {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}

	@media (min-width: 900px) {
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 1.15rem;
	}
`;

export const ProductCard = styled.article`
	min-width: 0;
	min-height: 27rem;
	display: flex;
	flex-direction: column;
	padding: 0.65rem;
	border: 1px solid var(--nova-border);
	border-radius: 1rem;
	background: var(--nova-surface);
	box-shadow: 0 0.45rem 1.4rem rgb(23 36 58 / 4%);
`;

export const ProductImageFrame = styled.div`
	position: relative;
	min-width: 0;
	min-height: 0;
	width: 100%;
	height: clamp(12rem, 23vw, 16rem);
	display: grid;
	place-items: center;
	padding: 0.75rem;
	border-radius: 0.75rem;
	background: var(--nova-background);
	overflow: hidden;

	img {
		display: block;
		width: auto;
		height: auto;
		max-width: 100%;
		max-height: 100%;
		object-fit: contain;
	}
`;

export const LoadingBlock = styled.span<{
	$width?: string;
	$height?: string;
}>`
	flex: 0 0 auto;
	width: ${({ $width }) => $width ?? "100%"};
	height: ${({ $height }) => $height ?? "1rem"};
	display: block;
	border-radius: 0.5rem;
	background: var(--nova-border);
`;

export const ProductDetails = styled.div`
	flex: 1 1 auto;
	display: flex;
	flex-direction: column;
	padding: 0.85rem 0.35rem 0.35rem;

	&[data-loading="true"] > span + span {
		margin-block-start: 0.65rem;
	}
`;

export const ProductCategory = styled.p`
	width: fit-content;
	max-width: 100%;
	margin: 0 0 0.5rem;
	padding: 0.2rem 0.55rem;
	border-radius: 999px;
	background: var(--nova-background);
	color: var(--nova-muted-text);
	font-size: 0.75rem;
	font-weight: 650;
`;

export const ProductTitle = styled.h3`
	min-height: 2.8em;
	margin: 0;
	color: var(--nova-text);
	font-size: 1rem;
	line-height: 1.45;
	overflow-wrap: anywhere;
`;

export const ProductMeta = styled.div`
	display: flex;
	align-items: flex-start;
	flex-direction: column;
	gap: 0.5rem;
	margin-block: 0.75rem 0.55rem;
`;

export const ProductRating = styled.span`
	display: inline-flex;
	align-items: center;
	gap: 0.3rem;
	color: var(--nova-muted-text);
	font-size: 0.8rem;
	white-space: nowrap;

	svg {
		width: 1rem;
		height: 1rem;
		color: var(--nova-accent);
	}
`;

export const ProductPrice = styled.p`
	margin: 0;
	color: var(--nova-primary);
	font-size: 1rem;
	font-weight: 800;
	font-variant-numeric: tabular-nums;
`;

export const AddToCartButton = styled.button`
	width: 100%;
	min-height: 2.8rem;
	margin-block-start: auto;
	padding: 0.65rem 0.8rem;
	border: 0;
	border-radius: 0.7rem;
	background: var(--nova-accent);
	color: var(--nova-accent-foreground);
	font-weight: 750;
	cursor: pointer;

	&:hover:not(:disabled) {
		filter: brightness(1.06);
	}

	&:disabled {
		cursor: wait;
		opacity: 0.65;
	}
`;

export const StatusPanel = styled.div`
	min-height: 6.5rem;
	display: grid;
	align-content: center;
	margin-block: 0.9rem;
	padding: 1rem;
	border: 1px solid var(--nova-border);
	border-radius: 0.85rem;
	background: var(--nova-surface);
	color: var(--nova-text);

	&[data-kind="error"] {
		border-color: var(--nova-accent);
	}
`;

export const RetryButton = styled.button`
	min-height: 2.65rem;
	margin-block-start: 0.7rem;
	padding: 0.55rem 0.9rem;
	border: 1px solid var(--nova-accent);
	border-radius: 0.7rem;
	background: transparent;
	color: var(--nova-text);
	font-weight: 700;
	cursor: pointer;
`;

export const Pagination = styled.nav`
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: center;
	gap: 0.45rem;
	margin-block-start: 1.5rem;
`;

export const PageButton = styled.button<{ $active?: boolean }>`
	min-width: 2.65rem;
	min-height: 2.65rem;
	padding: 0.45rem;
	border: 1px solid
		${({ $active }) => ($active ? "var(--nova-primary)" : "var(--nova-border)")};
	border-radius: 0.65rem;
	background: ${({ $active }) =>
		$active ? "var(--nova-primary)" : "var(--nova-surface)"};
	color: ${({ $active }) =>
		$active ? "var(--nova-background)" : "var(--nova-text)"};
	font-weight: 700;
	cursor: pointer;

	&:disabled {
		cursor: not-allowed;
		opacity: 0.5;
	}
`;

export const FooterRoot = styled.footer`
	flex: 0 0 auto;
	background: var(--nova-footer-background);
	color: var(--nova-footer-text);
`;

export const FooterInner = styled.div`
	width: min(100% - 2rem, 76rem);
	margin-inline: auto;
	padding-block: 2.5rem 1rem;
`;

export const FooterGrid = styled.div`
	display: grid;
	grid-template-columns: 1.5fr 1fr 1fr 1fr;
	gap: 2rem;
	padding-block-end: 2rem;

	@media (max-width: 760px) {
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 1.5rem 1rem;
	}

	@media (max-width: 420px) {
		grid-template-columns: 1fr;
	}
`;

export const FooterColumn = styled.div`
	min-width: 0;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 0.55rem;

	h2,
	h3 {
		margin: 0 0 0.35rem;
		font-size: 1rem;
	}

	p {
		max-width: 34ch;
		margin: 0;
		color: var(--nova-footer-text);
		line-height: 1.8;
		opacity: 0.82;
	}

	a {
		color: var(--nova-footer-text);
		font-size: 0.9rem;
		opacity: 0.86;
	}

	a:hover {
		color: var(--nova-accent);
		opacity: 1;
	}
`;

export const FooterBrand = styled.div`
	display: inline-flex;
	align-items: center;
	gap: 0.55rem;
	font-size: 1.45rem;
	font-weight: 800;
`;

export const SocialMarks = styled.div`
	display: flex;
	gap: 0.45rem;

	span {
		width: 2.25rem;
		height: 2.25rem;
		display: inline-grid;
		place-items: center;
		border: 1px solid rgb(255 255 255 / 28%);
		border-radius: 50%;
		font-size: 0.72rem;
		font-weight: 800;
	}
`;

export const FooterBottom = styled.div`
	display: flex;
	justify-content: space-between;
	gap: 1rem;
	padding-block-start: 0.9rem;
	border-top: 1px solid rgb(255 255 255 / 20%);
	font-size: 0.8rem;
	opacity: 0.8;

	@media (max-width: 480px) {
		flex-direction: column;
	}
`;

export const VisuallyHidden = styled.span`
	position: absolute;
	width: 1px;
	height: 1px;
	padding: 0;
	margin: -1px;
	overflow: hidden;
	clip: rect(0, 0, 0, 0);
	white-space: nowrap;
	border: 0;
`;
