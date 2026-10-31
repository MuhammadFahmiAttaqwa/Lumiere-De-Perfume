import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router';
import { isInternalPath } from '@/shared/lib/isInternalPath';
import { isSafeUrl } from '@/shared/lib/isSafeUrl';

const NEW_TAB_PROTOCOLS = ['http:', 'https:'];

interface SafeLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
    to: string | null | undefined;
    children: ReactNode;
}

function opensInNewTab(url: string): boolean {
    try {
        return NEW_TAB_PROTOCOLS.includes(new URL(url).protocol);
    } catch {
        return false;
    }
}

export function SafeLink({ to, children, className, ...anchorProps }: SafeLinkProps) {
    if (!isSafeUrl(to)) {
        return <span className={className}>{children}</span>;
    }

    const url = to.trim();

    if (isInternalPath(url)) {
        return (
            <Link to={url} className={className} {...anchorProps}>
                {children}
            </Link>
        );
    }

    if (opensInNewTab(url)) {
        return (
            <a href={url} className={className} target="_blank" rel="noopener noreferrer" {...anchorProps}>
                {children}
            </a>
        );
    }

    return (
        <a href={url} className={className} {...anchorProps}>
            {children}
        </a>
    );
}
