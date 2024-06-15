<script>
  import { RecursiveTreeView } from '@skeletonlabs/skeleton';



	export let data;

</script>

<div class="variant-ghost-surface w-full m-4 p-4 rounded-lg">
	<h1 class="h1">{data.courseTitle}</h1>
</div>


<div class="flex flex-col">
	<section id="programme-tree" class="">

	<RecursiveTreeView nodes={data.data} />

	</section>
	<section id="unit-details-side-panel">

	</section>
</div>


