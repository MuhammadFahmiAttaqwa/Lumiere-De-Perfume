import { describe, expect, it } from 'vitest';
import { ENV } from '@/shared/config/env';
import { publicAssetUrl } from './publicAssetUrl';

describe('publicAssetUrl', () => {
    it('prefixes public assets with the deployment base path', () => {
        expect(publicAssetUrl('/images/hero/hero-flower.webp')).toBe(`${ENV.basePath}images/hero/hero-flower.webp`);
        expect(publicAssetUrl('images/a.webp')).toBe(`${ENV.basePath}images/a.webp`);
    });

    it('exposes a router basename without a trailing slash', () => {
        expect(ENV.basePath.endsWith('/')).toBe(true);
        expect(ENV.routerBasename === '/' || !ENV.routerBasename.endsWith('/')).toBe(true);
    });
});
