import { cn } from '@/shared/lib/cn';
import { ICON_PATHS, type IconName } from './iconPaths';

interface IconProps {
    name: IconName;
    className?: string;
    title?: string;
}

export function Icon({ name, className, title }: IconProps) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn('size-5 shrink-0', className)}
            role={title ? 'img' : undefined}
            aria-hidden={title ? undefined : true}
        >
            {title ? <title>{title}</title> : null}
            {ICON_PATHS[name].map((path) => (
                <path key={path} d={path} />
            ))}
        </svg>
    );
}
