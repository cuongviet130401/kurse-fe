
<!-- TODO: Make the background color transition smoother  -->

<script lang="ts">
  import { AppBar, popup } from "@skeletonlabs/skeleton";
  import type { PopupSettings } from '@skeletonlabs/skeleton';
  import { createPopover, melt } from '@melt-ui/svelte'

  let navBarBackground: string = "white";
  let y: number;

  $: navBarBackground = (y >= 100) ? "bg-surface-100-800-token" : "transparent";
  $: console.log(navBarBackground)
</script>

<svelte:window bind:scrollY={y} />

<AppBar class="sticky top-0 flex w-screen color-transition px-8 z-50" background={navBarBackground}>
  <svelte:fragment slot="lead">
    <h1 class="h1">
      <a href="/">
        <span class="bg-gradient-to-br from-blue-500 to-cyan-300 bg-clip-text text-transparent box-decoration-clone">
          Bitble
        </span>
      </a>
      <span class="font-thin text-3xl italic" style="margin-left: -8px;">'s</span>
      <span class="font-thin">Magazine</span>

    </h1>
  </svelte:fragment>
	<svelte:fragment slot="trail">
    <div class="mr-8">
      <ul class="flex flex-row items-baseline self-baseline gap-8">
        <li>
					<a href="/courses">
						Courses
					</a>
				</li>
        <li>
          <a href="/about-us">
            About Us
          </a>
        </li>
        <li>
          <a href="/auth" class="btn bg-gradient-to-br variant-gradient-primary-secondary">
            Join us
          </a>
          <!-- <a href="" class="btn bg-gradient-to-br variant-gradient-primary-secondary" use:melt={$trigger} on:click={() => {}}>
            Join us!
          </a>
          <div use:melt={$overlay} />
          <div use:melt={$content} class="card p-4 variant-ghost">
            <div use:melt={$arrow} />
            <button use:melt={$close}> X </button>
            <div>
                Login with
                <p>Hover Content</p>
            </div>

          </div> -->

        </li>
      </ul>
    </div>
  </svelte:fragment>
</AppBar>

<style>

</style>