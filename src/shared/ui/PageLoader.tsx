import { UI_TEXT } from '@/shared/constants/uiText';

export function PageLoader() {
    return (
        <div className="flex min-h-[50vh] items-center justify-center" role="status" aria-live="polite">
            <span className="size-8 animate-spin rounded-full border-2 border-line border-t-ink" aria-hidden="true" />
            <span className="sr-only">{UI_TEXT.common.loading}</span>
        </div>
    );
}
