import { Link } from 'react-router';
import { APP_CONFIG } from '@/shared/constants/appConfig';
import { ROUTES } from '@/shared/constants/routes';
import { cn } from '@/shared/lib/cn';
import { isSafeUrl } from '@/shared/lib/isSafeUrl';

interface BrandLogoProps {
    brandName?: string;
    logoUrl?: string | null;
    className?: string;
}

export function BrandLogo({ brandName = APP_CONFIG.brandName, logoUrl, className }: BrandLogoProps) {
    return (
        <Link to={ROUTES.home} aria-label={brandName} className={cn('inline-block font-display', className)}>
            {isSafeUrl(logoUrl) ? (
                <img src={logoUrl} alt={brandName} className="h-12 w-auto" />
            ) : (
                <span className="flex flex-col text-[1.75rem] leading-[0.9]" aria-hidden="true">
                    {APP_CONFIG.brandNameLines.map((line) => (
                        <span key={line}>{line}</span>
                    ))}
                </span>
            )}
        </Link>
    );
}
