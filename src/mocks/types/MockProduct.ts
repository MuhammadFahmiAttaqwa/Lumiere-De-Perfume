import type { ProductSummary } from '@/features/catalog';

export interface MockProduct extends ProductSummary {
    categorySlug: string;
    popularity: number;
    createdAt: string;
}
