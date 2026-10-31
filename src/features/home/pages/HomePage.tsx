import { useMemo } from 'react';
import { CatalogSection, type CatalogFilterDefaults } from '@/features/catalog';
import { CATALOG_CONFIG } from '@/shared/constants/catalog';
import { SECTION_IDS } from '@/shared/constants/sections';
import { ErrorState, Skeleton } from '@/shared/ui';
import { useHomeContent } from '../hooks/useHomeContent';
import { HeroSection } from '../sections/HeroSection';
import { IconsSection } from '../sections/IconsSection';
import { StandardsSection } from '../sections/StandardsSection';

export function HomePage() {
    const { data, isPending, isError, refetch } = useHomeContent();
    const showcase = data?.categoryShowcase;

    const catalogDefaults = useMemo<CatalogFilterDefaults>(
        () => ({
            categorySlug: showcase?.defaultCategorySlug ?? CATALOG_CONFIG.allCategorySlug,
            gender: showcase?.defaultGender ?? null,
        }),
        [showcase],
    );

    return (
        <>
            {data ? <HeroSection slides={data.heroSlides} /> : null}
            {isPending ? (
                <section id={SECTION_IDS.home} className="h-dvh min-h-[640px] bg-ink">
                    <Skeleton className="size-full rounded-none bg-ink-soft" />
                </section>
            ) : null}
            {isError ? (
                <section id={SECTION_IDS.home} className="flex min-h-[60vh] items-center bg-ink px-4 pt-28 md:px-8">
                    <ErrorState className="mx-auto w-full max-w-xl" onRetry={() => void refetch()} />
                </section>
            ) : null}

            <CatalogSection defaults={catalogDefaults} isReady={!isPending} />

            {data ? <StandardsSection content={data.standards} /> : null}
            {data ? <IconsSection content={data.icons} /> : null}
            {isPending ? (
                <>
                    <section id={SECTION_IDS.standards} className="min-h-[60vh]" />
                    <section id={SECTION_IDS.icons} className="min-h-[60vh] bg-lavender" />
                </>
            ) : null}
        </>
    );
}
