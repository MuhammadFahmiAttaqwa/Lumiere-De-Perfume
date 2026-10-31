import { Fragment } from 'react';
import { APP_CONFIG } from '@/shared/constants/appConfig';
import { cn } from '@/shared/lib/cn';

interface MarqueeProps {
    text: string;
    separator?: string;
    repeat?: number;
    className?: string;
}

export function Marquee({
    text,
    separator = APP_CONFIG.marqueeSeparator,
    repeat = APP_CONFIG.marqueeRepeat,
    className,
}: MarqueeProps) {
    const indexes = Array.from({ length: repeat }, (_, index) => index);

    const renderTrack = (trackKey: string) => (
        <div
            key={trackKey}
            className="flex shrink-0 animate-marquee items-center gap-[0.35em] pr-[0.35em] motion-reduce:animate-none"
            aria-hidden="true"
        >
            {indexes.map((index) => (
                <Fragment key={index}>
                    <span>{text}</span>
                    <span>{separator}</span>
                </Fragment>
            ))}
        </div>
    );

    return (
        <div className={cn('flex overflow-hidden whitespace-nowrap', className)}>
            <span className="sr-only">{text}</span>
            {renderTrack('primary')}
            {renderTrack('secondary')}
        </div>
    );
}
