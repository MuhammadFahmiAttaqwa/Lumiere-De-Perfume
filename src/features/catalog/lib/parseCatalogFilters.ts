import { CATALOG_CONFIG, CATALOG_PARAMS, GENDERS } from '@/shared/constants/catalog';
import { CATALOG_SORT } from '@/shared/constants/routes';
import type { CatalogFilterDefaults, CatalogFilters, CatalogSort, Gender } from '../types';

const SELECTABLE_GENDERS: readonly string[] = [GENDERS.women, GENDERS.men];
const SORT_VALUES: readonly string[] = Object.values(CATALOG_SORT);
const MAX_QUERY_LENGTH = 100;

function parseGender(
    value: string | null,
    fallback: Gender | null,
): Gender | null {
    if (value === null) {
        return fallback;
    }

    return SELECTABLE_GENDERS.includes(value) ? (value as Gender) : null;
}

function parseSort(value: string | null): CatalogSort | null {
    return value !== null && SORT_VALUES.includes(value) ? (value as CatalogSort) : null;
}

function parsePrice(value: string | null): number | null {
    if (value === null || value.trim() === '') {
        return null;
    }

    const parsed = Number(value);
    return Number.isInteger(parsed) && parsed >= 0 ? parsed : null;
}

function parseQuery(value: string | null): string | null {
    const trimmed = value?.trim() ?? '';
    return trimmed.length > 0 ? trimmed.slice(0, MAX_QUERY_LENGTH) : null;
}

export function parseCatalogFilters(
    params: URLSearchParams,
    defaults: CatalogFilterDefaults,
): CatalogFilters {
    const category = params.get(CATALOG_PARAMS.category)?.trim() || defaults.categorySlug;

    return {
        category: category || CATALOG_CONFIG.allCategorySlug,
        gender: parseGender(params.get(CATALOG_PARAMS.gender), defaults.gender),
        sort: parseSort(params.get(CATALOG_PARAMS.sort)),
        q: parseQuery(params.get(CATALOG_PARAMS.query)),
        minPrice: parsePrice(params.get(CATALOG_PARAMS.minPrice)),
        maxPrice: parsePrice(params.get(CATALOG_PARAMS.maxPrice)),
    };
}
