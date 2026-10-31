import { fileURLToPath, URL } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

const DEFAULT_BASE_PATH = '/';
const ENV_PREFIX = 'VITE_';
const PROJECT_ROOT = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, PROJECT_ROOT, ENV_PREFIX);

    return {
        base: env.VITE_BASE_PATH || DEFAULT_BASE_PATH,
        plugins: [react(), tailwindcss()],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url)),
            },
        },
        optimizeDeps: {
            // include: ['msw/browser'],
            include: ['msw/experimental', '@mswjs/interceptors/fetch', '@mswjs/interceptors/XMLHttpRequest'],
        },
    };
});
