import { Icon, SafeLink } from '@/shared/ui';
import type { HeroSlide } from '../types';

interface HeroProductCardProps {
    slide: HeroSlide;
    titleClassName: string;
}

export function HeroProductCard({ slide, titleClassName }: HeroProductCardProps) {
    const { featuredProduct } = slide;

    return (
        <div className="absolute top-1/2 left-1/2 z-10 aspect-[331/452] w-[min(331px,62vw)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-card border border-white/70 shadow-2xl">
            <img src={featuredProduct.imageUrl} alt={featuredProduct.name} className="absolute inset-0 size-full object-cover" />
            <span
                aria-hidden="true"
                className={`pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[#2a2620]/85 ${titleClassName}`}
            >
                {slide.title}
            </span>
            <p className="absolute inset-x-3 top-5 text-center text-sm text-paper">{featuredProduct.name}</p>
            <SafeLink
                to={featuredProduct.ctaUrl}
                className="absolute inset-x-2 bottom-2 flex h-[54px] items-center rounded-card bg-ink/40 pr-1.5 pl-4 text-sm text-paper backdrop-blur-md transition hover:bg-ink/60"
            >
                <span className="flex-1 text-center">{featuredProduct.ctaLabel}</span>
                <span className="flex size-11 items-center justify-center rounded-card bg-paper text-ink">
                    <Icon name="arrowRight" className="size-4" />
                </span>
            </SafeLink>
        </div>
    );
}
