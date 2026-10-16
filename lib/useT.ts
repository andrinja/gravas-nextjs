import { useTranslation } from 'next-i18next/pages';
import type { TranslationNamespace } from '../constants/translationNamespace';

/**
 * useTranslation, narrowed so the returned function is usable as a React child.
 *
 * next-i18next 8 types `t()` as returning TFunctionResult (string | object |
 * array | null), which TypeScript will not accept as a ReactNode. Every call
 * site here passes a plain key and gets a string back, so the cast is narrowing
 * a too-wide type rather than hiding one.
 *
 * The key is deliberately allowed to be undefined and is forwarded untouched:
 * PriceTag renders `t(additionalPerson)` for a field that is absent on 45 of
 * the 63 price entries, and i18next's own handling of that is what produces the
 * empty <p> the markup already ships. Substituting '' here would be the same
 * output today but would quietly diverge if that ever changed.
 */
export function useT(namespace: TranslationNamespace) {
	const { t } = useTranslation(namespace);
	return (key?: string): string => t(key as string) as string;
}
