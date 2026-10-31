import { useInfiniteQuery } from '@tanstack/react-query';
import { STALE_TIME } from '@/shared/constants/cacheTime';
import { QUERY_KEYS } from '@/shared/constants/queryKeys';
import { catalogService } from '../catalogService';
import type { ProductListQuery } from '../types';

const FIRST_PAGE = 1;

export function useProductList(
    query: ProductListQuery,
    enabled: boolean,
) {
    return useInfiniteQuery({
        queryKey: [...QUERY_KEYS.products, query],
        queryFn: ({ pageParam, signal }) => catalogService.getProductsAsync(query, pageParam, signal),
        initialPageParam: FIRST_PAGE,
        getNextPageParam: (lastPage) => (lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined),
        staleTime: STALE_TIME.products,
        enabled,
    });
}
