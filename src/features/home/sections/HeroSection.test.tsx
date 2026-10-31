import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { HOME_CONTENT_DATA } from '@/mocks/data/homeContentData';
import { UI_TEXT } from '@/shared/constants/uiText';
import { renderWithProviders } from '@/test/renderWithProviders';
import { HeroSection } from './HeroSection';

describe('HeroSection', () => {
    it('shows the first slide and moves with next/prev', async () => {
        const user = userEvent.setup();
        const slides = HOME_CONTENT_DATA.heroSlides;

        renderWithProviders(<HeroSection slides={slides} />);

        expect(screen.getByRole('heading', { level: 1, name: slides[0]?.title })).toBeInTheDocument();
        expect(screen.getByText('01')).toBeInTheDocument();

        await user.click(screen.getByRole('button', { name: UI_TEXT.hero.nextSlide }));
        expect(screen.getByRole('heading', { level: 1, name: slides[1]?.title })).toBeInTheDocument();
        expect(screen.getByText('02')).toBeInTheDocument();

        await user.click(screen.getByRole('button', { name: UI_TEXT.hero.previousSlide }));
        await user.click(screen.getByRole('button', { name: UI_TEXT.hero.previousSlide }));
        expect(screen.getByRole('heading', { level: 1, name: slides.at(-1)?.title })).toBeInTheDocument();
    });

    it('links the featured product CTA from API data', () => {
        const slide = HOME_CONTENT_DATA.heroSlides[0];

        renderWithProviders(<HeroSection slides={HOME_CONTENT_DATA.heroSlides} />);

        expect(screen.getByRole('link', { name: slide?.featuredProduct.ctaLabel })).toHaveAttribute(
            'href',
            slide?.featuredProduct.ctaUrl,
        );
    });
});
