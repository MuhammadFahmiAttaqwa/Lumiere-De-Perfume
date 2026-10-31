import { UI_TEXT } from '@/shared/constants/uiText';
import { cn } from '@/shared/lib/cn';
import type { Category } from '../types';

interface CategoryTabsProps {
    categories: Category[];
    activeSlug: string;
    onSelect: (slug: string) => void;
}

export function CategoryTabs({ categories, activeSlug, onSelect }: CategoryTabsProps) {
    return (
        <div className="border-b border-line">
            <div
                role="tablist"
                aria-label={UI_TEXT.catalog.categories}
                className="mx-auto flex max-w-[1440px] gap-6 overflow-x-auto px-4 py-4 text-sm whitespace-nowrap [scrollbar-width:none] md:gap-8 md:px-8"
            >
                {categories.map((category) => {
                    const isActive = category.slug === activeSlug;

                    return (
                        <button
                            key={category.id}
                            type="button"
                            role="tab"
                            aria-selected={isActive}
                            onClick={() => onSelect(category.slug)}
                            className={cn('transition-colors', isActive ? 'text-ink' : 'text-muted hover:text-ink')}
                        >
                            {category.name}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
