"use client";

import { StepperButton, StepperValue, StepperWrap } from "./styles";

type Props = {
	value: number;
	min?: number;
	label: string;
	increaseLabel: string;
	decreaseLabel: string;
	onIncrease: () => void;
	onDecrease: () => void;
};

export function QuantityStepper(props: Props) {
	const {
		value,
		min = 1,
		label,
		increaseLabel,
		decreaseLabel,
		onIncrease,
		onDecrease,
	} = props;

	return (
		<StepperWrap role="group" aria-label={label}>
			<StepperButton
				type="button"
				aria-label={decreaseLabel}
				disabled={value <= min}
				onClick={onDecrease}
			>
				−
			</StepperButton>
			<StepperValue aria-live="polite">{value}</StepperValue>
			<StepperButton
				type="button"
				aria-label={increaseLabel}
				onClick={onIncrease}
			>
				+
			</StepperButton>
		</StepperWrap>
	);
}
