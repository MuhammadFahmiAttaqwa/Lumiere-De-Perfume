import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router';
import { CATALOG_CONFIG, CATALOG_PARAMS } from '@/shared/constants/catalog';
import { parseCatalogFilters } from '../lib/parseCatalogFilters';
import type { CatalogFilterDefaults, Gender } from '../types';

export function useCatalogFilters(defaults: CatalogFilterDefaults) {
    const [searchParams, setSearchParams] = useSearchParams();

    const filters = useMemo(
        () => parseCatalogFilters(searchParams, defaults),
        [searchParams, defaults],
    );

    const updateParams = useCallback(
        (mutate: (params: URLSearchParams) => void) => {
            setSearchParams(
                (previous) => {
                    const next = new URLSearchParams(previous);
                    mutate(next);
                    return next;
                },
                { replace: true },
            );
        },
        [setSearchParams],
    );

    const setCategory = useCallback(
        (slug: string) => updateParams((params) => params.set(CATALOG_PARAMS.category, slug)),
        [updateParams],
    );

    const setGender = useCallback(
        (gender: Gender | null) =>
            updateParams((params) => params.set(CATALOG_PARAMS.gender, gender ?? CATALOG_CONFIG.allGenderValue)),
        [updateParams],
    );

    const resetFilters = useCallback(
        () => updateParams((params) => Object.values(CATALOG_PARAMS).forEach((name) => params.delete(name))),
        [updateParams],
    );

    return { filters, setCategory, setGender, resetFilters };
}
