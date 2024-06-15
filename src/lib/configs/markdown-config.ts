import { gfmPlugin } from "svelte-exmarkdown/gfm";
import typescript from 'highlight.js/lib/languages/typescript';
import rehypeHighlight from "rehype-highlight";
import type { Plugin } from "svelte-exmarkdown";
import remarkGfm from 'remark-gfm';
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import BitbleCodeBlock from "$lib/components/shared/BitbleCodeBlock.svelte";

const plugins: Plugin[] = [
	gfmPlugin(),
	{
		remarkPlugin: [
			remarkMath
		],
		rehypePlugin: [
			rehypeKatex
		]
	},
	{
		remarkPlugin: [
			remarkGfm,
		],
	},
	{
		renderer: { code: BitbleCodeBlock }
	}
];

export default plugins;