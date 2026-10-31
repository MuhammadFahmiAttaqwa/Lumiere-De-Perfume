import { ENV } from '@/shared/config/env';

export function apiUrl(endpoint: string): string {
    return `${ENV.apiBaseUrl}${endpoint}`;
}
