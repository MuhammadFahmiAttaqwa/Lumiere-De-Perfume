import type { Gender } from '@/features/catalog';

export interface CategoryShowcaseContent {
    defaultCategorySlug: string;
    defaultGender: Gender | null;
}
