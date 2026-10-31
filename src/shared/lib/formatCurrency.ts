import { ENV } from '@/shared/config/env';

const formatterCache = new Map<string, Intl.NumberFormat>();

function getFormatter(currency: string): Intl.NumberFormat {
    const cached = formatterCache.get(currency);

    if (cached) {
        return cached;
    }

    const formatter = new Intl.NumberFormat(ENV.defaultLocale, {
        style: 'currency',
        currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });

    formatterCache.set(currency, formatter);
    return formatter;
}

export function formatCurrency(
    amount: number,
    currency: string = ENV.defaultCurrency,
): string {
    return getFormatter(currency).format(amount);
}
