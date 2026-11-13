import { apiClient } from "@/api/api-client";
import { Product } from "@/types/product";

export async function getProducts() {
	const response = await apiClient.get<Product[]>("/products");
	return response.data;
}
