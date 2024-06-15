<script lang="ts">
  import { onMount } from "svelte";
	import { _fetchFeaturedPosts } from './+page'
  import { sineInOut } from "svelte/easing";
	import { blur, fade, slide } from "svelte/transition";

  let carousel: HTMLElement;
	let isHovering = false;
	let isReservedScroll = false;

	function handleAutoScrolling() {

		if (carousel?.scrollLeft === carousel?.scrollWidth - carousel?.clientWidth) {
			isReservedScroll = true;
		} else if (carousel?.scrollLeft === 0 && isReservedScroll) {
			isReservedScroll = false;
		}

		if (!isHovering) {
			carousel?.scrollBy({
				left: (isReservedScroll) ? -1 : 1,
				behavior: 'smooth'
			});
		}
	}

	onMount(() => {
		setInterval(handleAutoScrolling, 24)
	})
</script>

<section class="flex-col justify-between items-center gap-8" style="padding-bottom: 14px">
  <div id="hero-title" style="margin-top: 200px; margin-bottom: 200px;">
    <p class="font-tex font-thin text-white leading-loose" style="font-size: 100px">Bitble Magazine</p>
		<div class="mx-4"></div>
			<div class="input-group input-group-divider flex flex-row pl-2 items-center variant-form-material" style="background: none">
				<input class="grow text-xl" type="search" placeholder="Search your topic"/>
				<!-- <a href="/" title="Username already in use.">(icon)</a> -->
				<span class="text-2xl" style="margin-right: 16px;"><i class="bi bi-search"></i></span>
			</div>
  </div>

    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <!-- svelte-ignore a11y-mouse-events-have-key-events -->
		{#await _fetchFeaturedPosts()}
			<div class="w-full flex flex-row min-h-1/4 gap-4 justify-stretch" out:fade={{duration: 250}}>
				<div class="placeholder min-h-8 animate-pulse py-12 w-full rounded-lg" style="min-height: 150px" />
				<div class="placeholder min-h-8 animate-pulse py-12 w-full rounded-lg" style="min-height: 150px" />
				<div class="placeholder animate-pulse w-full py-12 rounded-lg" style="min-height: 150px" />
			</div>

		{:then value}
			<div
				id="featured-posts"
				bind:this={carousel}
				on:mouseover={() => { isHovering = true }}
				on:mouseout={() => { isHovering = false }}
				class="scroll-px-4 scroll-smooth flex gap-4 px-4 py-10 max-w-full overflow-x-scroll bottom-0 self-end justify-self-end place-self-end no-scrollbar"
				in:slide={{ easing: sineInOut, duration: 500, delay: 100 }}
			>

				{#each value as v}
					<div
						class="shrink-0 card py-20 w-40 md:w-80 text-center"
						style="width: 500px"
					>
						<div class="card m-8 p-8 variant-ghost">
							<span class="font-tex">{v}</span>
						</div>
					</div>
				{/each}
			</div>
		{/await}

</section>

<style>
  section {
    @apply w-screen min-h-[50vh] p-12 flex;
  }

	.no-scrollbar {
			-ms-overflow-style: none;  /* IE and Edge */
			scrollbar-width: none;  /* Firefox */
  }

	.no-scrollbar::-webkit-scrollbar {
		display: none;
	}
</style>
