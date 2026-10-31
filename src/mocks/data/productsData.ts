import type { Gender } from '@/features/catalog';
import type { MockProduct } from '../types/MockProduct';
import { publicAssetUrl } from '@/shared/lib/publicAssetUrl';

const CURRENCY = 'IDR';
const IMAGE_BASE = publicAssetUrl('images/products');
// const DESIGN_IMAGE_BASE = '/images/design';

// const DESIGN_PRODUCT_IMAGES: Record<string, string> = {
//     'p-101': `${DESIGN_IMAGE_BASE}/product-smooth-balance-gel-serum.png`,
//     'p-102': `${DESIGN_IMAGE_BASE}/product-exfoliating-face-scrub.png`,
//     'p-103': `${DESIGN_IMAGE_BASE}/product-sos-blemish-gel.png`,
//     'p-105': `${DESIGN_IMAGE_BASE}/product-blemish-age-defy-serum.png`,
//     'p-106': `${DESIGN_IMAGE_BASE}/product-bright-intense-day-serum.png`,
// };

const ASSET_PRODUCT_IMAGES: Record<string, string> = {
    'p-101': `${IMAGE_BASE}/smooth-balance-gel-serum.webp`,
    'p-102': `${IMAGE_BASE}/exfoliating-face-scrub.webp`,
    'p-103': `${IMAGE_BASE}/sos-blemish-gel.webp`,
    'p-104': `${IMAGE_BASE}/ultra-light-uv-age-day-shield-spf50.webp`,
    'p-105': `${IMAGE_BASE}/blemish-age-defy-serum.webp`,
    'p-106': `${IMAGE_BASE}/aha-peel-solution.webp`,
};

type ProductRow = readonly [
    id: string,
    slug: string,
    name: string,
    brand: string,
    price: number,
    categorySlug: string,
    gender: Gender,
    image: string,
    stock: number,
    popularity: number,
    createdAt: string,
];

const PRODUCT_ROWS: ProductRow[] = [
    ['p-101', 'smooth-balance-gel-serum', 'Smooth & Balance Gel-Serum', 'Wellosophy', 259000, 'serum-treatment',
        'women', 'bottle-pink', 24, 88, '2026-10-21'],
    ['p-102', 'exfoliating-face-scrub', 'Exfoliating Face Scrub', 'Optimals', 69000, 'serum-treatment',
        'women', 'tube-teal', 40, 72, '2026-09-12'],
    ['p-103', 'sos-blemish-gel', 'SOS Blemish Gel', 'Pure Skin', 100000, 'serum-treatment',
        'women', 'tube-orange', 18, 81, '2026-08-30'],
    ['p-104', 'ultra-light-uv-age-day-shield-spf50', 'Proceuticals Ultra Light UV-Age Day Shield + SPF 50', 'NovAge',
        489000, 'sun-care', 'unisex', 'pump-white', 30, 97, '2026-07-15'],
    // ['p-105', 'blemish-age-defy-serum', 'Blemish + Age Defy Serum', 'Novage+', 529000, 'serum-treatment',
    //     'unisex', 'bottle-blue', 12, 95, '2026-06-02'],
    ['p-105', 'blemish-age-defy-serum', 'Blemish + Age Defy Serum', 'Novage+', 529000, 'serum-treatment',
        'men', 'bottle-blue', 12, 95, '2026-06-02'],
    // ['p-106', 'bright-intense-day-serum', 'Bright Intense Day Serum', 'Novage+', 549000, 'serum-treatment',
    //     'men', 'bottle-clear', 9, 93, '2026-10-05'],
    ['p-106', 'aha-peel-solution', 'Proceuticals AHA Peel Solution', 'Novage+', 549000, 'serum-treatment',
        'men', 'bottle-clear', 9, 93, '2026-10-05'],
    ['p-107', 'hydra-veil-moisture-cream', 'Hydra Veil Moisture Cream', 'Wellosophy', 219000, 'moisturisers',
        'women', 'jar-cream', 35, 76, '2026-10-28'],
    ['p-108', 'barrier-repair-gel-cream', 'Barrier Repair Gel Cream', 'Optimals', 159000, 'moisturisers',
        'unisex', 'jar-sage', 50, 64, '2026-05-19'],
    ['p-109', 'men-daily-hydrator', 'Daily Hydrator for Men', 'North for Men', 139000, 'moisturisers',
        'men', 'tube-lilac', 44, 58, '2026-04-11'],
    ['p-110', 'silk-foam-daily-cleanser', 'Silk Foam Daily Cleanser', 'Optimals', 89000, 'cleansers',
        'women', 'tube-coral', 60, 84, '2026-10-30'],
    ['p-111', 'charcoal-deep-cleanser', 'Charcoal Deep Cleanser', 'North for Men', 99000, 'cleansers',
        'men', 'tube-teal', 38, 61, '2026-03-08'],
    ['p-112', 'micellar-cleansing-water', 'Micellar Cleansing Water', 'Love Nature', 79000, 'cleansers',
        'unisex', 'bottle-clear', 70, 69, '2026-02-14'],
    ['p-113', 'rose-hydrating-mist', 'Rose Hydrating Mist', 'Love Nature', 109000, 'toner-essences-mist',
        'women', 'bottle-pink', 26, 66, '2026-09-25'],
    ['p-114', 'balancing-essence-toner', 'Balancing Essence Toner', 'Optimals', 129000, 'toner-essences-mist',
        'unisex', 'bottle-blue', 33, 70, '2026-01-30'],
    ['p-115', 'mens-refresh-toner', 'Refresh Toner for Men', 'North for Men', 99000, 'toner-essences-mist',
        'men', 'bottle-clear', 21, 52, '2025-12-12'],
    ['p-116', 'bright-eye-cream', 'Bright Eye Cream', 'NovAge', 299000, 'eye-lip-care',
        'women', 'jar-cream', 15, 79, '2026-08-08'],
    ['p-117', 'tinted-lip-balm-spf15', 'Tinted Lip Balm SPF 15', 'Love Nature', 59000, 'eye-lip-care',
        'women', 'tube-coral', 80, 74, '2026-10-12'],
    ['p-118', 'anti-fatigue-eye-gel', 'Anti-Fatigue Eye Gel', 'North for Men', 149000, 'eye-lip-care',
        'men', 'tube-lilac', 0, 55, '2026-06-20'],
    ['p-119', 'daily-sun-fluid-spf30', 'Daily Sun Fluid SPF 30', 'Optimals', 159000, 'sun-care',
        'unisex', 'tube-orange', 42, 77, '2026-09-01'],
    ['p-120', 'tinted-sunscreen-spf50', 'Tinted Sunscreen SPF 50', 'Wellosophy', 189000, 'sun-care',
        'women', 'tube-coral', 29, 83, '2026-10-18'],
    ['p-121', 'overnight-renewal-mask', 'Overnight Renewal Mask', 'NovAge', 279000, 'mask',
        'women', 'jar-sage', 17, 86, '2026-10-25'],
    ['p-122', 'clay-purifying-mask', 'Clay Purifying Mask', 'Love Nature', 99000, 'mask',
        'unisex', 'jar-cream', 48, 63, '2026-03-27'],
    // ['p-123', 'relax-recharge-sleep-face-elixir', 'Relax & Recharge Sleep Face Elixir', 'Wellosophy', 329000,
    //     'serum-treatment', 'women', 'pump-amber', 20, 91, '2026-10-29'],
    ['p-123', 'relax-recharge-sleep-face-elixir', 'Relax & Recharge Sleep Face Elixir', 'Wellosophy', 329000,
        'moisturisers', 'women', 'pump-amber', 20, 91, '2026-05-01'],
];

export const PRODUCTS_DATA: MockProduct[] = PRODUCT_ROWS.map(
    ([id, slug, name, brand, price, categorySlug, gender, image, stock, popularity, createdAt]) => ({
        id,
        slug,
        name,
        brand,
        price,
        currency: CURRENCY,
        // thumbnailUrl: `${IMAGE_BASE}/${image}.svg`,
        // thumbnailUrl: DESIGN_PRODUCT_IMAGES[id] ?? `${IMAGE_BASE}/${image}.svg`,
        thumbnailUrl: ASSET_PRODUCT_IMAGES[id] ?? `${IMAGE_BASE}/${image}.svg`,
        gender,
        isNew: createdAt >= '2026-10-01',
        stock,
        categorySlug,
        popularity,
        createdAt,
    }),
);
