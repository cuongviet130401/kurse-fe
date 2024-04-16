<script lang="ts">


	// @ts-expect-error reading from vite.config.js
	// eslint-disable-next-line no-undef


	// Logo
	

	// Base Classes
	const cBase = 'bg-white dark:bg-gray-800 text-xs md:text-base';
	const cRowOne = 'flex flex-col md:flex-row justify-between items-center md:items-start space-y-5 md:space-y-0';
	const cRowTwo = 'flex flex-col md:flex-row justify-between items-center md:items-start space-y-4 md:space-y-0';

	// Social Icons
	const socialLinks = [
		{ title: 'GitHub', href: 'https://github.com/skeletonlabs/skeleton', icon: 'fa-github' },
		{ title: 'Discord', href: 'https://discord.gg/EXqV7W8MtY', icon: 'fa-discord' },
		{ title: 'X (Twitter)', href: 'https://x.com/SkeletonUI', icon: 'fa-x-twitter' },
		{ title: 'YouTube', href: 'https://www.youtube.com/@skeletonlabs', icon: 'fa-youtube' }
	];
</script>

<div class="page-footer {cBase}">
	<div class="w-full max-w-7xl mx-auto p-4 py-16 md:py-24 space-y-10">
		<!-- Row 1 -->
		<section class={cRowOne}>
			<div class="grid grid-cols-1 gap-2 place-content-center place-items-center md:place-items-start">
				(logo)
				<p class="!text-sm opacity-80">Kurse</p>
			</div>
			<div class="hidden md:grid grid-cols-3 gap-8">
				<div class="space-y-6">
					<h6 class="h6">Explore</h6>
					<ul class="space-y-3">
						<li><a class="anchor" href="/introduction">Introduction</a></li>
						<li><a class="anchor" href="/blog">Blog</a></li>
					</ul>
				</div>
				<div class="space-y-6">
					<h6 class="h6">Features</h6>
					<ul class="space-y-3">
						<li><a class="anchor" href="/">page3</a></li>
						<li><a class="anchor" href="/">page4</a></li>
					</ul>
				</div>
				<div class="space-y-6">
					<h6 class="h6">Project</h6>
					<ul class="space-y-3">
						<li>
							<a class="anchor" href="https://" target="_blank" rel="noreferrer">page5</a>
						</li>
						<li>
							<a class="anchor" href="https://" target="_blank" rel="noreferrer">page6</a>
						</li>
					</ul>
				</div>
			</div>
		</section>

		<hr class="opacity-20" />

		<!-- Row 2 -->
		<section class={cRowTwo}>
			<p>
				<a class="anchor" href="https://" target="_blank" rel="noreferrer">
					page7
				</a>
				<span class="opacity-10 mx-2">|</span>
				<a class="anchor" href="https://" target="_blank" rel="noreferrer">
                    page8
                </a>
			</p>
			<div class="flex gap-6">
				{#each socialLinks as sl}
					<a class="opacity-75 hover:opacity-100" href={sl.href} target="_blank" rel="noreferrer" title={sl.title}>
						<i class="fa-brands text-xl {sl.icon}" />
					</a>
				{/each}
			</div>
		</section>
	</div>
</div>
