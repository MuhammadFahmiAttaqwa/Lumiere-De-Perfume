import { apiClient } from '@/shared/api';
import { API_ENDPOINTS } from '@/shared/constants/apiEndpoints';
import type { SiteSettings } from './types';

export const siteService = {
    getSettingsAsync(signal?: AbortSignal): Promise<SiteSettings> {
        return apiClient.getAsync<SiteSettings>(API_ENDPOINTS.siteSettings, { signal });
    },
};
