import { useQuery } from '@tanstack/react-query';
import { STALE_TIME } from '@/shared/constants/cacheTime';
import { QUERY_KEYS } from '@/shared/constants/queryKeys';
import { siteService } from '../siteService';

export function useSiteSettings() {
    return useQuery({
        queryKey: QUERY_KEYS.siteSettings,
        queryFn: ({ signal }) => siteService.getSettingsAsync(signal),
        staleTime: STALE_TIME.content,
    });
}
