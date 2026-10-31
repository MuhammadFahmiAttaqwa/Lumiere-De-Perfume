import { QueryClient } from '@tanstack/react-query';
import { ApiError } from '@/shared/api';
import { QUERY_RETRY } from '@/shared/constants/cacheTime';

function shouldRetry(
    failureCount: number,
    error: Error,
): boolean {
    if (error instanceof ApiError && error.isClientError) {
        return false;
    }

    return failureCount < QUERY_RETRY.maxAttempts;
}

export function createQueryClient(): QueryClient {
    return new QueryClient({
        defaultOptions: {
            queries: {
                retry: shouldRetry,
                refetchOnWindowFocus: false,
            },
            mutations: {
                retry: false,
            },
        },
    });
}
