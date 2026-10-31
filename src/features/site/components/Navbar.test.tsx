import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SITE_SETTINGS_DATA } from '@/mocks/data/siteSettingsData';
import { UI_TEXT } from '@/shared/constants/uiText';
import { renderWithProviders } from '@/test/renderWithProviders';
import { Navbar } from './Navbar';

describe('Navbar', () => {
    it('does not mark any menu item active when no section is visible', async () => {
        renderWithProviders(<Navbar />);

        const firstLabel = SITE_SETTINGS_DATA.navigation[0]?.label ?? '';
        expect((await screen.findAllByRole('link', { name: firstLabel })).length).toBeGreaterThan(0);

        expect(document.querySelector('[aria-current="location"]')).toBeNull();
        expect(screen.getByRole('button', { name: new RegExp(UI_TEXT.common.home) })).toBeInTheDocument();
    });
});
