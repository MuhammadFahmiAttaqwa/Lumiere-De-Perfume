import { apiClient, type PagedResult } from '@/shared/api';
import { API_ENDPOINTS } from '@/shared/constants/apiEndpoints';
import { CATALOG_CONFIG } from '@/shared/constants/catalog';
import type { Category, ProductListQuery, ProductSummary } from './types';

export const catalogService = {
    getCategoriesAsync(signal?: AbortSignal): Promise<Category[]> {
        return apiClient.getAsync<Category[]>(API_ENDPOINTS.categories, { signal });
    },

    getProductsAsync(
        query: ProductListQuery,
        page: number,
        signal?: AbortSignal,
    ): Promise<PagedResult<ProductSummary>> {
        const category = query.category === CATALOG_CONFIG.allCategorySlug ? undefined : query.category;

        return apiClient.getAsync<PagedResult<ProductSummary>>(API_ENDPOINTS.products, {
            signal,
            params: {
                category,
                gender: query.gender,
                sort: query.sort,
                q: query.q,
                minPrice: query.minPrice,
                maxPrice: query.maxPrice,
                page,
                pageSize: query.pageSize,
            },
        });
    },

    getProductsByIdsAsync(
        ids: readonly string[],
        signal?: AbortSignal,
    ): Promise<ProductSummary[]> {
        return apiClient.postAsync<ProductSummary[]>(API_ENDPOINTS.productsBatch, { ids }, { signal });
    },
};
