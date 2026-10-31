import { useEffect, useRef, useState } from 'react';
import { SECTION_CONFIG } from '@/shared/constants/sections';

function isObserverUnsupported(): boolean {
    return typeof IntersectionObserver === 'undefined';
}

export function useNearViewport<T extends Element>(rootMargin: string = SECTION_CONFIG.lazyRootMargin) {
    const ref = useRef<T>(null);
    const [isNear, setIsNear] = useState(isObserverUnsupported);

    useEffect(() => {
        const element = ref.current;

        if (!element || isNear) {
            return undefined;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries.some((entry) => entry.isIntersecting)) {
                    setIsNear(true);
                    observer.disconnect();
                }
            },
            { rootMargin },
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, [isNear, rootMargin]);

    return { ref, isNear };
}
