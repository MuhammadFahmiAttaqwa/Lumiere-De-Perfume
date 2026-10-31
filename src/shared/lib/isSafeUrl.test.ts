import { describe, expect, it } from 'vitest';
import { isSafeUrl } from './isSafeUrl';

describe('isSafeUrl', () => {
    it.each([
        '/catalog',
        '/catalog?sort=newest',
        'https://example.com/page',
        'http://example.com',
        'mailto:customerservice@ldpskincare.com',
        'tel:+629942357343',
    ])('accepts %s', (url) => {
        expect(isSafeUrl(url)).toBe(true);
    });

    it.each([
        'javascript:alert(1)',
        ' JavaScript:alert(1)',
        'data:text/html;base64,PHNjcmlwdD4=',
        'vbscript:msgbox(1)',
        '//evil.example.com',
        '/\\evil.example.com',
        'catalog',
        '',
        '   ',
        null,
        undefined,
    ])('rejects %s', (url) => {
        expect(isSafeUrl(url)).toBe(false);
    });
});
