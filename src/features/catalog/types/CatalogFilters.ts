import type { CatalogSort } from './CatalogSort';
import type { Gender } from './Gender';

export interface CatalogFilters {
    category: string;
    gender: Gender | null;
    sort: CatalogSort | null;
    q: string | null;
    minPrice: number | null;
    maxPrice: number | null;
}
