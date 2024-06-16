<script lang="ts">
  import LoadingPanel from "$lib/components/shared/LoadingPanel.svelte";
  import { Avatar } from "@skeletonlabs/skeleton";
	import type { PageData } from "./$types";
  import BitbleMarkdown from "$lib/components/shared/BitbleMarkdown.svelte";
  import { _fetchCourseData } from "./+page";
  import { page } from "$app/stores";

	// export let data: PageData;

</script>

{#await _fetchCourseData($page.params.courseId)}
	<LoadingPanel/>
{:then fetchedData}

<section id="course-banner" class="flex relative">
	<img src="{fetchedData.bannerUrl}" class="absolute" alt="course-banner" id="banner" style="margin-top: -{fetchedData.bannerPosition}%">
	<div id="course-title" class="w-full pl-4 flex flex-col h-full justify-between">
		<div class="!grow">

		</div>
		<div class="flex flex-row w-full p-4 items-end">
			<div class="grow">
				<h1 class="h1">{fetchedData.title}</h1>
				<sub>{fetchedData.subtitle}</sub>
			</div>
			<aside id="teacher-info" class="pb-4 mb-4 !mr-4 text-right">
				<div class="inline-block !mr-4 !pr-4" style="margin-right: 1rem;">
					<p><strong>{"Steve Pham"}</strong></p>
				</div>
				<div class="inline-block space-x-4">
					<Avatar/>
				</div>
			</aside>
		</div>
	</div>
</section>

<div class="flex">

	<section id="course-description" class="grow w-full">
		<BitbleMarkdown md={fetchedData.description} />
	</section>

	<section id="course-stats">
		<div class="stat">
			<p class="stat-figure">{fetchedData.numberOfLiked}</p>
			<p>Number of Likes</p>
		</div>
		<div class="stat">
			<p class="stat-figure">{fetchedData.numberOfEnrolled}</p>
			<p>Number of Enrolled</p>
		</div>
	</section>

</div>

{/await}


<style>

	section#course-banner {
		@apply p-0;
		height: 30vh;
		min-height: 30vh;
		max-height: 30vh;
		overflow: hidden;
		margin-left: -2rem;
		width: 96vw;
		min-width: 96vw;
		margin-bottom: 2rem;
	}

	img#banner {
		min-width: 100%;
		width: 100%;
		z-index: -50;
	}

	div#course-title {

	}

	aside#teacher-info {
		height: 20%;
		min-width: 20%;
		max-width: 30% !important;
		padding-bottom: 3rem;

	}

	section#course-description {
		@apply p-4 mx-8;
	}

	section#course-stats {
		@apply p-4 flex flex-col gap-4;
		max-width: 100%;
		width: 20%;
		min-width: 20%;
	}

	section#course-stats div.stat {
		@apply p-4 card variant-outline-primary w-full;
	}

	div.stat p.stat-figure {
		@apply h3 text-2xl text-primary-500;
	}

</style>