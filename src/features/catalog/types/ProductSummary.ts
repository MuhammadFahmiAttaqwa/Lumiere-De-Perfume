import type { Gender } from './Gender';

export interface ProductSummary {
    id: string;
    slug: string;
    name: string;
    brand: string;
    price: number;
    currency: string;
    thumbnailUrl: string;
    gender: Gender;
    isNew: boolean;
    stock: number;
}
