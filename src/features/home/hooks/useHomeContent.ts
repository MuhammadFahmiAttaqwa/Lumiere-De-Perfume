import { useQuery } from '@tanstack/react-query';
import { STALE_TIME } from '@/shared/constants/cacheTime';
import { QUERY_KEYS } from '@/shared/constants/queryKeys';
import { homeService } from '../homeService';

export function useHomeContent() {
    return useQuery({
        queryKey: QUERY_KEYS.homeContent,
        queryFn: ({ signal }) => homeService.getContentAsync(signal),
        staleTime: STALE_TIME.content,
    });
}
