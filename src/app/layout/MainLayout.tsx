// import { Outlet, ScrollRestoration, useLocation } from 'react-router';
import { Outlet } from 'react-router';
import { Footer, Navbar } from '@/features/site';
// import { ROUTES } from '@/shared/constants/routes';
import { useHashScroll } from '@/shared/hooks/useHashScroll';
import { PanelHost } from '../panels/PanelHost';

export function MainLayout() {
    // const { pathname } = useLocation();
    // const navbarVariant = pathname === ROUTES.home ? 'overlay' : 'solid';
    useHashScroll();

    return (
        <div className="flex min-h-dvh flex-col">
            {/* <Navbar variant={navbarVariant} /> */}
            <Navbar />
            <main id="main-content" className="flex-1">
                <Outlet />
            </main>
            <Footer />
            {/* <ScrollRestoration /> */}
            <PanelHost />
        </div>
    );
}
