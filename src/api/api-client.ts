import axios, { type AxiosError, type AxiosResponse } from "axios";

export type ApiResponse<T> = AxiosResponse<T>;

export type ApiError = {
	message: string;
	status: number | null;
	code: string | null;
};

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!apiBaseUrl) {
	throw new Error(
		"NEXT_PUBLIC_API_BASE_URL must be configured before making API requests.",
	);
}

export const apiClient = axios.create({
	baseURL: apiBaseUrl,
	headers: { Accept: "application/json" },
	timeout: 10_000,
});

export function toApiError(error: unknown): ApiError {
	if (!axios.isAxiosError(error)) {
		return {
			message: "Unexpected request error",
			status: null,
			code: null,
		};
	}

	const typedError = error as AxiosError<{ message?: unknown }>;
	const bodyMessage = typedError.response?.data?.message;
	const message =
		typeof bodyMessage === "string" ? bodyMessage : typedError.message;

	return {
		message,
		status: typedError.response?.status ?? null,
		code: typedError.code ?? null,
	};
}
