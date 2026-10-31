import { OVERLAY_PARAM_NAMES } from '@/shared/constants/panels';

export function withoutOverlay(search: string | URLSearchParams): URLSearchParams {
    const params = new URLSearchParams(search);

    OVERLAY_PARAM_NAMES.forEach((name) => params.delete(name));
    return params;
}

export function withOverlay(
    search: string | URLSearchParams,
    overlay: Record<string, string>,
): URLSearchParams {
    const params = withoutOverlay(search);

    Object.entries(overlay).forEach(([name, value]) => params.set(name, value));
    return params;
}

export function toSearchString(params: URLSearchParams): string {
    const value = params.toString();
    return value.length > 0 ? `?${value}` : '';
}
