import { useCallback, useEffect, useMemo, useState } from 'react';
import { HERO_CONFIG } from '@/shared/constants/heroConfig';
import { SECTION_IDS } from '@/shared/constants/sections';
import { UI_TEXT } from '@/shared/constants/uiText';
import { cn } from '@/shared/lib/cn';
import { prefersReducedMotion } from '@/shared/lib/scrollToSection';
import { sortByOrder } from '@/shared/lib/sortByOrder';
import { SafeLink } from '@/shared/ui';
import { HeroProductCard } from '../components/HeroProductCard';
import type { HeroSlide } from '../types';

const TITLE_CLASS_NAME = 'text-[clamp(3.25rem,11vw,9.5rem)] leading-none font-light tracking-[-0.04em]';
const NEXT_SECTION_ANCHOR = `/#${SECTION_IDS.catalog}`;

function formatCounter(value: number): string {
    return String(value).padStart(HERO_CONFIG.counterPadLength, HERO_CONFIG.counterPadChar);
}

interface HeroSectionProps {
    slides: HeroSlide[];
}

export function HeroSection({ slides }: HeroSectionProps) {
    const orderedSlides = useMemo(() => sortByOrder(slides), [slides]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const total = orderedSlides.length;

    const goNext = useCallback(() => setActiveIndex((index) => (index + 1) % total), [total]);
    const goPrevious = useCallback(() => setActiveIndex((index) => (index - 1 + total) % total), [total]);

    useEffect(() => {
        if (isPaused || total <= 1 || prefersReducedMotion()) {
            return undefined;
        }

        const timerId = window.setInterval(goNext, HERO_CONFIG.autoplayIntervalMs);
        return () => window.clearInterval(timerId);
    }, [goNext, isPaused, total]);

    const activeSlide = orderedSlides[activeIndex];

    if (!activeSlide) {
        return <section id={SECTION_IDS.home} className="h-dvh min-h-[640px] bg-ink" />;
    }

    const progressPercent = ((activeIndex + 1) / total) * 100;

    return (
        <section
            id={SECTION_IDS.home}
            aria-roledescription="carousel"
            aria-label={UI_TEXT.hero.regionLabel}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocus={() => setIsPaused(true)}
            onBlur={() => setIsPaused(false)}
            className="relative flex h-dvh min-h-[640px] flex-col overflow-hidden bg-ink text-paper"
        >
            {orderedSlides.map((slide, index) => (
                <img
                    key={slide.id}
                    src={slide.backgroundUrl}
                    alt=""
                    fetchPriority={index === 0 ? 'high' : 'auto'}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    className={cn(
                        'absolute inset-0 size-full object-cover transition-opacity duration-1000 motion-reduce:transition-none',
                        index === activeIndex ? 'opacity-100' : 'opacity-0',
                    )}
                />
            ))}
            <div className="absolute inset-0 bg-ink/10" aria-hidden="true" />

            <div className="relative flex-1" aria-live={isPaused ? 'polite' : 'off'}>
                <h1
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap ${TITLE_CLASS_NAME}`}
                >
                    {activeSlide.title}
                </h1>
                <HeroProductCard key={activeSlide.id} slide={activeSlide} titleClassName={TITLE_CLASS_NAME} />
            </div>

            <div className="relative mx-auto w-full max-w-[1440px] px-4 pb-8 md:px-8">
                <div className="relative h-px bg-white/25">
                    <span
                        className="absolute inset-y-0 left-0 bg-paper transition-[width] duration-700"
                        style={{ width: `${progressPercent}%` }}
                    />
                </div>
                <div className="mt-5 grid grid-cols-[1fr_auto_1fr] items-center text-[0.7rem] tracking-[0.2em] uppercase">
                    <span className="hidden md:block">{activeSlide.tagline}</span>
                    <div className="col-start-2 flex items-center gap-6">
                        <button
                            type="button"
                            onClick={goPrevious}
                            aria-label={UI_TEXT.hero.previousSlide}
                            className="text-white/60 uppercase transition-colors hover:text-paper"
                        >
                            {UI_TEXT.hero.previous}
                        </button>
                        <span>
                            <span>{formatCounter(activeIndex + 1)}</span>
                            <span className="text-white/60">
                                {` ${UI_TEXT.hero.counterSeparator} ${formatCounter(total)}`}
                            </span>
                        </span>
                        <button
                            type="button"
                            onClick={goNext}
                            aria-label={UI_TEXT.hero.nextSlide}
                            className="uppercase transition-opacity hover:opacity-70"
                        >
                            {UI_TEXT.hero.next}
                        </button>
                    </div>
                    <SafeLink
                        to={NEXT_SECTION_ANCHOR}
                        className="hidden justify-self-end transition-opacity hover:opacity-70 md:block"
                    >
                        {UI_TEXT.hero.scrollForMore}
                    </SafeLink>
                </div>
            </div>
        </section>
    );
}
