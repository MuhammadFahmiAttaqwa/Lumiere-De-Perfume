import { createBrowserRouter, type RouteObject } from 'react-router';
import { HomePage } from '@/features/home';
import { ENV } from '@/shared/config/env';
import { ROUTES } from '@/shared/constants/routes';
import { MainLayout } from './layout/MainLayout';
import { NotFoundPage } from './pages/NotFoundPage';
import { RouteErrorPage } from './pages/RouteErrorPage';

export const appRoutes: RouteObject[] = [
    {
        path: ROUTES.home,
        element: <MainLayout />,
        errorElement: <RouteErrorPage />,
        children: [
            {
                errorElement: <RouteErrorPage />,
                children: [
                    {
                        index: true,
                        element: <HomePage />,
                    },
                    {
                        path: ROUTES.notFound,
                        element: <NotFoundPage />,
                    },
                ],
            },
        ],
    },
];

export function createAppRouter() {
    return createBrowserRouter(appRoutes, { basename: ENV.routerBasename });
}
