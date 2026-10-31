import { FetchInterceptor } from '@mswjs/interceptors/fetch';
import { XMLHttpRequestInterceptor } from '@mswjs/interceptors/XMLHttpRequest';
import { defineNetwork, InterceptorSource } from 'msw/experimental';
// import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

// const CONTROLLER_WAIT_TIMEOUT_MS = 3000;
const UNHANDLED_REQUEST_STRATEGY = 'bypass';

// export const worker = setupWorker(...handlers);

const network = defineNetwork({
    sources: [
        new InterceptorSource({
            interceptors: [new FetchInterceptor(), new XMLHttpRequestInterceptor()],
        }),
    ],
    handlers,
    onUnhandledFrame: UNHANDLED_REQUEST_STRATEGY,
});

// function waitForServiceWorkerControlAsync(): Promise<void> {
//     if (!('serviceWorker' in navigator) || navigator.serviceWorker.controller) {
//         return Promise.resolve();
//     }
//
//     return new Promise((resolve) => {
//         const timeoutId = window.setTimeout(resolve, CONTROLLER_WAIT_TIMEOUT_MS);
//
//         navigator.serviceWorker.addEventListener(
//             'controllerchange',
//             () => {
//                 window.clearTimeout(timeoutId);
//                 resolve();
//             },
//             { once: true },
//         );
//     });
// }

// export async function startMockWorkerAsync(): Promise<void> {
//     await worker.start({ onUnhandledFrame: UNHANDLED_REQUEST_STRATEGY, quiet: true });
//     await waitForServiceWorkerControlAsync();
// }

export async function startMockNetworkAsync(): Promise<void> {
    await network.enable();
}
