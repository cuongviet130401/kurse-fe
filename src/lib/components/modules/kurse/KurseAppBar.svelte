
<!-- TODO: Make the background color transition smoother  -->

<script lang="ts">
  import { AppBar, Avatar, popup } from "@skeletonlabs/skeleton";
  import type { PopupSettings } from '@skeletonlabs/skeleton';
	import { authStore } from "$lib/globalStates/authAccount";
  import { goto } from "$app/navigation";
	import { studentMenuStructure, teacherMenuStructure } from './AppBarConfig';
  import { slide } from "svelte/transition";

  let navBarBackground: string = "white";
  let y: number;
	let notifications = [];
	let authAccount = authStore.get()?.account;
	let accountTypeBadgeConfig: string[] | undefined = mapAccountTypeBadge(authAccount?.accountType);


	let appliedMenu: any = (authStore?.get()?.account?.role === "STUDENT_ACCOUNT")
			? studentMenuStructure
			: teacherMenuStructure;

	let activeMenuIndex = 0;
	let activeSubMenuIndex: number | undefined = 0;
	let selectedMenuIndex: number | undefined = undefined;

	const popupClick: PopupSettings = {
		event: 'click',
		target: 'popupClick',
		placement: 'bottom'
	};

	const notificationPopupClick: PopupSettings = {
		event: 'click',
		target: 'notificationPopup',
		placement: 'bottom'
	}

	function handleClickLogOutBtn() {
		authStore.reset();
		goto("/auth");
	}

	function selectActiveOrSelectedState(index: number) {
		if (index === activeMenuIndex) {
			return "active-menuitem"
		} else if (index === selectedMenuIndex) {
			return "selected-menuitem"
		} else {
			return ""
		}
	}

	function mapAccountTypeBadge(accountType: string) {
		return {
			"STUDENT_ACCOUNT": ["Student", "variant-filled-secondary"],
			"TEACHER_ACCOUNT": ["Teacher", "variant-filled-success"],
			"ADMIN_ACCOUNT": ["Admin", "variant-filled-warning"],
			"MANAGER_ACCOUNT": ["Manager", "variant-filled"],
		}[accountType];
	}

  $: navBarBackground = (y >= 100) ? "variant-glass-surface" : "transparent";
  $: console.log(navBarBackground)

	$: console.log(selectedMenuIndex);
</script>

<svelte:window bind:scrollY={y} />

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="sticky top-0 overflow-x-hidden" on:mouseleave={() => {selectedMenuIndex = activeMenuIndex}}>

	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
	<AppBar class="flex w-screen color-transition px-8 py-0 z-50" background={navBarBackground}>
		<svelte:fragment slot="lead">
			<h1 class="h1">
				<a href="/">
					<span class="bg-gradient-to-br from-blue-500 to-cyan-300 bg-clip-text text-transparent box-decoration-clone">
						Bitble
					</span>
				</a>
				<span class="font-thin text-3xl italic" style="margin-left: -8px;">'s</span>
				<span class="font-thin">Kurse</span>
			</h1>
		</svelte:fragment>
		<svelte:fragment slot="trail">
			<div class="mr-8 flex flex-row">
				<ul id="menuItems" class="flex flex-row items-center align-middle"  style="vertical-align: middle;">
					{#each appliedMenu as menuItem, index}
						<li
							class={ (index === activeMenuIndex)
															? "active-menuitem"
															: (index === selectedMenuIndex)
																				 ? "selected-menuitem" : ""
							}
							on:click={() => { selectedMenuIndex = index }}
						>
							{#if index !== activeMenuIndex}
								<a href="{menuItem.href}">
									<span>{menuItem.label}</span>
								</a>
							{:else}
								<div>
									<span>{menuItem.label}</span>
								</div>
							{/if}
						</li>
					{/each}
				</ul>
				<ul class="flex flex-row items-center align-middle gap-2 ml-2">
					<li class="mx-2">																															<!--! NOTIFICATION SECTION-->
						<div use:popup={notificationPopupClick}>
							<p id="notification-icon"><i class="bi bi-bell text-2xl"></i></p>
						</div>
					</li>
					<li class="mx-2">																															<!--! ACCOUNT POPUP SECTION -->
						<div use:popup={popupClick}>
							<Avatar
								id="avatar"
								border="border-4 border"
								cursor="cursor-pointer"
								width="w-12"
							>
								<span><i class="bi bi-person-circle"></i></span>
							</Avatar>
						</div>

					</li>
				</ul>
			</div>
		</svelte:fragment>
	</AppBar>

	{#if appliedMenu[selectedMenuIndex]?.submenu ?? false}
		<div id="appbar-submenu" class="w-full bg-blue-500 text-white" transition:slide={{ axis: 'y' }}>
			<ul id="appbar-submenu-items" class="flex flex-row justify-center items-center">
				{#each appliedMenu[selectedMenuIndex]?.submenu as submenuItem, submenuIndex}
					<li class="{(activeSubMenuIndex === submenuIndex) ? "active-submenu-item" : ""}">
						<a href={submenuItem.href}>{submenuItem.label}</a>
					</li>
				{/each}
			</ul>
		</div>
	{/if}

</div>

<div id="notification-popup" class="card variant-filled drop-shadow overflow-hidden" data-popup="notificationPopup">
	<div class="arrow variant-filled" />
	<div class="flex flex-row justify-between items-baseline p-4">
		<p class="text-2xl">
			<span>Notifications:</span>
			<span class="font-thin ml-2">0</span>
		</p>
	</div>
<hr>
	<div id="notification-stack" class="overflow-y-scroll h-full w-full flex flex-col" >
		{#if notifications.length}
			<div>

			</div>
		{:else}
			<div class="w-full flex flex-col justify-center items-center" style="height: 70%; filter: saturate(0) brightness(1.75)">
				<img src="https://fce.uit.edu.vn/wp-content/smush-webp/2024/05/UIT-VNU-Logo-300x249.png.webp" alt="" width="150" >
				<p>Seems like nothing here</p>
			</div>
		{/if}
	</div>
</div>

<div class="card p-4 variant-filled drop-shadow" data-popup="popupClick">
	<div class="arrow variant-filled" />
	<div class="card variant-ringed p-4 mb-2">
		<div>
			<a class="anchor" href="/account/">
				<p class="h4 font-bold">{authAccount?.firstName + " " + authAccount?.lastName}</p>
			</a>
			<p>
				<strong>ID:</strong>
				{authAccount?.id}
				<span class="badge {(accountTypeBadgeConfig ?? [])[0]}">{(accountTypeBadgeConfig ?? [])[1]}</span>
			</p>
		</div>
	</div>
	<nav class="list-nav" style="min-width: 250px;">
		<ul id="avatar-menu">
			<li>
				<span class="avatar-menu__icon"><i class="bi bi-gear"></i></span>
				<span>Account Settings</span>
			</li>
		</ul>
		<hr class="my-4">
		<button class="btn variant-ringed w-full" on:click={handleClickLogOutBtn}>
			<span style="margin-right: 12px"><i class="bi bi-box-arrow-left"></i></span>
			Log out
		</button>
	</nav>
</div>


<style>

	ul#avatar-menu li {
		display: flex;
		flex-direction: row;
		gap: 1rem;
		@apply rounded-full px-4 py-2;
	}

	ul#avatar-menu li:hover {
		@apply variant-ghost-primary
	}

	ul#avatar-menu .avatar-menu__icon {
		@apply text-primary-500
	}

	p#notification-icon {
		@apply transition;
	}

	p#notification-icon:hover {
		transform: rotate(30deg);
	}

	div#notification-popup {
		width: 500px;
		min-width: 500px;
		max-width: 1000px;

		height: 300px;
		min-height: 300px;
	}

	ul#menuItems {
		margin: 0;
		padding: 0;
	}

	ul#menuItems li {
		@apply flex justify-center align-middle items-center;
		margin: 0 !important;
		height: 100% !important;
		min-height: 80px;
		min-width: 100px;
		padding: 2rem !important;
		padding-top: 0.5rem !important;
		padding-bottom: 0.5rem !important;
	}

	ul#menuItems li:hover {
		@apply bg-blue-800;
	}

	li.active-menuitem {
		@apply bg-blue-500 text-white bg-gradient-to-b from-cyan-300 to-blue-500;
		font-weight: bold;
	}

	li.selected-menuitem {
		@apply bg-blue-500 text-white;
	}


	ul#appbar-submenu-items li {
		@apply py-2 text-center;
		min-width: 200px;
	}

	ul#appbar-submenu-items li:hover {
		@apply bg-blue-900;
	}

	li.active-submenu-item {
		@apply bg-white text-blue-600;
	}

	li.active-submenu-item:hover {
		@apply !bg-white !text-blue-600;
	}


</style>