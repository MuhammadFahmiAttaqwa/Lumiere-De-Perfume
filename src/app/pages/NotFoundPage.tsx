import { Link } from 'react-router';
import { ROUTES } from '@/shared/constants/routes';
import { UI_TEXT } from '@/shared/constants/uiText';

export function NotFoundPage() {
    return (
        <section className="bg-ink text-paper">
            <div className="mx-auto flex min-h-[70vh] max-w-[1440px] flex-col justify-center gap-4 px-4 pt-32 pb-20 md:px-8">
                <p className="text-xs tracking-[0.2em] text-white/50">{UI_TEXT.notFound.code}</p>
                <h1 className="text-4xl font-light tracking-tight md:text-6xl">{UI_TEXT.notFound.title}</h1>
                <p className="max-w-md text-sm text-white/60">{UI_TEXT.notFound.description}</p>
                <Link
                    to={ROUTES.home}
                    className="mt-4 w-fit rounded-card bg-paper px-6 py-3 text-sm text-ink transition hover:bg-mist"
                >
                    {UI_TEXT.common.backToHome}
                </Link>
            </div>
        </section>
    );
}
