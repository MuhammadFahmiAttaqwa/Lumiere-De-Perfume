import { useEffect } from 'react';
import { isRouteErrorResponse, Link, useRouteError } from 'react-router';
import { HTTP_STATUS } from '@/shared/constants/appConfig';
import { ROUTES } from '@/shared/constants/routes';
import { UI_TEXT } from '@/shared/constants/uiText';
import { NotFoundPage } from './NotFoundPage';

export function RouteErrorPage() {
    const error = useRouteError();

    useEffect(() => {
        if (import.meta.env.DEV) {
            console.error(error);
        }
    }, [error]);

    if (isRouteErrorResponse(error) && error.status === HTTP_STATUS.notFound) {
        return <NotFoundPage />;
    }

    return (
        <section
            role="alert"
            className="mx-auto flex min-h-dvh max-w-[1440px] flex-col justify-center gap-4 px-4 py-20 md:px-8"
        >
            <h1 className="text-4xl font-light tracking-tight md:text-6xl">{UI_TEXT.errors.generic}</h1>
            <Link
                to={ROUTES.home}
                reloadDocument
                className="mt-4 w-fit rounded-card bg-ink px-6 py-3 text-sm text-paper transition hover:opacity-90"
            >
                {UI_TEXT.common.backToHome}
            </Link>
        </section>
    );
}
