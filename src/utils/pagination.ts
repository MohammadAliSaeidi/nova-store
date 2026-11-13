export function getPageCount(itemCount: number, pageSize: number): number {
	const safePageSize = Number.isFinite(pageSize)
		? Math.max(1, Math.trunc(pageSize))
		: 1;
	const safeItemCount = Number.isFinite(itemCount)
		? Math.max(0, Math.trunc(itemCount))
		: 0;
	return Math.max(1, Math.ceil(safeItemCount / safePageSize));
}

export function clampPage(page: number, pageCount: number): number {
	const safePageCount = Number.isFinite(pageCount)
		? Math.max(1, Math.trunc(pageCount))
		: 1;
	const safePage = Number.isFinite(page) ? Math.trunc(page) : 1;
	return Math.min(Math.max(1, safePage), safePageCount);
}

export function paginateItems<T>(
	items: readonly T[],
	page: number,
	pageSize: number,
): T[] {
	const safePageSize = Number.isFinite(pageSize)
		? Math.max(1, Math.trunc(pageSize))
		: 1;
	const start = (clampPage(page, getPageCount(items.length, safePageSize)) - 1) * safePageSize;
	return items.slice(start, start + safePageSize);
}
