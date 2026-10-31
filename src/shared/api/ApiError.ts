export class ApiError extends Error {
    public readonly status: number;
    public readonly fieldErrors: Record<string, string[]>;

    constructor(
        message: string,
        status: number,
        fieldErrors: Record<string, string[]> = {},
    ) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
        this.fieldErrors = fieldErrors;
    }

    public get isClientError(): boolean {
        return this.status >= 400 && this.status < 500;
    }
}
