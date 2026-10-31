import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { createMemoryRouter, RouterProvider } from 'react-router';

const TEST_PATH = '/';

export function renderWithProviders(
    element: ReactElement,
    initialEntry: string = TEST_PATH,
) {
    const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    const router = createMemoryRouter([{ path: TEST_PATH, element }], { initialEntries: [initialEntry] });

    const result = render(
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>,
    );

    return { ...result, router };
}
