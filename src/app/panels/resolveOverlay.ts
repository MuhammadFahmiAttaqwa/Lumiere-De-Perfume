import { PANEL_KEYS, PANEL_PARAMS } from '@/shared/constants/panels';
import { UI_TEXT } from '@/shared/constants/uiText';
import type { ActiveOverlay } from './ActiveOverlay';

const PANEL_TITLES: Record<string, string> = {
    [PANEL_KEYS.search]: UI_TEXT.panelTitles.search,
    [PANEL_KEYS.filter]: UI_TEXT.panelTitles.filter,
    [PANEL_KEYS.cart]: UI_TEXT.panelTitles.cart,
    [PANEL_KEYS.login]: UI_TEXT.panelTitles.login,
    [PANEL_KEYS.register]: UI_TEXT.panelTitles.register,
    [PANEL_KEYS.checkout]: UI_TEXT.panelTitles.checkout,
    [PANEL_KEYS.orders]: UI_TEXT.panelTitles.orders,
    [PANEL_KEYS.articles]: UI_TEXT.panelTitles.articles,
    [PANEL_KEYS.academy]: UI_TEXT.panelTitles.academy,
};

const DETAIL_OVERLAYS = [
    { param: PANEL_PARAMS.product, title: UI_TEXT.panelTitles.product },
    { param: PANEL_PARAMS.article, title: UI_TEXT.panelTitles.article },
    { param: PANEL_PARAMS.page, title: UI_TEXT.panelTitles.page },
] as const;

export function isKnownPanel(value: string | null): value is string {
    return value !== null && Object.hasOwn(PANEL_TITLES, value);
}

export function resolveOverlay(params: URLSearchParams): ActiveOverlay | null {
    for (const overlay of DETAIL_OVERLAYS) {
        const value = params.get(overlay.param)?.trim();

        if (value) {
            return { panelKey: null, title: overlay.title, detail: value };
        }
    }

    const panelKey = params.get(PANEL_PARAMS.panel);

    if (!isKnownPanel(panelKey)) {
        return null;
    }

    return { panelKey, title: PANEL_TITLES[panelKey] ?? panelKey, detail: null };
}
