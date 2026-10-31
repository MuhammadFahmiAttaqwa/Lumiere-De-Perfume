import { useMemo } from 'react';
import { APP_CONFIG } from '@/shared/constants/appConfig';
import { SECTION_IDS } from '@/shared/constants/sections';
import { UI_TEXT } from '@/shared/constants/uiText';
import { isSafeUrl } from '@/shared/lib/isSafeUrl';
import { sortByOrder } from '@/shared/lib/sortByOrder';
import { Icon, Marquee, SafeLink } from '@/shared/ui';
import { useSiteSettings } from '../hooks/useSiteSettings';

const MAILTO_PREFIX = 'mailto:';
const TEL_PREFIX = 'tel:';
const PHONE_SANITIZE_PATTERN = /[^\d+]/g;
const REGISTERED_MARK = '®';

export function Footer() {
    const { data: settings } = useSiteSettings();
    const footer = settings?.footer;

    const topLinks = useMemo(() => sortByOrder(footer?.topLinks ?? []), [footer?.topLinks]);
    const links = useMemo(() => sortByOrder(footer?.links ?? []), [footer?.links]);
    const marqueeText = footer?.marqueeText ?? settings?.brandName ?? APP_CONFIG.brandName;

    return (
        <footer id={SECTION_IDS.contact} className="relative scroll-mt-20 overflow-hidden bg-ink text-paper">
            <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-16 -right-10 font-sans text-[16rem] leading-none font-light text-white/[0.04] select-none md:text-[22rem]"
            >
                {REGISTERED_MARK}
            </span>
            {footer ? (
                <div className="relative mx-auto max-w-[1440px] px-4 md:px-8">
                    <div className="grid gap-10 py-10 lg:grid-cols-[1fr_2fr]">
                        <nav aria-label={UI_TEXT.common.footerNavigation}>
                            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-white/50">
                                {topLinks.map((item) => (
                                    <li key={item.id}>
                                        <SafeLink to={item.url} className="transition-colors hover:text-paper">
                                            {item.label}
                                        </SafeLink>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                        <div className="flex flex-col gap-8">
                            <h2 className="max-w-xl text-3xl leading-tight font-normal tracking-tight md:text-4xl">
                                {footer.ctaTitle}
                            </h2>
                            <SafeLink
                                to={footer.ctaUrl}
                                className="flex w-full max-w-60 items-center justify-center gap-3 rounded-card bg-paper py-3 text-sm text-ink transition hover:bg-mist"
                            >
                                {footer.ctaLabel}
                                <Icon name="arrowRight" className="size-4" />
                            </SafeLink>
                        </div>
                    </div>

                    <ul className="flex flex-wrap justify-between gap-x-8 gap-y-3 border-t border-white/10 py-8 text-xs text-white/50">
                        {links.map((item) => (
                            <li key={item.id}>
                                <SafeLink to={item.url} className="transition-colors hover:text-paper">
                                    {item.label}
                                </SafeLink>
                            </li>
                        ))}
                    </ul>

                    <div className="grid items-end gap-10 py-10 md:grid-cols-[1fr_1.5fr_1fr]">
                        <div className="flex flex-col gap-4">
                            <h3 className="text-sm">{footer.missionTitle}</h3>
                            <p className="max-w-xs text-xs leading-relaxed text-white/50">{footer.mission}</p>
                        </div>
                        {isSafeUrl(footer.imageUrl) ? (
                            <img
                                src={footer.imageUrl}
                                alt=""
                                loading="lazy"
                                width={640}
                                height={200}
                                className="aspect-[16/5] w-full rounded-card object-cover"
                            />
                        ) : (
                            <div aria-hidden="true" />
                        )}
                        <div className="flex flex-col gap-4">
                            <h3 className="text-4xl font-normal">{footer.contactTitle}</h3>
                            <SafeLink
                                to={`${MAILTO_PREFIX}${footer.contactEmail}`}
                                className="text-xs text-white/50 hover:text-paper"
                            >
                                {footer.contactEmail}
                            </SafeLink>
                            <SafeLink
                                to={`${TEL_PREFIX}${footer.contactPhone.replace(PHONE_SANITIZE_PATTERN, '')}`}
                                className="text-xs text-white/50 hover:text-paper"
                            >
                                {footer.contactPhone}
                            </SafeLink>
                        </div>
                    </div>
                </div>
            ) : null}

            <Marquee
                text={marqueeText}
                className="py-6 font-display text-[clamp(4rem,14vw,12rem)] leading-none"
            />
        </footer>
    );
}
