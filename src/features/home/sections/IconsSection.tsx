import { useProductsByIds } from '@/features/catalog';
import { SECTION_IDS } from '@/shared/constants/sections';
import { useNearViewport } from '@/shared/hooks/useNearViewport';
import { usePanelNavigation } from '@/shared/hooks/usePanelNavigation';
import { ErrorState, Icon, SafeLink, Skeleton } from '@/shared/ui';
import { IconsProductCard } from '../components/IconsProductCard';
import { IconsVideoCard } from '../components/IconsVideoCard';
import type { IconsContent } from '../types';

interface IconsSectionProps {
    content: IconsContent;
}

export function IconsSection({ content }: IconsSectionProps) {
    const { ref, isNear } = useNearViewport<HTMLElement>();
    const { openProduct } = usePanelNavigation();
    const productsQuery = useProductsByIds(content.productIds, isNear);

    return (
        <section id={SECTION_IDS.icons} ref={ref} className="relative scroll-mt-16 overflow-hidden bg-lavender text-paper">
            {isNear ? (
                <img src={content.backgroundUrl} alt="" className="absolute inset-0 size-full object-cover" />
            ) : null}
            <div className="absolute inset-0 bg-ink/15" aria-hidden="true" />

            <div className="relative mx-auto grid max-w-[1440px] gap-14 px-4 py-20 md:px-8 lg:grid-cols-2 lg:gap-24 lg:py-28">
                <div className="flex flex-col gap-6 lg:sticky lg:top-28 lg:w-full lg:max-w-[447px] lg:self-start lg:justify-self-center">
                    <IconsVideoCard videoUrl={content.videoUrl} posterUrl={content.posterUrl} />
                    <h2 className="mt-6 text-4xl font-light tracking-tight md:text-5xl">{content.title}</h2>
                    <p className="text-sm leading-relaxed text-white/80">{content.description}</p>
                    <SafeLink
                        to={content.ctaUrl}
                        className="mt-4 flex items-center justify-center gap-3 rounded-card bg-paper py-3 text-sm text-ink transition hover:bg-mist"
                    >
                        {content.ctaLabel}
                        <Icon name="arrowRight" className="size-4" />
                    </SafeLink>
                </div>

                <div className="w-full lg:max-w-[447px] lg:justify-self-center">
                    {productsQuery.isError ? (
                        <ErrorState onRetry={() => void productsQuery.refetch()} />
                    ) : (
                        <ul className="flex flex-col gap-2">
                            {productsQuery.data
                                ? productsQuery.data.map((product) => (
                                      <IconsProductCard key={product.id} product={product} onSelect={openProduct} />
                                  ))
                                : content.productIds.map((id) => (
                                      <li key={id}>
                                          <Skeleton className="h-[410px] w-full bg-white/40" />
                                      </li>
                                  ))}
                        </ul>
                    )}
                </div>
            </div>
        </section>
    );
}
