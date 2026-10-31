import { useMemo } from 'react';
import { SECTION_IDS } from '@/shared/constants/sections';
import { sortByOrder } from '@/shared/lib/sortByOrder';
import { Icon, SafeLink } from '@/shared/ui';
import { StandardCard } from '../components/StandardCard';
import type { StandardsContent } from '../types';

const STAGGERED_POSITIONS = [
    'lg:col-start-1 lg:row-start-1',
    'lg:col-start-2 lg:row-start-1',
    'lg:col-start-2 lg:row-start-2',
    'lg:col-start-3 lg:row-start-2',
];

interface StandardsSectionProps {
    content: StandardsContent;
}

export function StandardsSection({ content }: StandardsSectionProps) {
    const items = useMemo(() => sortByOrder(content.items), [content.items]);

    return (
        <section id={SECTION_IDS.standards} className="scroll-mt-16 bg-paper px-4 py-20 md:px-8">
            <div className="mx-auto grid max-w-[1440px] gap-14 lg:grid-cols-2 lg:items-center">
                <div className="@container relative aspect-[645/850] overflow-hidden">
                    <img src={content.imageUrl} alt="" loading="lazy" className="absolute inset-0 size-full object-cover" />
                    <div className="absolute top-1/2 left-1/2 aspect-[331/452] w-[51%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-card border-2 border-paper">
                        <img
                            src={content.featuredImageUrl}
                            alt=""
                            loading="lazy"
                            className="absolute inset-0 size-full object-cover"
                        />
                    </div>
                    <SafeLink
                        to={content.ctaUrl}
                        className="absolute top-1/2 left-1/2 flex h-[54px] w-[48%] -translate-x-1/2 -translate-y-1/2 items-center rounded-card bg-ink/30 pr-1.5 pl-4 text-sm text-paper backdrop-blur-md transition hover:bg-ink/50"
                    >
                        <span className="flex-1 text-center">{content.ctaLabel}</span>
                        <span className="flex size-11 items-center justify-center rounded-card bg-paper text-ink">
                            <Icon name="arrowRight" className="size-4" />
                        </span>
                    </SafeLink>
                    <p
                        aria-hidden="true"
                        className="absolute -bottom-[0.18em] left-[4cqw] font-display text-[11cqw] leading-none whitespace-nowrap text-paper"
                    >
                        {content.displayText}
                    </p>
                </div>

                <div className="flex flex-col items-center text-center">
                    <span className="rounded-card border border-line px-4 py-1.5 text-xs text-muted">{content.badge}</span>
                    <h2 className="mt-6 text-4xl font-normal tracking-tight md:text-5xl">{content.title}</h2>
                    <p className="mt-4 max-w-md text-xs leading-relaxed text-muted">{content.description}</p>
                    <ul className="mt-12 grid w-full max-w-[670px] grid-cols-2 gap-2 lg:grid-cols-3">
                        {items.map((item, index) => (
                            <StandardCard key={item.id} item={item} className={STAGGERED_POSITIONS[index]} />
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
