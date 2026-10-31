import { useEffect, useState } from 'react';

export function useScrolledPast(offsetPx: number): boolean {
    const [isScrolledPast, setIsScrolledPast] = useState(false);

    useEffect(() => {
        const update = () => setIsScrolledPast(window.scrollY > offsetPx);

        update();
        window.addEventListener('scroll', update, { passive: true });

        return () => window.removeEventListener('scroll', update);
    }, [offsetPx]);

    return isScrolledPast;
}
