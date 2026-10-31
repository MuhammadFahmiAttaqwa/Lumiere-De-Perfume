import { describe, expect, it } from 'vitest';
import type { CatalogFilterDefaults } from '../types';
import { parseCatalogFilters } from './parseCatalogFilters';

const DEFAULTS: CatalogFilterDefaults = { categorySlug: 'serum-treatment', gender: 'women' };

describe('parseCatalogFilters', () => {
    it('falls back to defaults when params are absent', () => {
        expect(parseCatalogFilters(new URLSearchParams(), DEFAULTS)).toEqual({
            category: 'serum-treatment',
            gender: 'women',
            sort: null,
            q: null,
            minPrice: null,
            maxPrice: null,
        });
    });

    it('reads valid params from the URL', () => {
        const params = new URLSearchParams('category=mask&gender=men&sort=price_asc&q= serum &minPrice=0&maxPrice=200000');

        expect(parseCatalogFilters(params, DEFAULTS)).toEqual({
            category: 'mask',
            gender: 'men',
            sort: 'price_asc',
            q: 'serum',
            minPrice: 0,
            maxPrice: 200000,
        });
    });

    it('treats gender=all as no gender filter', () => {
        expect(parseCatalogFilters(new URLSearchParams('gender=all'), DEFAULTS).gender).toBeNull();
    });

    it('ignores invalid values', () => {
        const params = new URLSearchParams('gender=robot&sort=random&minPrice=-5&maxPrice=abc');
        const filters = parseCatalogFilters(params, DEFAULTS);

        expect(filters.gender).toBeNull();
        expect(filters.sort).toBeNull();
        expect(filters.minPrice).toBeNull();
        expect(filters.maxPrice).toBeNull();
    });
});
