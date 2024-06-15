<script>
	import { authStore } from '$lib/globalStates/authAccount';
	import coffeeUrl from '$lib/images/coffee.png';
	import emtpyCoffeeUrl from '$lib/images/empty-clipboard.png'
	import { Accordion, AccordionItem, ProgressBar } from '@skeletonlabs/skeleton';
	import { _fetchActionItems, _fetchActiveCourses, _fetchInactiveCourses, _fetchRecentCourse } from './+page';
	import MiniCalendar from './../../lib/components/panik-lib/MiniCalendar.svelte';
  import { fade, fly, slide } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';

	let authUser = authStore.get();
	let actionItems = []

	const inactiveCoursesFetcher = _fetchInactiveCourses();

</script>

<section class="m-8 p-8 flex flex-row h-screen">

	<section class="grow px-4">
		<section style="padding-bottom: 2rem">
			<p class="h2">👋 Hello there! {authUser?.account.username}</p>
			<hr class="my-8">
		</section>

		<section id="main-content" class="w-full">

			<div id="active-courses" style="margin-bottom: 2rem;" class="w-full">

				<div id="recent-course-navigation" style="margin-bottom: 2rem;">
					{#await _fetchRecentCourse()}
						<div class="flex flex-row gap-4 flex-wrap w-full" >
							<div class="placeholder animate-pulse rounded-md" style="height: 150px; width: 100%;"></div>
						</div>
					{:then recentCourse}
						<aside class="alert variant-soft-primary !p-0 overflow-x-hidden outline shadow-2xl" >
							<div class="" style="margin-left: -1.5rem; max-width: 20%; max-height: 100%;">
								<img src="{recentCourse.imgUrl}" alt="" class="w-full h-full rounded-e-full" style="min-width: 20%;">
							</div>
							<div class="alert-message flex flex-col justify-between !h-full min-h-full gap-8">
								<div>
									<h3 class="h3 text-white">{recentCourse.title}</h3>
									<p>Don't miss your momentum</p>
								</div>
								<ProgressBar value={recentCourse.progressPercent} max={100} meter="bg-primary-500"/>
							</div>
							<div class="alert-action" style="margin-right: 1rem;">
								<a href="{recentCourse.navigationUrl}" class="btn variant-filled cursor-pointer text-xl">
									<span><i class="bi bi-play"></i></span>
									<span>Continue</span>
								</a>
							</div>
						</aside>
					{/await}
				</div>

				{#await _fetchActiveCourses()}
					<div class="flex flex-row gap-4 flex-wrap w-full">
						<div class="placeholder animate-pulse rounded-md" style="height: 400px; width: 300px;"></div>
						<div class="placeholder animate-pulse rounded-md" style="height: 400px; width: 300px;"></div>
						<div class="placeholder animate-pulse rounded-md" style="height: 400px; width: 300px;"></div>
						<div class="placeholder animate-pulse rounded-md" style="height: 400px; width: 300px;"></div>
					</div>
				{:then activeCourses}
					<div class="flex flex-row flex-nowrap gap-4">
						{#each activeCourses as course}
							<div class="card m-4 !p-0 card-hover shadow-xl hover:shadow-2xl flex flex-col justify-between" style="height: 400px; width: 300px; max-width: 300px" transition:slide={{ delay: 250, duration: 300, easing: quintOut, axis: 'x' }}>
								<header class="card-header !p-0 overflow-y-hidden rounded-t-lg">
									<a href="/student/cre/{course.id}/">
										<img src="{course.imgUrl}" class="w-full" style="min-width: 100%;" alt=""/>
									</a>
								</header>
								<section class="p-4 grow">
									<h4 class="h4">
										<a href="/student/cre/{course.id}/">
											{course.title}
										</a>
									</h4>
								</section>
								<footer class="card-footer !p-2 flex flex-row gap-4" style="border-top-width: 1px; border-top-color: darkgray;">
									<a href="/student/cre/{course.id}/notifications">
										{#if course.unreadNotificationsCount}
											 <span class="badge-icon">{course.unreadNotificationsCount}</span>
										{/if}
										<i class="bi bi-bell"></i>
									</a>
									<a href="/student/cre/{course.id}/action-items" class="btn bg-transparent inline-block p-2 relative">
										{#if course.actionItemsCount}
											<span class="badge-icon">{course.actionItemsCount}</span>
										{/if}
										<i class="bi bi-card-checklist"></i>
									</a>
								</footer>
							</div>
						{:else}
							<div class="w-full flex justify-center items-center">
								<div class="card variant-soft flex flex-col justify-center items-center p-8" style="max-width: 50%; width: 50%">
									<img src={emtpyCoffeeUrl} alt="" width="150">
									<p class="mt-4 text-gray-400">Seem like nothing here</p>
								</div>
							</div>
						{/each}
					</div>
				{/await}

			</div>

			<div id="inactive-courses">
				<Accordion>
					<AccordionItem open padding="p-4" regionControl="variant-ghost" regionPanel="py-4 my-4">
						<svelte:fragment slot="lead">
							<i class="bi bi-archive"></i>
						</svelte:fragment>
						<svelte:fragment slot="summary">Inactive Courses</svelte:fragment>
						<svelte:fragment slot="content">

							{#await inactiveCoursesFetcher}
								<div class="flex flex-row gap-4 flex-wrap w-full ">
									<div class="placeholder animate-pulse rounded-md" style="height: 400px; width: 300px;"></div>
									<div class="placeholder animate-pulse rounded-md" style="height: 400px; width: 300px;"></div>
									<div class="placeholder animate-pulse rounded-md" style="height: 400px; width: 300px;"></div>
									<div class="placeholder animate-pulse rounded-md" style="height: 400px; width: 300px;"></div>
								</div>
							{:then inactiveCourses}
								{#each inactiveCourses as course}
									<div class="card m-4 !p-0 card-hover shadow-xl hover:shadow-2xl flex flex-col justify-between" style="height: 400px; width: 300px; max-width: 300px">
										<header class="card-header !p-0 overflow-y-hidden rounded-t-lg">
											<a href="/student/cre/{course.id}/">
												<img src="{course.imgUrl}" class="w-full" style="min-width: 100%;" alt=""/>
											</a>
										</header>
										<section class="p-4 grow">
											<h4 class="h4">
												<a href="/student/cre/{course.id}/">
													{course.title}
												</a>
											</h4>
										</section>
										<footer class="card-footer !p-2 flex flex-row gap-4" style="border-top-width: 1px; border-top-color: darkgray;">
											<a href="/student/cre/{course.id}/notifications">
												{#if course.unreadNotificationsCount}
													 <span class="badge-icon variant-filled-surface">{course.unreadNotificationsCount}</span>
												{/if}
												<i class="bi bi-bell"></i>
											</a>
											<a href="/student/cre/{course.id}/action-items" class="btn bg-transparent inline-block p-2 relative">
												{#if course.actionItemsCount}
													<span class="badge-icon variant-filled-surface">{course.actionItemsCount}</span>
												{/if}
												<i class="bi bi-card-checklist"></i>
											</a>
										</footer>
									</div>
								{:else}
									<div class="w-full flex justify-center items-center">
										<div class="card variant-soft flex flex-col justify-center items-center p-8" style="max-width: 50%; width: 50%">
											<img src={emtpyCoffeeUrl} alt="" width="150">
											<p class="mt-4 text-gray-400">Seem like nothing here</p>
										</div>
									</div>
								{/each}
							{/await}

						</svelte:fragment>
					</AccordionItem>
				</Accordion>
			</div>

		</section>


	</section>

	<section id="right-sidebar" class="card variant-ghost p-8 flex flex-col gap-8" style="width: 25vw;">
		<div>
			<h3 class="h3">
				<i class="bi bi-calendar3"></i>
				Calendar
			</h3>
			<div>
				<MiniCalendar/>
			</div>
		</div>
		<hr>
		<div>
			<h3 class="h3">
				<i class="bi bi-list-task"></i>
				Action items
			</h3>
			<div class="pt-4">
				{#await _fetchActionItems()}
				<div class="flex flex-col gap-4">
					<div class="placeholder animate-pulse rounded-md" style="height: 50px;"></div>
					<div class="placeholder animate-pulse rounded-md" style="height: 50px;"></div>
					<div class="placeholder animate-pulse rounded-md" style="height: 50px;"></div>
				</div>
				{:then value}
					{#if value.length}
						<div></div>
					{:else}
							<div class="card variant-ghost-success flex flex-col justify-center items-center p-8">
								<img src={coffeeUrl} alt="" width="150">
								<p class="mt-4">You have no tasks, take a rest</p>
							</div>
					{/if}
				{/await}

			</div>
		</div>
	</section>

</section>


<style>

	footer.card-footer a {
		@apply btn bg-transparent inline-block p-2 relative;
	}

	footer.card-footer a span.badge-icon {
		@apply variant-filled-primary absolute z-10 !text-xs;
		top: 0; right: 0;
		color: white !important;
	}

	footer.card-footer a i.bi {
		font-size: 1.5rem;
	}

</style>
