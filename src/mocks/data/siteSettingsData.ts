import type { SiteSettings } from '@/features/site';
import { publicAssetUrl } from '@/shared/lib/publicAssetUrl';

export const SITE_SETTINGS_DATA: SiteSettings = {
    brandName: 'Lumière de Peau',
    logoUrl: null,
    navigation: [
        { id: 'nav-new', label: 'New Arrivals', url: '/?sort=newest#catalog', sortOrder: 1 },
        { id: 'nav-catalog', label: 'Catalog', url: '/#catalog', sortOrder: 2 },
        { id: 'nav-articles', label: 'Articles', url: '/?panel=articles', sortOrder: 3 },
        { id: 'nav-academy', label: 'Academy', url: '/?panel=academy', sortOrder: 4 },
    ],
    footer: {
        topLinks: [
            { id: 'ft-support', label: 'Support Centre', url: '/?page=support-centre', sortOrder: 1 },
            { id: 'ft-track', label: 'Track Your Order', url: '/?panel=orders', sortOrder: 2 },
            { id: 'ft-claims', label: 'Claims & Returns', url: '/?page=claims-returns', sortOrder: 3 },
        ],
        links: [
            { id: 'ft-work', label: 'Work With Us', url: '/?page=work-with-us', sortOrder: 1 },
            { id: 'ft-happy', label: 'Reach Your Happy Place', url: '/?page=happy-place', sortOrder: 2 },
            { id: 'ft-sustainability', label: 'Sustainability', url: '/?page=sustainability', sortOrder: 3 },
            { id: 'ft-investor', label: 'Investor Relations', url: '/?page=investor-relations', sortOrder: 4 },
            { id: 'ft-privacy', label: 'Privacy Policy', url: '/?page=privacy-policy', sortOrder: 5 },
            { id: 'ft-terms', label: 'Terms & Conditions', url: '/?page=terms-conditions', sortOrder: 6 },
        ],
        ctaTitle: 'Redefining what skincare means for you and the planet',
        ctaLabel: 'Join Us',
        ctaUrl: '/?panel=register',
        missionTitle: 'Mission',
        mission:
            'Empower individuals to feel confident in their skin through clean, effective, and science-backed skincare products.',
        contactTitle: 'Contact',
        contactEmail: 'customerservice@ldpskincare.com',
        contactPhone: '+62 994 2357 343',
        // imageUrl: '/images/footer-flower.svg',
        // imageUrl: '/images/design/footer-flower.png',
        imageUrl: publicAssetUrl('images/hero/hero-flower.webp'),
        marqueeText: 'Lumière de Peau',
    },
};
