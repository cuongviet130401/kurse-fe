<script lang="ts">
  import { CodeBlock, storeHighlightJs } from '@skeletonlabs/skeleton';
	import { getAstNode } from 'svelte-exmarkdown';
	import hljs from 'highlight.js/lib/core';
	import xml from 'highlight.js/lib/languages/xml'; // for HTML
	import css from 'highlight.js/lib/languages/css';
	import json from 'highlight.js/lib/languages/json';
	import javascript from 'highlight.js/lib/languages/javascript';
	import typescript from 'highlight.js/lib/languages/typescript';
	import shell from 'highlight.js/lib/languages/shell';
	import 'highlight.js/styles/github-dark.css';

	// Register each imported language module
	hljs.registerLanguage('xml', xml); // for HTML
	hljs.registerLanguage('css', css);
	hljs.registerLanguage('json', json);
	hljs.registerLanguage('javascript', javascript);
	hljs.registerLanguage('typescript', typescript);
	hljs.registerLanguage('shell', shell);

	storeHighlightJs.set(hljs);

	const astContext = getAstNode();

	const languageMappings: any = {
		"language-ts": "typescript"
	}

	function pickLanguageFrom(astContext: any): string {
		return languageMappings[astContext?.properties?.class?.toString()] ?? "text";
	}

	function pickCodeValue(astContext: any): string {
		return astContext?.children[0].value?.toString() ?? "";
	}
</script>

<!-- <pre>{JSON.stringify($astContext, null, 2)}</pre> -->

<CodeBlock language={pickLanguageFrom($astContext)} code={pickCodeValue($astContext)}/>