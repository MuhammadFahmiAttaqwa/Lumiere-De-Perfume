import { useCallback, useMemo, useState } from 'react';
import { PANEL_KEYS } from '@/shared/constants/panels';
import { SECTION_CONFIG, SECTION_ORDER } from '@/shared/constants/sections';
import { UI_TEXT } from '@/shared/constants/uiText';
import { useActiveSection } from '@/shared/hooks/useActiveSection';
import { usePanelNavigation } from '@/shared/hooks/usePanelNavigation';
import { useScrolledPast } from '@/shared/hooks/useScrolledPast';
import { cn } from '@/shared/lib/cn';
import { sortByOrder } from '@/shared/lib/sortByOrder';
import { Icon, SafeLink } from '@/shared/ui';
import { useSiteSettings } from '../hooks/useSiteSettings';
import { BrandLogo } from './BrandLogo';
import { SiteMenu } from './SiteMenu';

const HASH_SEPARATOR = '#';
const QUERY_SEPARATOR = '?';

function getAnchorId(url: string): string | null {
    const hashIndex = url.indexOf(HASH_SEPARATOR);
    return hashIndex >= 0 ? url.slice(hashIndex + 1) : null;
}

export function Navbar() {
    const { data: settings } = useSiteSettings();
    const { openPanel } = usePanelNavigation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const isScrolled = useScrolledPast(SECTION_CONFIG.navbarScrolledOffsetPx);
    const activeSectionId = useActiveSection(SECTION_ORDER);

    const navigation = useMemo(() => sortByOrder(settings?.navigation ?? []), [settings?.navigation]);
    const sectionItems = activeSectionId
        ? navigation.filter((item) => getAnchorId(item.url) === activeSectionId)
        : [];
    const activeItem = sectionItems.find((item) => !item.url.includes(QUERY_SEPARATOR)) ?? sectionItems[0];
    const menuLabel = activeItem?.label ?? UI_TEXT.common.home;

    const openMenu = useCallback(() => setIsMenuOpen(true), []);
    const closeMenu = useCallback(() => setIsMenuOpen(false), []);
    const openSearch = useCallback(() => openPanel(PANEL_KEYS.search), [openPanel]);
    const openCart = useCallback(() => openPanel(PANEL_KEYS.cart), [openPanel]);
    const openCartFromMenu = useCallback(() => {
        setIsMenuOpen(false);
        openPanel(PANEL_KEYS.cart);
    }, [openPanel]);

    return (
        <header
            className={cn(
                'fixed inset-x-0 top-0 z-40 text-paper transition-colors duration-300',
                isScrolled ? 'bg-ink/80 backdrop-blur-md' : 'bg-transparent',
            )}
        >
            <div
                className={cn(
                    'mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-4 transition-[padding] duration-300 md:px-8',
                    isScrolled ? 'py-3' : 'py-4 md:py-5',
                )}
            >
                <BrandLogo brandName={settings?.brandName} logoUrl={settings?.logoUrl} />

                <nav
                    aria-label={UI_TEXT.common.mainNavigation}
                    className="hidden items-center rounded-card bg-white/15 px-7 py-4 text-sm backdrop-blur-md lg:flex"
                >
                    <button
                        type="button"
                        onClick={openSearch}
                        className="flex items-center gap-2 transition-opacity hover:opacity-70"
                    >
                        <Icon name="search" className="size-4" />
                        {UI_TEXT.common.search}
                    </button>
                    <span className="mx-8 h-5 w-px bg-white/30" aria-hidden="true" />
                    <ul className="flex items-center gap-8">
                        {navigation.map((item) => (
                            <li key={item.id}>
                                <SafeLink
                                    to={item.url}
                                    aria-current={item === activeItem ? 'location' : undefined}
                                    className={cn(
                                        'transition-opacity hover:opacity-70',
                                        item === activeItem && 'underline underline-offset-8',
                                    )}
                                >
                                    {item.label}
                                </SafeLink>
                            </li>
                        ))}
                    </ul>
                    <span className="mx-8 h-5 w-px bg-white/30" aria-hidden="true" />
                    <button
                        type="button"
                        onClick={openCart}
                        className="flex items-center gap-2 transition-opacity hover:opacity-70"
                    >
                        <Icon name="bag" className="size-4" />
                        {UI_TEXT.common.cart}
                    </button>
                </nav>

                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={openCart}
                        aria-label={UI_TEXT.common.cart}
                        className="flex size-11 items-center justify-center rounded-card bg-white/15 backdrop-blur-md lg:hidden"
                    >
                        <Icon name="bag" />
                    </button>
                    <button
                        type="button"
                        onClick={openMenu}
                        aria-haspopup="dialog"
                        aria-expanded={isMenuOpen}
                        className={cn(
                            'flex items-center gap-6 rounded-card bg-paper px-5 text-sm text-ink transition-[padding] md:px-6',
                            isScrolled ? 'py-3' : 'py-3 md:py-5',
                        )}
                    >
                        <span>{menuLabel}</span>
                        <Icon name="menu" />
                    </button>
                </div>
            </div>

            <SiteMenu
                isOpen={isMenuOpen}
                navigation={navigation}
                onClose={closeMenu}
                onOpenCart={openCartFromMenu}
            />
        </header>
    );
}
