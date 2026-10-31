import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';
import { useSessionStore } from '@/features/auth';
import { UI_TEXT } from '@/shared/constants/uiText';
import { renderWithProviders } from '@/test/renderWithProviders';
import { PanelHost } from './PanelHost';

describe('PanelHost', () => {
    afterEach(() => {
        useSessionStore.getState().clearSession();
    });

    it('renders nothing without overlay params', () => {
        renderWithProviders(<PanelHost />, '/?category=mask');

        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('opens the cart panel and closes it', async () => {
        const user = userEvent.setup();
        const { router } = renderWithProviders(<PanelHost />, '/?category=mask&panel=cart');

        expect(screen.getByRole('dialog', { name: UI_TEXT.panelTitles.cart })).toBeInTheDocument();

        await user.click(screen.getAllByRole('button', { name: UI_TEXT.common.close })[1] as HTMLElement);

        expect(router.state.location.search).toBe('?category=mask');
    });

    it('sends guests from checkout to login with a return panel', async () => {
        const { router } = renderWithProviders(<PanelHost />, '/?panel=checkout');

        expect(await screen.findByRole('dialog', { name: UI_TEXT.panelTitles.login })).toBeInTheDocument();
        expect(router.state.location.search).toBe('?panel=login&returnPanel=checkout');
    });

    it('shows checkout for authenticated customers', () => {
        useSessionStore.getState().setSession('token', { id: 'u-1', fullName: 'Siti', email: 'siti@example.com' });

        renderWithProviders(<PanelHost />, '/?panel=checkout');

        expect(screen.getByRole('dialog', { name: UI_TEXT.panelTitles.checkout })).toBeInTheDocument();
    });
});
