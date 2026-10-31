import { useEffect, type RefObject } from 'react';

const ESCAPE_KEY = 'Escape';

export function useDialogBehavior(
    isOpen: boolean,
    onClose: () => void,
    initialFocusRef?: RefObject<HTMLElement | null>,
): void {
    useEffect(() => {
        if (!isOpen) {
            return undefined;
        }

        const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
        const previousOverflow = document.body.style.overflow;

        document.body.style.overflow = 'hidden';
        initialFocusRef?.current?.focus();

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === ESCAPE_KEY) {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener('keydown', handleKeyDown);
            previouslyFocused?.focus();
        };
    }, [isOpen, onClose, initialFocusRef]);
}
