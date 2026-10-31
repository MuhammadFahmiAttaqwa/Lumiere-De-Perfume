import { describe, expect, it } from 'vitest';
import { isSafeReturnUrl } from './isSafeReturnUrl';

describe('isSafeReturnUrl', () => {
    it.each(['/checkout', '/account/orders?page=2', '/'])('accepts internal path %s', (url) => {
        expect(isSafeReturnUrl(url)).toBe(true);
    });

    it.each([
        'https://evil.example.com',
        '//evil.example.com',
        '/\\evil.example.com',
        '/checkout\nSet-Cookie:x=1',
        'javascript:alert(1)',
        'checkout',
        '',
        null,
        undefined,
    ])('rejects %s', (url) => {
        expect(isSafeReturnUrl(url)).toBe(false);
    });
});
