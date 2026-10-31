import type { CatalogSort } from './CatalogSort';
import type { Gender } from './Gender';

export interface ProductListQuery {
    category?: string;
    gender?: Gender;
    sort?: CatalogSort;
    q?: string;
    minPrice?: number;
    maxPrice?: number;
    pageSize: number;
}
