<script lang="ts">

	import 'highlight.js/styles/github-dark-dimmed.css';
	import 'katex/dist/katex.css';
	import Markdown from "svelte-exmarkdown";
	import plugins from '$lib/configs/markdown-config';
	import { CodeBlock } from "@skeletonlabs/skeleton";

	export let md: string = ``;

</script>

<div class="markdown-content">
	<Markdown {md} {plugins}/>
</div>