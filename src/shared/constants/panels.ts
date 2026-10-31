export const PANEL_KEYS = {
    search: 'search',
    filter: 'filter',
    cart: 'cart',
    login: 'login',
    register: 'register',
    checkout: 'checkout',
    orders: 'orders',
    articles: 'articles',
    academy: 'academy',
} as const;

export const PANEL_PARAMS = {
    panel: 'panel',
    product: 'product',
    article: 'article',
    page: 'page',
    returnPanel: 'returnPanel',
} as const;

export const OVERLAY_PARAM_NAMES = [
    PANEL_PARAMS.panel,
    PANEL_PARAMS.product,
    PANEL_PARAMS.article,
    PANEL_PARAMS.page,
    PANEL_PARAMS.returnPanel,
] as const;

export const PANELS_REQUIRING_AUTH: readonly string[] = [PANEL_KEYS.checkout, PANEL_KEYS.orders];

export const PANELS_FOR_GUEST_ONLY: readonly string[] = [PANEL_KEYS.login, PANEL_KEYS.register];

export const PANEL_HISTORY_STATE_KEY = 'openedFromApp';
