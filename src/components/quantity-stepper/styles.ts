import styled from "styled-components";

export const StepperWrap = styled.div`
	display: inline-flex;
	align-items: center;
	gap: 0.25rem;
`;

export const StepperButton = styled.button`
	width: 2.75rem;
	height: 2.75rem;
	display: inline-grid;
	place-items: center;
	border: 1px solid var(--nova-border);
	border-radius: 0.65rem;
	background: var(--nova-surface);
	color: var(--nova-text);
	font-size: 1.2rem;
	cursor: pointer;

	&:disabled {
		cursor: not-allowed;
		opacity: 0.5;
	}
`;

export const StepperValue = styled.span`
	min-width: 2rem;
	text-align: center;
	font-variant-numeric: tabular-nums;
`;
