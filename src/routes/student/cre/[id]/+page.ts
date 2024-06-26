import { mockFetching } from '$lib/utils/CommonUtils.js';
import { provokeGet } from '$lib/utils/ServiceApiConnector.js';

const mockData = {
	id: 1,
  title: "Introduction to Programming",
  subtitle: "Beginner's Course with Python",
  bannerUrl: "https://wallpapercave.com/wp/wp7685924.jpg",
	bannerPosition: 25,
  description: `
# What you will get?

- Bullshit content
	- Inner **content**
- Meaningless assignments
- Non-practical and unrealistic as fuck tests

\`\`\`ts
const i: any = 1;

type {
	heheboiz: "value";
}
\`\`\`

$$
\\int_0^\\infty x^2 dx
$$
`,
  tags: ["Python", "Introduction"],
	price: 300000,
  numberOfEnrolled: 4000,
  numberOfLiked: 312333
}

export function load({ params }) {
	return {
		courseId: params.id,
	};
}

export async function _fetchCourseData(id: any) {
	// return mockFetching(mockData);
	return await provokeGet()
}
