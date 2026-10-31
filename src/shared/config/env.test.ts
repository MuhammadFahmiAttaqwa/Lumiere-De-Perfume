import { describe, expect, it } from 'vitest';
import { ENV } from './env';

describe('ENV', () => {
    it('parses and normalizes environment variables', () => {
        expect(ENV.apiBaseUrl).toBe('/api/v1');
        expect(typeof ENV.enableMock).toBe('boolean');
        expect(ENV.apiTimeoutMs).toBeGreaterThan(0);
        expect(Number.isInteger(ENV.apiTimeoutMs)).toBe(true);
        expect(ENV.defaultCurrency).toBe('IDR');
        expect(ENV.defaultLocale).toBe('id-ID');
    });
});
