import { delay, http } from 'msw';
import { API_ENDPOINTS } from '@/shared/constants/apiEndpoints';
import { HOME_CONTENT_DATA } from '../data/homeContentData';
import { apiUrl } from '../utils/apiUrl';
import { okResponse } from '../utils/mockResponse';

export const homeHandlers = [
    http.get(apiUrl(API_ENDPOINTS.home), async () => {
        await delay();
        return okResponse(HOME_CONTENT_DATA);
    }),
];
