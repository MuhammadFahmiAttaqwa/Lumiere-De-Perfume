import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { UI_TEXT } from '@/shared/constants/uiText';
import { renderWithProviders } from '@/test/renderWithProviders';
import type { CatalogFilterDefaults } from '../types';
import { CatalogSection } from './CatalogSection';

const DEFAULTS: CatalogFilterDefaults = { categorySlug: 'serum-treatment', gender: 'women' };

describe('CatalogSection', () => {
    it('renders the default category with its products and count', async () => {
        renderWithProviders(<CatalogSection defaults={DEFAULTS} isReady />);

        expect(await screen.findByRole('heading', { level: 2, name: /Serum & Treatment/ })).toBeInTheDocument();
        expect(await screen.findByText('Smooth & Balance Gel-Serum')).toBeInTheDocument();
        expect(screen.queryByText('Proceuticals AHA Peel Solution')).not.toBeInTheDocument();
        expect(screen.getByText('(3)')).toBeInTheDocument();
    });

    it('switches category and gender through the URL', async () => {
        const user = userEvent.setup();
        const { router } = renderWithProviders(<CatalogSection defaults={DEFAULTS} isReady />);

        await user.click(await screen.findByRole('tab', { name: 'Mask' }));
        expect(await screen.findByText('Overnight Renewal Mask')).toBeInTheDocument();
        expect(router.state.location.search).toContain('category=mask');

        await user.click(screen.getByRole('button', { name: UI_TEXT.catalog.women }));
        expect(router.state.location.search).toContain('gender=all');
    });

    it('opens the product panel when a product is selected', async () => {
        const user = userEvent.setup();
        const { router } = renderWithProviders(<CatalogSection defaults={DEFAULTS} isReady />);

        const productName = await screen.findByText('SOS Blemish Gel');
        const card = productName.closest('article');

        expect(card).not.toBeNull();
        await user.click(within(card as HTMLElement).getByRole('button'));

        expect(router.state.location.search).toContain('product=sos-blemish-gel');
    });
});
