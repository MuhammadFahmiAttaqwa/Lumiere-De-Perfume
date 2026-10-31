import { useMemo } from 'react';
import { CATALOG_CONFIG } from '@/shared/constants/catalog';
import { PANEL_KEYS } from '@/shared/constants/panels';
import { SECTION_IDS } from '@/shared/constants/sections';
import { UI_TEXT } from '@/shared/constants/uiText';
import { useNearViewport } from '@/shared/hooks/useNearViewport';
import { usePanelNavigation } from '@/shared/hooks/usePanelNavigation';
import { isSafeUrl } from '@/shared/lib/isSafeUrl';
import { ErrorState, Icon, Skeleton } from '@/shared/ui';
import { CategoryTabs } from '../components/CategoryTabs';
import { GenderToggle } from '../components/GenderToggle';
import { ProductCard } from '../components/ProductCard';
import { ProductCardSkeleton } from '../components/ProductCardSkeleton';
import { useCatalogFilters } from '../hooks/useCatalogFilters';
import { useCategories } from '../hooks/useCategories';
import { useProductList } from '../hooks/useProductList';
import type { CatalogFilterDefaults, ProductListQuery } from '../types';

const SKELETON_KEYS = Array.from({ length: CATALOG_CONFIG.pageSize }, (_, index) => `skeleton-${index}`);

interface CatalogSectionProps {
    defaults: CatalogFilterDefaults;
    isReady: boolean;
}

export function CatalogSection({ defaults, isReady }: CatalogSectionProps) {
    const { ref, isNear } = useNearViewport<HTMLElement>();
    const { openPanel, openProduct } = usePanelNavigation();
    const { filters, setCategory, setGender, resetFilters } = useCatalogFilters(defaults);

    const categoriesQuery = useCategories(isNear);

    const productQuery = useMemo<ProductListQuery>(
        () => ({
            category: filters.category,
            gender: filters.gender ?? undefined,
            sort: filters.sort ?? undefined,
            q: filters.q ?? undefined,
            minPrice: filters.minPrice ?? undefined,
            maxPrice: filters.maxPrice ?? undefined,
            pageSize: CATALOG_CONFIG.pageSize,
        }),
        [filters],
    );

    const productsQuery = useProductList(productQuery, isNear && isReady);

    const activeCategory = categoriesQuery.data?.find((category) => category.slug === filters.category);
    const products = productsQuery.data?.pages.flatMap((page) => page.items) ?? [];
    const totalItems = productsQuery.data?.pages[0]?.totalItems;

    return (
        <section id={SECTION_IDS.catalog} ref={ref} className="min-h-dvh scroll-mt-20 bg-paper pt-2">
            {categoriesQuery.data ? (
                <CategoryTabs
                    categories={categoriesQuery.data}
                    activeSlug={filters.category}
                    onSelect={setCategory}
                />
            ) : (
                <div className="border-b border-line px-4 py-4 md:px-8">
                    <Skeleton className="h-5 w-full max-w-3xl" />
                </div>
            )}

            <div className="border-b border-line">
                <div className="mx-auto grid max-w-[1440px] gap-6 px-4 py-8 md:grid-cols-[1fr_auto_1fr] md:items-start md:px-8">
                    <h2 className="text-4xl font-normal tracking-tight md:text-5xl">
                        {activeCategory?.name ?? (
                            <span
                                aria-hidden="true"
                                className="inline-block h-12 w-64 animate-pulse rounded-card bg-mist align-middle"
                            />
                        )}
                        {totalItems !== undefined ? (
                            <sup className="ml-1 align-super text-base text-muted">({totalItems})</sup>
                        ) : null}
                    </h2>
                    {isSafeUrl(activeCategory?.imageUrl) ? (
                        <img
                            src={activeCategory.imageUrl}
                            alt=""
                            loading="lazy"
                            width={205}
                            height={172}
                            className="hidden h-[172px] w-[205px] rounded-card object-cover md:block"
                        />
                    ) : (
                        <span className="hidden md:block" />
                    )}
                    <div className="flex items-center justify-between gap-8 md:self-end md:justify-self-end">
                        <GenderToggle value={filters.gender} onChange={setGender} />
                        <button
                            type="button"
                            onClick={() => openPanel(PANEL_KEYS.filter)}
                            className="flex h-[54px] min-w-[154px] items-center justify-between gap-6 rounded-card border border-ink px-6 text-sm transition hover:bg-ink hover:text-paper"
                        >
                            {UI_TEXT.catalog.filter}
                            <Icon name="menu" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-[1440px] px-4 py-14 md:px-8">
                {productsQuery.isError ? (
                    <ErrorState onRetry={() => void productsQuery.refetch()} />
                ) : null}

                {!productsQuery.isError && productsQuery.isSuccess && products.length === 0 ? (
                    <div className="flex flex-col items-center gap-4 py-16 text-center">
                        <p className="text-sm text-muted">{UI_TEXT.catalog.empty}</p>
                        <button type="button" onClick={resetFilters} className="text-sm underline underline-offset-4">
                            {UI_TEXT.catalog.resetFilter}
                        </button>
                    </div>
                ) : null}

                <div className="grid gap-x-2 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} onSelect={openProduct} />
                    ))}
                    {productsQuery.isPending || productsQuery.isFetchingNextPage
                        ? SKELETON_KEYS.map((key) => <ProductCardSkeleton key={key} />)
                        : null}
                </div>

                {productsQuery.hasNextPage ? (
                    <div className="mt-12 flex justify-center">
                        <button
                            type="button"
                            onClick={() => void productsQuery.fetchNextPage()}
                            disabled={productsQuery.isFetchingNextPage}
                            className="rounded-card border border-ink px-8 py-3 text-sm transition hover:bg-ink hover:text-paper disabled:opacity-50"
                        >
                            {UI_TEXT.catalog.loadMore}
                        </button>
                    </div>
                ) : null}
            </div>
        </section>
    );
}
