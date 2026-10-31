import { isInternalPath } from './isInternalPath';

const SAFE_EXTERNAL_PROTOCOLS = ['http:', 'https:', 'mailto:', 'tel:'];

export function isSafeUrl(url: string | null | undefined): url is string {
    if (typeof url !== 'string') {
        return false;
    }

    const trimmed = url.trim();

    if (trimmed.length === 0) {
        return false;
    }

    if (isInternalPath(trimmed)) {
        return true;
    }

    try {
        return SAFE_EXTERNAL_PROTOCOLS.includes(new URL(trimmed).protocol);
    } catch {
        return false;
    }
}
