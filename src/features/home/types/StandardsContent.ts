import type { StandardItem } from './StandardItem';

export interface StandardsContent {
    badge: string;
    title: string;
    description: string;
    imageUrl: string;
    featuredImageUrl: string;
    ctaLabel: string;
    ctaUrl: string;
    displayText: string;
    items: StandardItem[];
}
