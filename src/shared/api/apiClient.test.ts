import { http, HttpResponse } from 'msw';
import { describe, expect, it } from 'vitest';
import { failResponse, okResponse } from '@/mocks/utils/mockResponse';
import { server } from '@/mocks/server';
import { apiUrl } from '@/mocks/utils/apiUrl';
import { UI_TEXT } from '@/shared/constants/uiText';
import { apiClient } from './apiClient';
import { ApiError } from './ApiError';

const TEST_ENDPOINT = '/__test__/resource';

async function captureErrorAsync(promise: Promise<unknown>): Promise<ApiError> {
    try {
        await promise;
    } catch (error) {
        if (error instanceof ApiError) {
            return error;
        }

        throw error;
    }

    throw new Error('Expected promise to reject with ApiError.');
}

describe('apiClient', () => {
    it('unwraps data from a successful envelope', async () => {
        server.use(http.get(apiUrl(TEST_ENDPOINT), () => okResponse({ id: 'x-1', name: 'Serum' })));

        const result = await apiClient.getAsync<{ id: string; name: string }>(TEST_ENDPOINT);

        expect(result).toEqual({ id: 'x-1', name: 'Serum' });
    });

    it('maps validation errors to ApiError.fieldErrors', async () => {
        server.use(
            http.post(apiUrl(TEST_ENDPOINT), () =>
                failResponse('Validation failed', 400, { email: ['Email is already registered.'] }),
            ),
        );

        const error = await captureErrorAsync(apiClient.postAsync(TEST_ENDPOINT, { email: 'a@b.c' }));

        expect(error.status).toBe(400);
        expect(error.message).toBe('Validation failed');
        expect(error.fieldErrors).toEqual({ email: ['Email is already registered.'] });
        expect(error.isClientError).toBe(true);
    });

    it('treats isSuccess=false with HTTP 200 as an error', async () => {
        server.use(http.get(apiUrl(TEST_ENDPOINT), () => failResponse('Business rule violated', 200)));

        const error = await captureErrorAsync(apiClient.getAsync(TEST_ENDPOINT));

        expect(error.message).toBe('Business rule violated');
    });

    it('hides server error details behind a generic message', async () => {
        server.use(
            http.get(apiUrl(TEST_ENDPOINT), () => failResponse('NullReferenceException at OrderService.cs:42', 500)),
        );

        const error = await captureErrorAsync(apiClient.getAsync(TEST_ENDPOINT));

        expect(error.status).toBe(500);
        expect(error.message).toBe(UI_TEXT.errors.generic);
    });

    it('rejects responses that are not an API envelope', async () => {
        server.use(http.get(apiUrl(TEST_ENDPOINT), () => HttpResponse.text('<html></html>')));

        const error = await captureErrorAsync(apiClient.getAsync(TEST_ENDPOINT));

        expect(error.message).toBe(UI_TEXT.errors.invalidResponse);
    });

    it('maps network failures to a friendly message', async () => {
        server.use(http.get(apiUrl(TEST_ENDPOINT), () => HttpResponse.error()));

        const error = await captureErrorAsync(apiClient.getAsync(TEST_ENDPOINT));

        expect(error.status).toBe(0);
        expect(error.message).toBe(UI_TEXT.errors.network);
    });
});
