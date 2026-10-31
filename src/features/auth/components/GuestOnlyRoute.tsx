// import { Navigate, Outlet } from 'react-router';
// import { ROUTES } from '@/shared/constants/routes';
// import { useSessionStore } from '../stores/useSessionStore';

// export function GuestOnlyRoute() {
//     const isAuthenticated = useSessionStore((state) => state.accessToken !== null);

//     if (isAuthenticated) {
//         return <Navigate to={ROUTES.home} replace />;
//     }

//     return <Outlet />;
// }
