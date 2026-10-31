export const CATALOG_PARAMS = {
    category: 'category',
    gender: 'gender',
    sort: 'sort',
    query: 'q',
    minPrice: 'minPrice',
    maxPrice: 'maxPrice',
} as const;

export const CATALOG_CONFIG = {
    pageSize: 6,
    allCategorySlug: 'all',
    allGenderValue: 'all',
} as const;

export const GENDERS = {
    women: 'women',
    men: 'men',
    unisex: 'unisex',
} as const;
