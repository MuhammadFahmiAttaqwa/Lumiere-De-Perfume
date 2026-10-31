import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { PANEL_HISTORY_STATE_KEY, PANEL_PARAMS } from '@/shared/constants/panels';
import { toSearchString, withOverlay, withoutOverlay } from '@/shared/lib/overlaySearch';

function isOpenedFromApp(state: unknown): boolean {
    return typeof state === 'object' && state !== null && PANEL_HISTORY_STATE_KEY in state;
}

export function usePanelNavigation() {
    const location = useLocation();
    const navigate = useNavigate();

    const openOverlay = useCallback(
        (overlay: Record<string, string>) => {
            navigate(
                { pathname: location.pathname, search: toSearchString(withOverlay(location.search, overlay)) },
                { state: { [PANEL_HISTORY_STATE_KEY]: true } },
            );
        },
        [location.pathname, location.search, navigate],
    );

    const openPanel = useCallback(
        (panelKey: string) => openOverlay({ [PANEL_PARAMS.panel]: panelKey }),
        [openOverlay],
    );

    const openProduct = useCallback(
        (slug: string) => openOverlay({ [PANEL_PARAMS.product]: slug }),
        [openOverlay],
    );

    const replaceOverlay = useCallback(
        (overlay: Record<string, string>) => {
            navigate(
                { pathname: location.pathname, search: toSearchString(withOverlay(location.search, overlay)) },
                { replace: true, state: location.state },
            );
        },
        [location.pathname, location.search, location.state, navigate],
    );

    const closeOverlay = useCallback(() => {
        if (isOpenedFromApp(location.state)) {
            navigate(-1);
            return;
        }

        navigate(
            { pathname: location.pathname, search: toSearchString(withoutOverlay(location.search)) },
            { replace: true },
        );
    }, [location.pathname, location.search, location.state, navigate]);

    return { openPanel, openProduct, replaceOverlay, closeOverlay };
}
