import { UI_TEXT } from '@/shared/constants/uiText';
import { cn } from '@/shared/lib/cn';

interface ErrorStateProps {
    message?: string;
    onRetry?: () => void;
    className?: string;
}

export function ErrorState({ message = UI_TEXT.errors.generic, onRetry, className }: ErrorStateProps) {
    return (
        <div
            role="alert"
            className={cn('flex flex-col items-center gap-4 rounded-card bg-mist px-6 py-10 text-center', className)}
        >
            <p className="text-sm text-muted">{message}</p>
            {onRetry ? (
                <button
                    type="button"
                    onClick={onRetry}
                    className="rounded-card border border-ink px-5 py-2 text-sm transition hover:bg-ink hover:text-paper"
                >
                    {UI_TEXT.common.tryAgain}
                </button>
            ) : null}
        </div>
    );
}
