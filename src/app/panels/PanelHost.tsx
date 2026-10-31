import { useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { useSessionStore } from '@/features/auth';
import {
    PANEL_KEYS,
    PANEL_PARAMS,
    PANELS_FOR_GUEST_ONLY,
    PANELS_REQUIRING_AUTH,
} from '@/shared/constants/panels';
import { usePanelNavigation } from '@/shared/hooks/usePanelNavigation';
import { Drawer, PanelPlaceholder } from '@/shared/ui';
import { resolveOverlay } from './resolveOverlay';

export function PanelHost() {
    const [searchParams] = useSearchParams();
    const { closeOverlay, replaceOverlay } = usePanelNavigation();
    const isAuthenticated = useSessionStore((state) => state.accessToken !== null);

    const overlay = resolveOverlay(searchParams);
    const panelKey = overlay?.panelKey ?? null;
    const needsLogin = panelKey !== null && PANELS_REQUIRING_AUTH.includes(panelKey) && !isAuthenticated;
    const isGuestOnlyViolation = panelKey !== null && PANELS_FOR_GUEST_ONLY.includes(panelKey) && isAuthenticated;

    useEffect(() => {
        if (needsLogin && panelKey) {
            replaceOverlay({ [PANEL_PARAMS.panel]: PANEL_KEYS.login, [PANEL_PARAMS.returnPanel]: panelKey });
        }
    }, [needsLogin, panelKey, replaceOverlay]);

    useEffect(() => {
        if (isGuestOnlyViolation) {
            closeOverlay();
        }
    }, [isGuestOnlyViolation, closeOverlay]);

    if (!overlay || needsLogin || isGuestOnlyViolation) {
        return null;
    }

    return (
        <Drawer title={overlay.title} onClose={closeOverlay}>
            <PanelPlaceholder detail={overlay.detail} />
        </Drawer>
    );
}
