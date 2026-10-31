import { UI_TEXT } from '@/shared/constants/uiText';

interface PanelPlaceholderProps {
    detail?: string | null;
}

export function PanelPlaceholder({ detail }: PanelPlaceholderProps) {
    return (
        <div className="flex flex-col gap-3">
            <p className="text-xs tracking-[0.2em] text-muted uppercase">{UI_TEXT.placeholder.title}</p>
            <p className="text-sm text-muted">{UI_TEXT.placeholder.description}</p>
            {detail ? <p className="rounded-card bg-mist px-4 py-3 text-sm break-all">{detail}</p> : null}
        </div>
    );
}
