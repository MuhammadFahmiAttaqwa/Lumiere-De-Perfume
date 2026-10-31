import type { CATALOG_SORT } from '@/shared/constants/routes';

export type CatalogSort = (typeof CATALOG_SORT)[keyof typeof CATALOG_SORT];
