export const SECTION_IDS = {
    home: 'home',
    catalog: 'catalog',
    standards: 'standards',
    icons: 'icons',
    contact: 'contact',
} as const;

export const SECTION_ORDER = [
    SECTION_IDS.home,
    SECTION_IDS.catalog,
    SECTION_IDS.standards,
    SECTION_IDS.icons,
    SECTION_IDS.contact,
] as const;

export const SECTION_CONFIG = {
    lazyRootMargin: '400px 0px',
    spyRootMargin: '-45% 0px -50% 0px',
    navbarScrolledOffsetPx: 24,
    hashScrollSettleMs: 2500,
} as const;
