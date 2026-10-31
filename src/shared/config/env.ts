import * as z from 'zod/mini';

const CURRENCY_CODE_LENGTH = 3;
const MIN_LOCALE_LENGTH = 2;

const envSchema = z.object({
    VITE_API_BASE_URL: z.string().check(z.trim(), z.minLength(1)),
    VITE_ENABLE_MOCK: z.pipe(
        z.enum(['true', 'false']),
        z.transform((value) => value === 'true'),
    ),
    VITE_API_TIMEOUT_MS: z.coerce.number().check(z.int(), z.positive()),
    VITE_DEFAULT_CURRENCY: z.string().check(z.trim(), z.length(CURRENCY_CODE_LENGTH)),
    VITE_DEFAULT_LOCALE: z.string().check(z.trim(), z.minLength(MIN_LOCALE_LENGTH)),
});

const parsedEnv = envSchema.safeParse(import.meta.env);

if (!parsedEnv.success) {
    const invalidKeys = parsedEnv.error.issues.map((issue) => issue.path.join('.')).join(', ');
    throw new Error(`Invalid environment configuration: ${invalidKeys}`);
}

export const ENV = {
    apiBaseUrl: parsedEnv.data.VITE_API_BASE_URL,
    enableMock: parsedEnv.data.VITE_ENABLE_MOCK,
    apiTimeoutMs: parsedEnv.data.VITE_API_TIMEOUT_MS,
    defaultCurrency: parsedEnv.data.VITE_DEFAULT_CURRENCY,
    defaultLocale: parsedEnv.data.VITE_DEFAULT_LOCALE,
} as const;
