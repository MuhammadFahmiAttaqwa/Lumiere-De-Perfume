import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from '@/app/App';
import { ENV } from '@/shared/config/env';
import './index.css';

const ROOT_ELEMENT_ID = 'root';
// const MOCK_UNHANDLED_REQUEST_STRATEGY = 'bypass';

async function enableMockingAsync(): Promise<void> {
    if (!ENV.enableMock) {
        return;
    }

    // const { worker } = await import('@/mocks/browser');
    // await worker.start({ onUnhandledFrame: MOCK_UNHANDLED_REQUEST_STRATEGY, quiet: true });
    const { startMockNetworkAsync } = await import('@/mocks/browser');
    await startMockNetworkAsync();
}

async function bootstrapAsync(): Promise<void> {
    try {
        await enableMockingAsync();
    } catch (error) {
        console.error('Mock API failed to start; continuing without mocks.', error);
    }

    const rootElement = document.getElementById(ROOT_ELEMENT_ID);

    if (!rootElement) {
        throw new Error(`Root element #${ROOT_ELEMENT_ID} was not found.`);
    }

    createRoot(rootElement).render(
        <StrictMode>
            <App />
        </StrictMode>,
    );
}

void bootstrapAsync();
