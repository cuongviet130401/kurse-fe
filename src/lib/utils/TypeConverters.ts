import type { PaginatedResponseMetadata } from "$lib/types/kurse";
import type { PaginationSettings } from "@skeletonlabs/skeleton";

export function toPaginationSettings(metadata: PaginatedResponseMetadata): PaginationSettings {
	return {
		page: metadata.page,
		limit: metadata.per_page,
		size: metadata.total_count,
		amounts: [metadata.per_page]
	};
}