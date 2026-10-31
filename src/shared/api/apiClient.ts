import axios, { type AxiosRequestConfig } from 'axios';
import { ENV } from '@/shared/config/env';
import { HTTP_STATUS } from '@/shared/constants/appConfig';
import { UI_TEXT } from '@/shared/constants/uiText';
import { ApiError } from './ApiError';
import type { ApiResponse } from './ApiResponse';

const TIMEOUT_ERROR_CODE = 'ECONNABORTED';

const httpClient = axios.create({
    baseURL: ENV.apiBaseUrl,
    timeout: ENV.apiTimeoutMs,
    withCredentials: true,
    headers: {
        Accept: 'application/json',
    },
});

function isApiResponse(value: unknown): value is ApiResponse<unknown> {
    return (
        typeof value === 'object' &&
        value !== null &&
        'isSuccess' in value &&
        typeof (value as ApiResponse<unknown>).isSuccess === 'boolean'
    );
}

function toApiError(error: unknown): ApiError {
    if (error instanceof ApiError) {
        return error;
    }

    if (!axios.isAxiosError(error)) {
        return new ApiError(UI_TEXT.errors.generic, HTTP_STATUS.unknown);
    }

    if (error.code === TIMEOUT_ERROR_CODE) {
        return new ApiError(UI_TEXT.errors.timeout, HTTP_STATUS.unknown);
    }

    if (!error.response) {
        return new ApiError(UI_TEXT.errors.network, HTTP_STATUS.unknown);
    }

    const status = error.response.status;
    const body: unknown = error.response.data;

    if (status >= HTTP_STATUS.internalServerError || !isApiResponse(body)) {
        return new ApiError(UI_TEXT.errors.generic, status);
    }

    return new ApiError(body.message || UI_TEXT.errors.generic, status, body.errors ?? {});
}

async function requestAsync<T>(config: AxiosRequestConfig): Promise<T> {
    try {
        const response = await httpClient.request<unknown>(config);
        const body = response.data;

        if (!isApiResponse(body)) {
            throw new ApiError(UI_TEXT.errors.invalidResponse, response.status);
        }

        if (!body.isSuccess) {
            throw new ApiError(body.message || UI_TEXT.errors.generic, response.status, body.errors ?? {});
        }

        return body.data as T;
    } catch (error) {
        throw toApiError(error);
    }
}

export const apiClient = {
    getAsync<T>(
        url: string,
        config?: AxiosRequestConfig,
    ): Promise<T> {
        return requestAsync<T>({ ...config, method: 'GET', url });
    },

    postAsync<T>(
        url: string,
        body?: unknown,
        config?: AxiosRequestConfig,
    ): Promise<T> {
        return requestAsync<T>({ ...config, method: 'POST', url, data: body });
    },

    putAsync<T>(
        url: string,
        body?: unknown,
        config?: AxiosRequestConfig,
    ): Promise<T> {
        return requestAsync<T>({ ...config, method: 'PUT', url, data: body });
    },

    deleteAsync<T>(
        url: string,
        config?: AxiosRequestConfig,
    ): Promise<T> {
        return requestAsync<T>({ ...config, method: 'DELETE', url });
    },
};
