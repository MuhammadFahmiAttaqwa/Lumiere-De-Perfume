const ONE_MINUTE_MS = 60 * 1000;

export const STALE_TIME = {
    content: 10 * ONE_MINUTE_MS,
    products: ONE_MINUTE_MS,
    none: 0,
} as const;

export const QUERY_RETRY = {
    maxAttempts: 2,
} as const;
