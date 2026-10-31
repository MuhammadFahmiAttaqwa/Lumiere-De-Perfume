import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router';
import { SECTION_CONFIG } from '@/shared/constants/sections';
import { scrollToSection } from '@/shared/lib/scrollToSection';

const HASH_PREFIX = '#';
const POP_NAVIGATION = 'POP';
const INITIAL_LOCATION_KEY = 'default';
const USER_SCROLL_EVENTS = ['wheel', 'touchstart', 'keydown', 'pointerdown'] as const;

export function useHashScroll(): void {
    const location = useLocation();
    const navigationType = useNavigationType();

    useEffect(() => {
        if (!location.hash.startsWith(HASH_PREFIX)) {
            return undefined;
        }

        const isInitialLoad = location.key === INITIAL_LOCATION_KEY;

        if (navigationType === POP_NAVIGATION && !isInitialLoad) {
            return undefined;
        }

        const sectionId = decodeURIComponent(location.hash.slice(HASH_PREFIX.length));
        scrollToSection(sectionId);

        if (!isInitialLoad || typeof ResizeObserver === 'undefined') {
            return undefined;
        }

        const observer = new ResizeObserver(() => scrollToSection(sectionId, 'auto'));
        const stopFollowing = () => {
            observer.disconnect();
            USER_SCROLL_EVENTS.forEach((eventName) => window.removeEventListener(eventName, stopFollowing));
        };
        const timeoutId = window.setTimeout(stopFollowing, SECTION_CONFIG.hashScrollSettleMs);

        observer.observe(document.body);
        USER_SCROLL_EVENTS.forEach((eventName) =>
            window.addEventListener(eventName, stopFollowing, { passive: true }),
        );

        return () => {
            window.clearTimeout(timeoutId);
            stopFollowing();
        };
    }, [location.hash, location.key, navigationType]);
}
