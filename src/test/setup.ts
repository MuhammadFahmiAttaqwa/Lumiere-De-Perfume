import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterAll, afterEach, beforeAll, vi } from 'vitest';
import { server } from '@/mocks/server';

class ImmediateIntersectionObserver {
    public readonly root = null;
    public readonly rootMargin = '';
    public readonly thresholds: number[] = [];
    private readonly callback: IntersectionObserverCallback;

    constructor(callback: IntersectionObserverCallback) {
        this.callback = callback;
    }

    public observe(target: Element): void {
        const entry = { isIntersecting: true, target } as IntersectionObserverEntry;
        this.callback([entry], this as unknown as IntersectionObserver);
    }

    public unobserve(): void {}

    public disconnect(): void {}

    public takeRecords(): IntersectionObserverEntry[] {
        return [];
    }
}

vi.stubGlobal('IntersectionObserver', ImmediateIntersectionObserver);
Element.prototype.scrollIntoView = vi.fn();

beforeAll(() => {
    server.listen({ onUnhandledFrame: 'error' });
});

afterEach(() => {
    cleanup();
    server.resetHandlers();
});

afterAll(() => {
    server.close();
});
