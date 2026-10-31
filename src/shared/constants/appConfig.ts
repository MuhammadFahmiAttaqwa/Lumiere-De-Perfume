export const APP_CONFIG = {
    brandName: 'Lumière de Peau',
    brandNameLines: ['Lumière', 'de Peau'],
    marqueeSeparator: '—',
    marqueeRepeat: 4,
} as const;

export const HTTP_STATUS = {
    unknown: 0,
    badRequest: 400,
    unauthorized: 401,
    notFound: 404,
    internalServerError: 500,
} as const;
