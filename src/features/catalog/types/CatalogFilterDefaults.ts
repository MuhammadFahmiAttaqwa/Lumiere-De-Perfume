import type { Gender } from './Gender';

export interface CatalogFilterDefaults {
    categorySlug: string;
    gender: Gender | null;
}
