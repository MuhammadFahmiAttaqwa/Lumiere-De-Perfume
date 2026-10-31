import { apiClient } from '@/shared/api';
import { API_ENDPOINTS } from '@/shared/constants/apiEndpoints';
import type { HomeContent } from './types';

export const homeService = {
    getContentAsync(signal?: AbortSignal): Promise<HomeContent> {
        return apiClient.getAsync<HomeContent>(API_ENDPOINTS.home, { signal });
    },
};
