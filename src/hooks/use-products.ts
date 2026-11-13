import { getProducts } from "@/requests/get-products";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const PRODUCT_KEYS = ["catalog", "products"] as const;

export const productsQueryOptions = queryOptions({
	queryKey: PRODUCT_KEYS,
	queryFn: getProducts,
	staleTime: 60_000,
});

export const useProducts = () => {
	return useQuery({ ...productsQueryOptions });
};
