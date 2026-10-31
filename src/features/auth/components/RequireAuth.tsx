// import { Navigate, Outlet, useLocation } from 'react-router';
// import { ROUTE_QUERY_PARAMS, ROUTES } from '@/shared/constants/routes';
// import { useSessionStore } from '../stores/useSessionStore';

// export function RequireAuth() {
//     const location = useLocation();
//     const isAuthenticated = useSessionStore((state) => state.accessToken !== null);

//     if (!isAuthenticated) {
//         const returnUrl = `${location.pathname}${location.search}`;
//         const searchParams = new URLSearchParams({ [ROUTE_QUERY_PARAMS.returnUrl]: returnUrl });

//         return <Navigate to={`${ROUTES.login}?${searchParams.toString()}`} replace />;
//     }

//     return <Outlet />;
// }
