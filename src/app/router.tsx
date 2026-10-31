// import { createBrowserRouter, Navigate, type RouteObject } from 'react-router';
// import { CATALOG_SORT, ROUTE_QUERY_PARAMS, ROUTES } from '@/shared/constants/routes';
// import { PageLoader } from '@/shared/ui';
// import { MainLayout } from './layout/MainLayout';
// import { NotFoundPage } from './pages/NotFoundPage';
// import { RouteErrorPage } from './pages/RouteErrorPage';

// const NEW_ARRIVALS_TARGET = `${ROUTES.catalog}?${ROUTE_QUERY_PARAMS.sort}=${CATALOG_SORT.newest}`;

// export const appRoutes: RouteObject[] = [
//     {
//         path: ROUTES.home,
//         element: <MainLayout />,
//         errorElement: <RouteErrorPage />,
//         hydrateFallbackElement: <PageLoader />,
//         children: [
//             {
//                 errorElement: <RouteErrorPage />,
//                 children: [
//                     {
//                         index: true,
//                         lazy: async () => ({ Component: (await import('@/features/home')).HomePage }),
//                     },
//                     {
//                         path: ROUTES.catalog,
//                         lazy: async () => ({ Component: (await import('@/features/catalog')).CatalogPage }),
//                     },
//                     {
//                         path: ROUTES.catalogCategory,
//                         lazy: async () => ({ Component: (await import('@/features/catalog')).CatalogPage }),
//                     },
//                     {
//                         path: ROUTES.newArrivals,
//                         element: <Navigate to={NEW_ARRIVALS_TARGET} replace />,
//                     },
//                     {
//                         path: ROUTES.productDetail,
//                         lazy: async () => ({ Component: (await import('@/features/catalog')).ProductDetailPage }),
//                     },
//                     {
//                         path: ROUTES.cart,
//                         lazy: async () => ({ Component: (await import('@/features/cart')).CartPage }),
//                     },
//                     {
//                         lazy: async () => ({ Component: (await import('@/features/auth')).GuestOnlyRoute }),
//                         children: [
//                             {
//                                 path: ROUTES.login,
//                                 lazy: async () => ({ Component: (await import('@/features/auth')).LoginPage }),
//                             },
//                             {
//                                 path: ROUTES.register,
//                                 lazy: async () => ({ Component: (await import('@/features/auth')).RegisterPage }),
//                             },
//                         ],
//                     },
//                     {
//                         lazy: async () => ({ Component: (await import('@/features/auth')).RequireAuth }),
//                         children: [
//                             {
//                                 path: ROUTES.checkout,
//                                 lazy: async () => ({ Component: (await import('@/features/checkout')).CheckoutPage }),
//                             },
//                             {
//                                 path: ROUTES.checkoutSuccess,
//                                 lazy: async () => ({
//                                     Component: (await import('@/features/checkout')).CheckoutSuccessPage,
//                                 }),
//                             },
//                             {
//                                 path: ROUTES.accountOrders,
//                                 lazy: async () => ({
//                                     Component: (await import('@/features/checkout')).OrderHistoryPage,
//                                 }),
//                             },
//                         ],
//                     },
//                     {
//                         path: ROUTES.articles,
//                         lazy: async () => ({ Component: (await import('@/features/content')).ArticleListPage }),
//                     },
//                     {
//                         path: ROUTES.articleDetail,
//                         lazy: async () => ({ Component: (await import('@/features/content')).ArticleDetailPage }),
//                     },
//                     {
//                         path: ROUTES.academy,
//                         lazy: async () => ({ Component: (await import('@/features/content')).AcademyListPage }),
//                     },
//                     {
//                         path: ROUTES.academyDetail,
//                         lazy: async () => ({ Component: (await import('@/features/content')).AcademyDetailPage }),
//                     },
//                     {
//                         path: ROUTES.staticPage,
//                         lazy: async () => ({ Component: (await import('@/features/content')).StaticPage }),
//                     },
//                     {
//                         path: ROUTES.notFound,
//                         element: <NotFoundPage />,
//                     },
//                 ],
//             },
//         ],
//     },
// ];

// export function createAppRouter() {
//     return createBrowserRouter(appRoutes);
// }
