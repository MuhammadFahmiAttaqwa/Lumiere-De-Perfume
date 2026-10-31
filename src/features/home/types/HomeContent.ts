import type { CategoryShowcaseContent } from './CategoryShowcaseContent';
import type { HeroSlide } from './HeroSlide';
import type { IconsContent } from './IconsContent';
import type { StandardsContent } from './StandardsContent';

export interface HomeContent {
    heroSlides: HeroSlide[];
    categoryShowcase: CategoryShowcaseContent;
    standards: StandardsContent;
    icons: IconsContent;
}
