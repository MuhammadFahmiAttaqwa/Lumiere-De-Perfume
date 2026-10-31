import { useRef, type ReactNode } from 'react';
import { UI_TEXT } from '@/shared/constants/uiText';
import { useDialogBehavior } from '@/shared/hooks/useDialogBehavior';
import { Icon } from './icons/Icon';

interface DrawerProps {
    title: string;
    onClose: () => void;
    children: ReactNode;
}

export function Drawer({ title, onClose, children }: DrawerProps) {
    const closeButtonRef = useRef<HTMLButtonElement>(null);

    useDialogBehavior(true, onClose, closeButtonRef);

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            <button
                type="button"
                aria-label={UI_TEXT.common.close}
                tabIndex={-1}
                onClick={onClose}
                className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
            />
            <div
                role="dialog"
                aria-modal="true"
                aria-label={title}
                className="relative flex h-full w-full max-w-md flex-col bg-paper text-ink shadow-2xl"
            >
                <div className="flex items-center justify-between border-b border-line px-6 py-5">
                    <h2 className="text-lg">{title}</h2>
                    <button
                        ref={closeButtonRef}
                        type="button"
                        onClick={onClose}
                        aria-label={UI_TEXT.common.close}
                        className="flex size-10 items-center justify-center rounded-card border border-line transition hover:bg-mist"
                    >
                        <Icon name="close" />
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto px-6 py-6">{children}</div>
            </div>
        </div>
    );
}
