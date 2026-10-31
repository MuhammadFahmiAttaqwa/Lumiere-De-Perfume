import { delay, http } from 'msw';
import type { Category, ProductSummary } from '@/features/catalog';
import type { PagedResult } from '@/shared/api';
import { API_ENDPOINTS } from '@/shared/constants/apiEndpoints';
import { CATALOG_CONFIG, GENDERS } from '@/shared/constants/catalog';
import { CATALOG_SORT } from '@/shared/constants/routes';
import { CATEGORIES_DATA } from '../data/categoriesData';
import { PRODUCTS_DATA } from '../data/productsData';
import type { MockProduct } from '../types/MockProduct';
import { apiUrl } from '../utils/apiUrl';
import { failResponse, okResponse } from '../utils/mockResponse';

const DEFAULT_PAGE_SIZE = 12;
const MAX_PAGE_SIZE = 48;
const MAX_BATCH_IDS = 50;
const HTTP_BAD_REQUEST = 400;

function toSummary(product: MockProduct): ProductSummary {
    const { categorySlug: _categorySlug, popularity: _popularity, createdAt: _createdAt, ...summary } = product;
    return summary;
}

function parsePositiveInt(
    value: string | null,
    fallback: number,
): number {
    const parsed = Number(value);
    return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}

function sortProducts(
    products: MockProduct[],
    sort: string | null,
): MockProduct[] {
    const sorted = [...products];

    switch (sort) {
        case CATALOG_SORT.priceAsc:
            return sorted.sort((left, right) => left.price - right.price);
        case CATALOG_SORT.priceDesc:
            return sorted.sort((left, right) => right.price - left.price);
        case CATALOG_SORT.popular:
            return sorted.sort((left, right) => right.popularity - left.popularity);
        default:
            return sorted.sort((left, right) => right.createdAt.localeCompare(left.createdAt));
    }
}

function filterProducts(params: URLSearchParams): MockProduct[] {
    const category = params.get('category');
    const gender = params.get('gender');
    const query = params.get('q')?.toLowerCase().trim();
    const minPrice = Number(params.get('minPrice') ?? Number.NaN);
    const maxPrice = Number(params.get('maxPrice') ?? Number.NaN);

    return PRODUCTS_DATA.filter((product) => {
        if (category && category !== CATALOG_CONFIG.allCategorySlug && product.categorySlug !== category) {
            return false;
        }

        if (gender && product.gender !== gender && product.gender !== GENDERS.unisex) {
            return false;
        }

        if (query && !`${product.name} ${product.brand}`.toLowerCase().includes(query)) {
            return false;
        }

        if (!Number.isNaN(minPrice) && product.price < minPrice) {
            return false;
        }

        return Number.isNaN(maxPrice) || product.price <= maxPrice;
    });
}

export const catalogHandlers = [
    http.get(apiUrl(API_ENDPOINTS.categories), async () => {
        await delay();

        const categories: Category[] = CATEGORIES_DATA.map((category) => ({
            ...category,
            productCount:
                category.slug === CATALOG_CONFIG.allCategorySlug
                    ? PRODUCTS_DATA.length
                    : PRODUCTS_DATA.filter((product) => product.categorySlug === category.slug).length,
        }));

        return okResponse(categories);
    }),

    http.get(apiUrl(API_ENDPOINTS.products), async ({ request }) => {
        await delay();

        const params = new URL(request.url).searchParams;
        const page = parsePositiveInt(params.get('page'), 1);
        const pageSize = Math.min(parsePositiveInt(params.get('pageSize'), DEFAULT_PAGE_SIZE), MAX_PAGE_SIZE);
        const products = sortProducts(filterProducts(params), params.get('sort'));
        const start = (page - 1) * pageSize;

        const result: PagedResult<ProductSummary> = {
            items: products.slice(start, start + pageSize).map(toSummary),
            page,
            pageSize,
            totalItems: products.length,
            totalPages: Math.max(1, Math.ceil(products.length / pageSize)),
        };

        return okResponse(result);
    }),

    http.post(apiUrl(API_ENDPOINTS.productsBatch), async ({ request }) => {
        await delay();

        const body: unknown = await request.json();
        const ids =
            typeof body === 'object' && body !== null && 'ids' in body && Array.isArray(body.ids) ? body.ids : null;

        if (!ids || ids.length > MAX_BATCH_IDS || !ids.every((id) => typeof id === 'string')) {
            return failResponse('Validation failed', HTTP_BAD_REQUEST, { ids: ['Provide up to 50 product ids.'] });
        }

        const products = PRODUCTS_DATA.filter((product) => ids.includes(product.id)).map(toSummary);
        return okResponse(products);
    }),
];
