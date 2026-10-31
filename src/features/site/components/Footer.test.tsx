import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { http } from 'msw';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { describe, expect, it } from 'vitest';
import { SITE_SETTINGS_DATA } from '@/mocks/data/siteSettingsData';
import { server } from '@/mocks/server';
import { apiUrl } from '@/mocks/utils/apiUrl';
import { okResponse } from '@/mocks/utils/mockResponse';
import { API_ENDPOINTS } from '@/shared/constants/apiEndpoints';
import { Footer } from './Footer';

function renderFooter() {
    const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    const router = createMemoryRouter([{ path: '/', element: <Footer /> }]);

    return render(
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>,
    );
}

describe('Footer', () => {
    it('renders dynamic content from site settings', async () => {
        renderFooter();

        expect(await screen.findByRole('heading', { name: SITE_SETTINGS_DATA.footer.ctaTitle })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: SITE_SETTINGS_DATA.footer.ctaLabel })).toHaveAttribute(
            'href',
            SITE_SETTINGS_DATA.footer.ctaUrl,
        );
        expect(screen.getByRole('link', { name: SITE_SETTINGS_DATA.footer.contactEmail })).toHaveAttribute(
            'href',
            `mailto:${SITE_SETTINGS_DATA.footer.contactEmail}`,
        );
    });

    it('does not render unsafe links from the API as anchors', async () => {
        server.use(
            http.get(apiUrl(API_ENDPOINTS.siteSettings), () =>
                okResponse({
                    ...SITE_SETTINGS_DATA,
                    footer: {
                        ...SITE_SETTINGS_DATA.footer,
                        links: [{ id: 'bad', label: 'Malicious', url: 'javascript:alert(1)', sortOrder: 1 }],
                    },
                }),
            ),
        );

        renderFooter();

        expect(await screen.findByText('Malicious')).toBeInTheDocument();
        expect(screen.queryByRole('link', { name: 'Malicious' })).not.toBeInTheDocument();
    });
});
