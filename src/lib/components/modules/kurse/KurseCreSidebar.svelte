<script lang="ts">
  import { AppRail, AppRailAnchor, AppRailTile } from "@skeletonlabs/skeleton";
	import SidebarConfig from './SidebarConfig';
  import { page } from "$app/stores";

	const courseId: string = $page.params.id;
	const homeActiveClass = "bg-gradient-to-br variant-gradient-tertiary-secondary";

	function checkCurrentPathEndWith(pattern: string): boolean {
		console.log(pattern, $page?.url.pathname);

		return $page?.url.pathname.endsWith(pattern);
	}

</script>

<AppRail height="flex h-full">
	<svelte:fragment slot="lead">
		<AppRailAnchor href="/student/cre/{courseId}/" target="_self" selected={checkCurrentPathEndWith($page.params.id)} active="{homeActiveClass}">
			<i class="bi bi-house" style="font-size: 2rem;"></i>
		</AppRailAnchor>
	</svelte:fragment>
	{#each SidebarConfig.sidebarItems as sidebarItem, index}
		<AppRailAnchor href="/student/cre/{courseId}/{sidebarItem.name}" target="_self" selected={checkCurrentPathEndWith("/" + sidebarItem.name)}>
			<p><i class="bi {sidebarItem.iconClass}"></i></p>
			<p>{sidebarItem.menuTitle}</p>
		</AppRailAnchor>
	{/each}
	<div id="shrink-box" class="flex">
	</div>
	<hr>
	<svelte:fragment slot="trail">
		{#each SidebarConfig.sidebarTrailItems as sidebarItem, index}
			<AppRailAnchor href="/student/cre/{courseId}/{sidebarItem.name}" target="_self" selected={checkCurrentPathEndWith("/" + sidebarItem.name)}>
				<p><i class="bi {sidebarItem.iconClass}"></i></p>
				<p>{sidebarItem.menuTitle}</p>
			</AppRailAnchor>
		{/each}
		<div class="m-2 p-2" >
		</div>
	</svelte:fragment>
</AppRail>

<style>
	i.bi {
		@apply text-2xl;
	}

	div#shrink-box {
		height: 27vh;
		min-height: 42vh;
		max-height: 27vh;
	}
</style>