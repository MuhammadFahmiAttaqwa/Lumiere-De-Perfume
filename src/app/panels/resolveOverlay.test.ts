import { describe, expect, it } from 'vitest';
import { UI_TEXT } from '@/shared/constants/uiText';
import { isKnownPanel, resolveOverlay } from './resolveOverlay';

describe('resolveOverlay', () => {
    it('resolves a known panel', () => {
        expect(resolveOverlay(new URLSearchParams('panel=cart'))).toEqual({
            panelKey: 'cart',
            title: UI_TEXT.panelTitles.cart,
            detail: null,
        });
    });

    it('resolves a product detail overlay', () => {
        expect(resolveOverlay(new URLSearchParams('product=sos-blemish-gel'))).toEqual({
            panelKey: null,
            title: UI_TEXT.panelTitles.product,
            detail: 'sos-blemish-gel',
        });
    });

    it('returns null for unknown or prototype panel names', () => {
        expect(resolveOverlay(new URLSearchParams('panel=admin'))).toBeNull();
        expect(resolveOverlay(new URLSearchParams('panel=constructor'))).toBeNull();
        expect(resolveOverlay(new URLSearchParams('category=mask'))).toBeNull();
        expect(isKnownPanel('__proto__')).toBe(false);
    });
});
