import type { FooterContent } from './FooterContent';
import type { LinkItem } from './LinkItem';

export interface SiteSettings {
    brandName: string;
    logoUrl: string | null;
    navigation: LinkItem[];
    footer: FooterContent;
}
