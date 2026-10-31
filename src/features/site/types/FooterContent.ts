import type { LinkItem } from './LinkItem';

export interface FooterContent {
    topLinks: LinkItem[];
    links: LinkItem[];
    ctaTitle: string;
    ctaLabel: string;
    ctaUrl: string;
    missionTitle: string;
    mission: string;
    contactTitle: string;
    contactEmail: string;
    contactPhone: string;
    imageUrl: string | null;
    marqueeText: string;
}
