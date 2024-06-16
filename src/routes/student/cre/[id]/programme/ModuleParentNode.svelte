<script lang="ts">
  import { TreeViewItem } from "@skeletonlabs/skeleton";

	export let text: string;
	export let backgroundUrl: string;
	export let icon: string;

	let headingImgStyle = `background-image: url(${backgroundUrl});`

</script>

<div class="flex h-full !w-full variant-ghost-surface m-0 p-0 rounded-lg pl-4 items-center align-center content-center">
	<div class="py-4 grow">
		<h2 class="h5">{text}</h2>
	</div>
	<div class="heading-img" style="{headingImgStyle}">
	</div>
</div>

<style>
	div.heading-img {

		@apply flex-none !justify-self-stretch !content-stretch !items-stretch !self-stretch rounded-r-lg;

		margin-top: 1px;
		margin-right: 1px;

		min-width: 300px;
		max-width: 300px;

		height: 100% !important;
		min-height: 100%;
		max-height: 100%;

		padding: 1.8rem;

		background-size: cover;
		background-repeat: no-repeat;
		background-position: center right;

		mask-image: linear-gradient(to right, transparent 10%, black 25%);
	}
</style>