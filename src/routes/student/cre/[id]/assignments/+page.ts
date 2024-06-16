import type { PaginatedResponse, TableHeader } from "$lib/types/kurse.js";
import { mockFetching } from "$lib/utils/CommonUtils";

const mockData: PaginatedResponse = {
	_metadata: {
		page: 0,
		per_page: 10,
		page_count: 2,
		total_count: 12,
		Links: [

		]
	},
	records: [
		{
			id: "1",
			title: "Test Assignment: Optional + Opening",
			dueDate: Date.parse("30/06/2024"),
			lastUpdateDate: null,
			openDate: Date.parse("10/06/2024"),
			isOptional: true,
		},
		{
			id: "2",
			title: "Test Assignment: Overdue",
			dueDate: Date.parse("10/06/2024"),
			lastUpdateDate: null,
			openDate: null,
			isOptional: false,
		},
		{
			id: "3",
			title: "Test Assignment: Submitted + Near due",
			dueDate: Date.parse("20/06/2024"),
			lastUpdateDate: null,
			openDate: Date.parse("10/06/2024"),
			isOptional: false,
		},
		{
			id: "4",
			title: "Test Assignment: Scheduled",
			dueDate: Date.parse("10/07/2024"),
			lastUpdateDate: null,
			openDate: Date.parse("30/06/2024"),
			isOptional: false,
		},
		{
			id: "1",
			title: "Test Assignment: Optional + Opening",
			dueDate: Date.parse("30/06/2024"),
			lastUpdateDate: null,
			openDate: Date.parse("10/06/2024"),
			isOptional: true,
		},
		{
			id: "2",
			title: "Test Assignment: Overdue",
			dueDate: Date.parse("10/06/2024"),
			lastUpdateDate: null,
			openDate: null,
			isOptional: false,
		},
		{
			id: "3",
			title: "Test Assignment: Submitted + Near due",
			dueDate: Date.parse("20/06/2024"),
			lastUpdateDate: null,
			openDate: Date.parse("10/06/2024"),
			isOptional: false,
		},
		{
			id: "4",
			title: "Test Assignment: Scheduled",
			dueDate: Date.parse("10/07/2024"),
			lastUpdateDate: null,
			openDate: Date.parse("30/06/2024"),
			isOptional: false,
		},{
			id: "1",
			title: "Test Assignment: Optional + Opening",
			dueDate: Date.parse("30/06/2024"),
			lastUpdateDate: null,
			openDate: Date.parse("10/06/2024"),
			isOptional: true,
		},
		{
			id: "2",
			title: "Test Assignment: Overdue",
			dueDate: Date.parse("10/06/2024"),
			lastUpdateDate: null,
			openDate: null,
			isOptional: false,
		}
	]

}

export function load({ params }) {
	return {
		courseId: params.id,
		assignmentsFetcher: async () => {
			return mockFetching(mockData);
		},
		assignmentDetailsFetcher: async (id) => {
			return mockFetching({});
		}
	};
}

export const _assignmentDataTableHeaders: TableHeader[] = [
	{
		columnTitle: "id",
	},
	{
		columnTitle: "Title",
		icon: "bi-journal",
	},
	{
		columnTitle: "Due Date",
		icon: "bi-calendar",
		columnDatatype: Date,
	},
	{
		columnTitle: "Open Date",
		icon: "bi-calendar-plus",
		columnDatatype: Date,
	}
]