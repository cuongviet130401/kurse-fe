import { mockFetching } from '$lib/utils/CommonUtils.js';
import type { TreeViewNode } from '@skeletonlabs/skeleton';

const mockData: TreeViewNode[] = [
	{
		id: "1",
		content: "Getting Started",
		lead: "",
		children: [
			{
				id: "",
				content: "",
				lead: "",
				children: [

				]
			},
			{
				id: "",
				content: "",
				lead: "",
				children: [

				]
			},
		]
	},
	{
		id: "2",
		content: "",
		lead: "",
		children: [
			{
				id: "",
				content: "",
				lead: "",
				children: [

				]
			},
			{
				id: "",
				content: "",
				lead: "",
				children: [

				]
			},
		]
	},
];

export function load({ params }) {
	return {
		courseId: params.id,
		courseTitle: "Test course",
		data: mockData,
		courseDetailsFetcher: async () => {
			return mockFetching(mockData);
		}
	};
}