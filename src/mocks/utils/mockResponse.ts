import { HttpResponse } from 'msw';
import type { ApiResponse } from '@/shared/api';

const SUCCESS_MESSAGE = 'OK';
const HTTP_OK = 200;

export function okResponse<T>(
    data: T,
    status: number = HTTP_OK,
) {
    const body: ApiResponse<T> = {
        isSuccess: true,
        message: SUCCESS_MESSAGE,
        data,
        errors: null,
    };

    return HttpResponse.json(body, { status });
}

export function failResponse(
    message: string,
    status: number,
    errors: Record<string, string[]> | null = null,
) {
    const body: ApiResponse<null> = {
        isSuccess: false,
        message,
        data: null,
        errors,
    };

    return HttpResponse.json(body, { status });
}
