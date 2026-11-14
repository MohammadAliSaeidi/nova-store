import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
	productId: number;
	quantity: number;
};

type CartState = {
	items: CartItem[];
	isHydrated: boolean;
	addItem: (productId: number) => void;
	increase: (productId: number) => void;
	decrease: (productId: number) => void;
	removeItem: (productId: number) => void;
	clear: () => void;
};

function readStoredItems(value: unknown): CartItem[] {
	if (!value || typeof value !== "object") return [];
	const items = (value as { items?: unknown }).items;
	if (!Array.isArray(items)) return [];

	const byProduct = new Map<number, number>();
	for (const item of items as unknown[]) {
		if (!item || typeof item !== "object") continue;
		const candidate = item as { productId?: unknown; quantity?: unknown };
		if (
			typeof candidate.productId !== "number" ||
			!Number.isSafeInteger(candidate.productId) ||
			candidate.productId < 1 ||
			typeof candidate.quantity !== "number" ||
			!Number.isSafeInteger(candidate.quantity) ||
			candidate.quantity < 1
		) {
			continue;
		}
		const current = byProduct.get(candidate.productId) ?? 0;
		const next = current + candidate.quantity;
		if (Number.isSafeInteger(next))
			byProduct.set(candidate.productId, next);
	}

	return Array.from(byProduct, ([productId, quantity]) => ({
		productId,
		quantity,
	}));
}

export function getCartQuantity(items: readonly CartItem[]): number {
	return items.reduce((total, item) => total + item.quantity, 0);
}

export const useCartStore = create<CartState>()(
	persist(
		(set) => ({
			items: [],
			isHydrated: false,
			addItem: (productId) =>
				set((state) => {
					const existing = state.items.find(
						(item) => item.productId === productId,
					);
					if (existing) {
						if (existing.quantity === Number.MAX_SAFE_INTEGER)
							return state;
						return {
							items: state.items.map((item) =>
								item.productId === productId
									? {
											...item,
											quantity:
												item.quantity + 1,
										}
									: item,
							),
						};
					}
					return {
						items: [
							...state.items,
							{ productId, quantity: 1 },
						],
					};
				}),
			increase: (productId) =>
				set((state) => ({
					items: state.items.map((item) =>
						item.productId === productId &&
						item.quantity < Number.MAX_SAFE_INTEGER
							? { ...item, quantity: item.quantity + 1 }
							: item,
					),
				})),
			decrease: (productId) =>
				set((state) => ({
					items: state.items.map((item) =>
						item.productId === productId && item.quantity > 1
							? { ...item, quantity: item.quantity - 1 }
							: item,
					),
				})),
			removeItem: (productId) =>
				set((state) => ({
					items: state.items.filter(
						(item) => item.productId !== productId,
					),
				})),
			clear: () => set({ items: [] }),
		}),
		{
			name: "nova-store-cart",
			skipHydration: true,
			partialize: (state) => ({ items: state.items }),
			merge: (persistedState, currentState) => ({
				...currentState,
				items: readStoredItems(persistedState),
			}),
		},
	),
);
