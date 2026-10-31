import { useQuery } from '@tanstack/react-query';
import { STALE_TIME } from '@/shared/constants/cacheTime';
import { QUERY_KEYS } from '@/shared/constants/queryKeys';
import { catalogService } from '../catalogService';
import type { ProductSummary } from '../types';

function orderByIds(
    products: ProductSummary[],
    ids: readonly string[],
): ProductSummary[] {
    const byId = new Map(products.map((product) => [product.id, product]));
    return ids.flatMap((id) => byId.get(id) ?? []);
}

export function useProductsByIds(
    ids: readonly string[],
    enabled: boolean,
) {
    return useQuery({
        queryKey: [...QUERY_KEYS.productsBatch, ids],
        queryFn: ({ signal }) => catalogService.getProductsByIdsAsync(ids, signal),
        select: (products) => orderByIds(products, ids),
        staleTime: STALE_TIME.products,
        enabled: enabled && ids.length > 0,
    });
}
