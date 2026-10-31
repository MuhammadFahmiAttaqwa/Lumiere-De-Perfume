export const ROUTES = {
    home: '/',
    // catalog: '/catalog',
    // catalogCategory: '/catalog/:categorySlug',
    // newArrivals: '/new-arrivals',
    // productDetail: '/products/:slug',
    // cart: '/cart',
    // login: '/login',
    // register: '/register',
    // checkout: '/checkout',
    // checkoutSuccess: '/checkout/success/:orderNo',
    // accountOrders: '/account/orders',
    // articles: '/articles',
    // articleDetail: '/articles/:slug',
    // academy: '/academy',
    // academyDetail: '/academy/:slug',
    // staticPage: '/pages/:slug',
    notFound: '*',
} as const;

// export const ROUTE_QUERY_PARAMS = {
//     returnUrl: 'returnUrl',
//     sort: 'sort',
//     query: 'q',
// } as const;

export const CATALOG_SORT = {
    newest: 'newest',
    popular: 'popular',
    priceAsc: 'price_asc',
    priceDesc: 'price_desc',
} as const;
