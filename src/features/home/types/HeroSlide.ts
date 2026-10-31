import type { HeroFeaturedProduct } from './HeroFeaturedProduct';

export interface HeroSlide {
    id: string;
    title: string;
    tagline: string;
    backgroundUrl: string;
    featuredProduct: HeroFeaturedProduct;
    sortOrder: number;
}
