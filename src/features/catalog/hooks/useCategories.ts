import { useQuery } from '@tanstack/react-query';
import { STALE_TIME } from '@/shared/constants/cacheTime';
import { QUERY_KEYS } from '@/shared/constants/queryKeys';
import { sortByOrder } from '@/shared/lib/sortByOrder';
import { catalogService } from '../catalogService';

export function useCategories(enabled: boolean = true) {
    return useQuery({
        queryKey: QUERY_KEYS.categories,
        queryFn: ({ signal }) => catalogService.getCategoriesAsync(signal),
        select: sortByOrder,
        staleTime: STALE_TIME.content,
        enabled,
    });
}
