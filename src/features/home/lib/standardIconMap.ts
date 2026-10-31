import type { IconName } from '@/shared/ui';

const STANDARD_ICON_MAP: Record<string, IconName> = {
    mortar: 'mortar',
    globe: 'globe',
    'face-plus': 'facePlus',
    leaf: 'leaf',
    drop: 'drop',
    sparkle: 'sparkle',
};

const FALLBACK_ICON: IconName = 'sparkle';

export function resolveStandardIcon(iconKey: string | null): IconName {
    return (iconKey && STANDARD_ICON_MAP[iconKey]) || FALLBACK_ICON;
}
