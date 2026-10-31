import { useEffect, useState } from 'react';
import { SECTION_CONFIG } from '@/shared/constants/sections';

export function useActiveSection(sectionIds: readonly string[]): string | null {
    const [activeId, setActiveId] = useState<string | null>(null);

    useEffect(() => {
        if (typeof IntersectionObserver === 'undefined') {
            return undefined;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries.find((entry) => entry.isIntersecting);

                if (visible) {
                    setActiveId(visible.target.id);
                }
            },
            { rootMargin: SECTION_CONFIG.spyRootMargin },
        );

        sectionIds
            .map((id) => document.getElementById(id))
            .forEach((element) => {
                if (element) {
                    observer.observe(element);
                }
            });

        return () => observer.disconnect();
    }, [sectionIds]);

    return activeId;
}
