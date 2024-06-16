import { mockFetching } from '$lib/utils/CommonUtils.js';

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

# H1

## H21

### H31

## H22

### H32

#### H41

### H33

## H23

# H12

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
		unitFetcher: async () => {
			return mockFetching(mockData);
		}
	};
}

export function _renderTableOfContent(contentElement) {

	let resultHtml = "<div  class='fixed mr-2 pr-2 card variant-ghost-tertiary p-4' style='top: 15rem; width: 15vw;'>"

	const headings = Array.from<HTMLHeadingElement>(contentElement.querySelectorAll("h1, h2, h3, h4"));

	resultHtml += `
		<p>
			<i class="bi bi-list-stars mr-2"></i>
			<strong>Table of Contents</strong>
		</p>
		<hr class="my-2">
	`;

	if (headings) {
		const mappedHeadings = headings.map((h: HTMLHeadingElement) => {
			return `
			<div class="tocref tocref-${h.tagName}">
				<a id="tocref-${h.id}" class="tocref" href="#${h.id}">
					<p>${h.innerText}</p>
				</a>
			</div>
			`;
		});

		resultHtml += mappedHeadings.join("\n");
	}

	return resultHtml + "</div>";
}
