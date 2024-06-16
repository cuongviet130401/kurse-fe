
interface PaginatedResponseMetadata {
	page: number,
	per_page: number,
	page_count: number,
	total_count: number,
	Links: Record<string, string>[];
}

export interface ModuleTreeNode {
	id: string,
	content: string,
	icon?: string,
	children?: ModuleTreeNode[],
	backgroundUrl?: string,
	isHeading?: boolean,
}

export interface PaginatedResponse {
	_metadata: PaginatedResponseMetadata,
	records: any[]
}

export interface TableHeader {
	columnTitle: string,
	icon?: string,
	sortable?: boolean,
	columnDatatype?: any,
}