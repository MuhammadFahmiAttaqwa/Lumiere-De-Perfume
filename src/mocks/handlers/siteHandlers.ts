import { delay, http } from 'msw';
import { API_ENDPOINTS } from '@/shared/constants/apiEndpoints';
import { SITE_SETTINGS_DATA } from '../data/siteSettingsData';
import { apiUrl } from '../utils/apiUrl';
import { okResponse } from '../utils/mockResponse';

export const siteHandlers = [
    http.get(apiUrl(API_ENDPOINTS.siteSettings), async () => {
        await delay();
        return okResponse(SITE_SETTINGS_DATA);
    }),
];
