export interface ApiResponse<T> {
    isSuccess: boolean;
    message: string;
    data: T | null;
    errors?: Record<string, string[]> | null;
}
