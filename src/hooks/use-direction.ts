import { getDirection } from "@/i18n/config";
import type { UIDirection } from "@/types/ui-direction";
import { useLocale } from "next-intl";

/**
 * Hook to get the text direction based on the current locale.
 *
 * @returns {UIDirection} The text direction ('ltr' or 'rtl')
 */
export const useDirection = (): UIDirection => {
	const locale = useLocale();

	return getDirection(locale);
};
