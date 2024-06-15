<script lang="ts">
	import loadingImgUrl from '$lib/images/loading-blue.gif';
  import { ProgressBar } from '@skeletonlabs/skeleton';
  import { blur } from 'svelte/transition';
</script>

<div class="w-full flex justify-center items-center" out:blur={{duration: 100}}>
	<div id="loading-panel" class="card variant-ghost-secondary flex flex-col justify-center items-center">
		<div>
			<img src="{loadingImgUrl}" alt="loading" width="250">
			<p class="mb-4 pb-4">
				Resources are incoming... Please wait
			</p>
		</div>
		<ProgressBar value={undefined} meter="variant-filled-secondary" track=""/>
	</div>
</div>

<style>

	div#loading-panel {
		min-width: 30%;
		width: 40%;
		max-width: 100%;
	}

	div#loading-panel>div {
		margin-bottom: 2.5rem;
	}
</style>