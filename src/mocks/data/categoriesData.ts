import type { Category } from '@/features/catalog';

export const CATEGORIES_DATA: Omit<Category, 'productCount'>[] = [
    { id: 'c-1', name: 'All Skincare', slug: 'all', imageUrl: null, sortOrder: 1 },
    { id: 'c-2', name: 'Moisturisers', slug: 'moisturisers', imageUrl: '/images/category-moisturisers.svg', sortOrder: 2 },
    { id: 'c-3', name: 'Cleansers', slug: 'cleansers', imageUrl: '/images/category-cleansers.svg', sortOrder: 3 },
    {
        id: 'c-4',
        name: 'Toner Essences & Mist',
        slug: 'toner-essences-mist',
        imageUrl: '/images/category-toner.svg',
        sortOrder: 4,
    },
    { id: 'c-5', name: 'Eye & Lip care', slug: 'eye-lip-care', imageUrl: '/images/category-eye-lip.svg', sortOrder: 5 },
    {
        id: 'c-6',
        name: 'Serum & Treatment',
        slug: 'serum-treatment',
        // imageUrl: '/images/category-serum.svg',
        // imageUrl: '/images/design/category-serum-treatment.png',
        imageUrl: '/images/catalog/category-serum-treatment.webp',
        sortOrder: 6,
    },
    { id: 'c-7', name: 'Sun Care', slug: 'sun-care', imageUrl: '/images/category-sun-care.svg', sortOrder: 7 },
    { id: 'c-8', name: 'Mask', slug: 'mask', imageUrl: '/images/category-mask.svg', sortOrder: 8 },
];
