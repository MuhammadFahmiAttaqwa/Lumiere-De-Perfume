import { useState } from 'react';
import { UI_TEXT } from '@/shared/constants/uiText';
import { isSafeUrl } from '@/shared/lib/isSafeUrl';
import { Icon } from '@/shared/ui';

interface IconsVideoCardProps {
    videoUrl: string | null;
    posterUrl: string;
}

export function IconsVideoCard({ videoUrl, posterUrl }: IconsVideoCardProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const canPlay = isSafeUrl(videoUrl);

    return (
        <div className="relative aspect-[447/228] w-full overflow-hidden rounded-card border-2 border-white/70 bg-ink/20">
            {canPlay && isPlaying ? (
                <video
                    src={videoUrl}
                    poster={posterUrl}
                    controls
                    autoPlay
                    playsInline
                    className="absolute inset-0 size-full object-cover"
                />
            ) : (
                <>
                    <img src={posterUrl} alt="" loading="lazy" className="absolute inset-0 size-full object-cover" />
                    {canPlay ? (
                        <button
                            type="button"
                            onClick={() => setIsPlaying(true)}
                            aria-label={UI_TEXT.icons.playVideo}
                            className="absolute top-1/2 left-1/2 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-card bg-white/30 text-paper backdrop-blur-md transition hover:bg-white/50"
                        >
                            <Icon name="play" className="size-4 fill-current" />
                        </button>
                    ) : null}
                </>
            )}
        </div>
    );
}
