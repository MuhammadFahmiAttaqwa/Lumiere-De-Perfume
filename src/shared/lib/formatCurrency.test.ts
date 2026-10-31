import { describe, expect, it } from 'vitest';
import { formatCurrency } from './formatCurrency';

const NON_BREAKING_SPACE_PATTERN = / /g;

function normalizeSpaces(value: string): string {
    return value.replace(NON_BREAKING_SPACE_PATTERN, ' ');
}

describe('formatCurrency', () => {
    it('formats IDR without decimals using id-ID grouping', () => {
        expect(normalizeSpaces(formatCurrency(259000))).toBe('Rp 259.000');
    });

    it('rounds fractional amounts', () => {
        expect(normalizeSpaces(formatCurrency(1999.6))).toBe('Rp 2.000');
    });

    it('formats zero', () => {
        expect(normalizeSpaces(formatCurrency(0))).toBe('Rp 0');
    });
});
