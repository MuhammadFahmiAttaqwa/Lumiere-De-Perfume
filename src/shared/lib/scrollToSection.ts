const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

export function prefersReducedMotion(): boolean {
    return typeof window.matchMedia === 'function' && window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

export function scrollToSection(
    sectionId: string,
    behavior?: ScrollBehavior,
): boolean {
    const element = document.getElementById(sectionId);

    if (!element) {
        return false;
    }

    const resolvedBehavior = behavior ?? (prefersReducedMotion() ? 'auto' : 'smooth');
    element.scrollIntoView({ behavior: resolvedBehavior, block: 'start' });
    return true;
}
