import { ENV } from '@/shared/config/env';

const LEADING_SLASHES = /^\/+/;

export function publicAssetUrl(path: string): string {
    return `${ENV.basePath}${path.replace(LEADING_SLASHES, '')}`;
}
