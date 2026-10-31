import { cn } from '@/shared/lib/cn';
import { isSafeUrl } from '@/shared/lib/isSafeUrl';
import { Icon } from '@/shared/ui';
import { resolveStandardIcon } from '../lib/standardIconMap';
import type { StandardItem } from '../types';

interface StandardCardProps {
    item: StandardItem;
    className?: string;
}

export function StandardCard({ item, className }: StandardCardProps) {
    if (isSafeUrl(item.imageUrl)) {
        return (
            <li className={cn('relative aspect-[217/191] overflow-hidden rounded-card text-paper', className)}>
                <img src={item.imageUrl} alt="" loading="lazy" className="absolute inset-0 size-full object-cover" />
                <div className="absolute inset-0 bg-ink/35" aria-hidden="true" />
                <div className="relative flex h-full flex-col items-center gap-3 px-5 pt-8 text-center">
                    <h3 className="text-sm">{item.title}</h3>
                    {item.description ? <p className="text-xs leading-relaxed text-white/85">{item.description}</p> : null}
                </div>
            </li>
        );
    }

    return (
        <li
            className={cn(
                'flex aspect-[217/191] flex-col items-center justify-center gap-4 rounded-card bg-mist px-4 text-center',
                className,
            )}
        >
            <Icon name={resolveStandardIcon(item.iconKey)} className="size-11 stroke-[1.2]" />
            <h3 className="max-w-[8rem] text-sm leading-snug">{item.title}</h3>
        </li>
    );
}
