import { useRef } from 'react';
import { SECTION_IDS } from '@/shared/constants/sections';
import { UI_TEXT } from '@/shared/constants/uiText';
import { useDialogBehavior } from '@/shared/hooks/useDialogBehavior';
import { Icon, SafeLink } from '@/shared/ui';
import type { LinkItem } from '../types';

const HOME_ANCHOR = `/#${SECTION_IDS.home}`;

interface SiteMenuProps {
    isOpen: boolean;
    navigation: LinkItem[];
    onClose: () => void;
    onOpenCart: () => void;
}

export function SiteMenu({ isOpen, navigation, onClose, onOpenCart }: SiteMenuProps) {
    const closeButtonRef = useRef<HTMLButtonElement>(null);

    useDialogBehavior(isOpen, onClose, closeButtonRef);

    if (!isOpen) {
        return null;
    }

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-label={UI_TEXT.common.menu}
            className="fixed inset-0 z-50 flex flex-col bg-ink px-4 py-5 text-paper md:px-8"
        >
            <div className="flex justify-end">
                <button
                    ref={closeButtonRef}
                    type="button"
                    onClick={onClose}
                    className="flex items-center gap-3 rounded-card bg-paper px-5 py-3 text-sm text-ink"
                >
                    {UI_TEXT.common.close}
                    <Icon name="close" />
                </button>
            </div>
            <nav aria-label={UI_TEXT.common.mainNavigation} className="mt-12 flex flex-col items-start gap-6">
                <SafeLink to={HOME_ANCHOR} onClick={onClose} className="text-4xl font-light md:text-6xl">
                    {UI_TEXT.common.home}
                </SafeLink>
                {navigation.map((item) => (
                    <SafeLink key={item.id} to={item.url} onClick={onClose} className="text-4xl font-light md:text-6xl">
                        {item.label}
                    </SafeLink>
                ))}
                <button type="button" onClick={onOpenCart} className="text-4xl font-light md:text-6xl">
                    {UI_TEXT.common.cart}
                </button>
            </nav>
        </div>
    );
}
