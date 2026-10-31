import { describe, expect, it } from 'vitest';
import { toSearchString, withOverlay, withoutOverlay } from './overlaySearch';

describe('overlaySearch', () => {
    it('replaces any open overlay while keeping catalog filters', () => {
        const params = withOverlay('?category=mask&product=old-slug&returnPanel=checkout', { panel: 'cart' });

        expect(params.get('category')).toBe('mask');
        expect(params.get('panel')).toBe('cart');
        expect(params.has('product')).toBe(false);
        expect(params.has('returnPanel')).toBe(false);
    });

    it('removes overlay params only', () => {
        const params = withoutOverlay('?gender=men&panel=cart&article=a-1');

        expect(params.toString()).toBe('gender=men');
    });

    it('builds an empty search string when no params remain', () => {
        expect(toSearchString(withoutOverlay('?panel=cart'))).toBe('');
        expect(toSearchString(new URLSearchParams('sort=newest'))).toBe('?sort=newest');
    });
});
