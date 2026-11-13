import { apiClient } from "@/api/api-client";

export async function getCategories() {
	const response = await apiClient.get<string[]>("/products/categories");
	return response.data;
}
