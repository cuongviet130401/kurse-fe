import { mockFetching } from '$lib/utils/CommonUtils.js';
import { type ModuleTreeNode } from '$lib/types/kurse.d';
import type { TreeViewNode } from "@skeletonlabs/skeleton";
import ModuleParentNode from './ModuleParentNode.svelte';

const mockData: ModuleTreeNode[] = [
	{
		id: "1",
		content: "Getting Started",
		children: [
			{
				id: "11",
				content: "Introduction to the course",
			}
		],
		backgroundUrl: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/colorful-shapes-linkedin-banner-design-template-129e27413e10f5ee96cfbda6e6dd05ce_screen.jpg?ts=1676569327"
	},
	{
		id: "2",
		content: "Chapter I: ABC",
		children: [
			{
				id: "21",
				content: "Unit 1.1: A"
			},
			{
				id: "22",
				content: "Unit 1.1: B"
			},
			{
				id: "23",
				content: "Unit 1.1: C"
			}
		]
	},
	{
		id: "3",
		content: "Chapter II: XYZ",
		children: [
			{
				id: "31",
				content: "Unit 1.1: X"
			},
			{
				id: "32",
				content: "Unit 1.1: Y"
			},
			{
				id: "33",
				content: "Unit 1.1: Z"
			}
		]
	},
	{
		id: "5",
		content: "Chapter II: XYZ",
		children: [
			{
				id: "51",
				content: "Unit 1.1: X"
			},
			{
				id: "52",
				content: "Unit 1.1: Y"
			},
			{
				id: "53",
				content: "Unit 1.1: Z"
			}
		]
	},
	{
		id: "6",
		content: "Chapter II: XYZ",
		children: [
			{
				id: "61",
				content: "Unit 1.1: X"
			},
			{
				id: "62",
				content: "Unit 1.1: Y"
			},
			{
				id: "63",
				content: "Unit 1.1: Z"
			},
			{
				id: "64",
				content: "Unit 1.1: X"
			},
			{
				id: "65",
				content: "Unit 1.1: Y"
			},
			{
				id: "66",
				content: "Unit 1.1: Z"
			}
		]
	},
	{
		id: "4",
		content: "Course Ending & Reviews",
		children: [
			{
				id: "41",
				content: "Overall Reviews"
			},
			{
				id: "42",
				content: "Review Chapter I"
			},
			{
				id: "43",
				content: "Review Chapter II"
			}
		]
	}
];

export function load({ params }) {
	return {
		courseId: params.id,
		courseTitle: "Test course",
		data: mockData.map(e => {
			e.isHeading = true;
			return toTreeViewNode(e);
		}),
		courseDetailsFetcher: async () => {
			return mockFetching(mockData);
		},
		courseDetailsPreviewFetcher: async (id: string | number) => {
			return mockFetching({
				id
			});
		}
	};
}

function toTreeViewNode(node: ModuleTreeNode): TreeViewNode {

	let mappedChildrenNodes: TreeViewNode[] = [];
	let mappedIcon = (node.children && node.children?.length)
		? "bi-files"
		: "bi-file-earmark";

	for (const childNode of (node.children ?? [])) {
		mappedChildrenNodes.push(toTreeViewNode(childNode));
	}

	return (!!node.isHeading) ? {
		id: node.id,
		content: ModuleParentNode,
		contentProps: {
			text: node.content,
			backgroundUrl: node.backgroundUrl
		},
		children: mappedChildrenNodes,
	} : {
		id: node.id,
		content: `<a href="?open=${node.id}"><div class="p-4 w-full"><p>${node.content}</p></div></a>`,
		lead: `<i class='bi ${node.icon ?? mappedIcon}'></i>`,
		children: mappedChildrenNodes,
	}
}