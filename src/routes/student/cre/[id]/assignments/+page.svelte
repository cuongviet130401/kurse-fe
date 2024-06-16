<script lang="ts">
  import { page } from '$app/stores';
  import BitbleDataTable from '$lib/components/shared/BitbleDataTable.svelte';
  import LoadingPanel from '$lib/components/shared/LoadingPanel.svelte';
  import { RecursiveTreeView } from '@skeletonlabs/skeleton';
  import { _assignmentDataTableHeaders } from './+page';

	export let data;

	let assignmentsFetcher = data.assignmentsFetcher();

	$: openedUnit = $page.url.searchParams.get("open");
	$: moduleTreeClass = (!!openedUnit) ? "half-view-width" : "w-full";


</script>

<div class="variant-ghost-surface w-full m-4 p-4 rounded-lg">
	<h1 class="h1">{data.courseId}</h1>
</div>


<div id="module-tree-view" class="flex flex-row py-4 w-full gap-8">
	<section id="programme-tree" class="{moduleTreeClass}">

		{#await assignmentsFetcher}
		<LoadingPanel/>
		{:then value}
		<BitbleDataTable
			paginatedResponse={value}
			tableHeaders={_assignmentDataTableHeaders}
			interactable
		/>
		{/await}

	</section>

	{#if !!openedUnit}
		 <section class="half-view-width variant-ghost-primary rounded sticky top-0" style="min-height: 100%;">
			{#await data.assignmentDetailsFetcher(openedUnit)}
			<div class="w-full space-y-4 m-4 p-4">
				<div class="placeholder animate-pulse" />
				<div class="placeholder animate-pulse" />
				<div class="placeholder animate-pulse" />
				<div class="placeholder animate-pulse" />
			</div>
			{:then value}
			<div class="card flex flex-col bg-transparent border-0 !ring-0 h-full p-0">
				<header class="card-header grow-0 my-4 p-4">
					<h2 class="h2">{value.id}</h2>
				</header>
				<section class="my-4 p-4 grow">
					{openedUnit}
				</section>
				<hr class="my-2 border-primary-500">
				<footer class="card-footer grow-0 flex flex-row-reverse px-4 my-2">
					<a href="programme/unit/{value.id}" class="btn bg-gradient-to-br variant-gradient-tertiary-secondary !text-white">
						Go to unit
						<span class="ml-2"><i class="bi bi-chevron-right"></i></span>
					</a>
				</footer>
			</div>
			<div></div>

			{/await}

		 </section>
	{/if}

</div>

<style>

	div#module-tree-view {
		overflow: hidden;
		overflow-y: scroll;
		min-height: 85vh;
		max-height: 85vh;
	}

	.half-view-width {
		width: 50%;
		max-width: 50%;
	}

</style>