import { isInternalPath } from './isInternalPath';

export function isSafeReturnUrl(url: string | null | undefined): url is string {
    return typeof url === 'string' && isInternalPath(url);
}
